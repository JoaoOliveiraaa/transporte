#include <WiFi.h>
#include <WebServer.h> // Biblioteca para criar servidor HTTP

// Credenciais Wi-Fi
const char* ssid = "VIVOFIBRA-WIFI6-B871";     // Substitua pelo nome da sua rede Wi-Fi
const char* password = "mariacecilia456";      // Substitua pela senha da rede

WebServer server(80); // Cria o servidor na porta 80

// Definições do sensor ultrassônico
const int trigPin = 5;   // Pino do Trigger do sensor
const int echoPin = 18;  // Pino do Echo do sensor

// Configuração de vagas
int vagasLivres = 3;
int vagasOcupadas = 1;

// Distância mínima para considerar uma vaga ocupada (em cm)
const int distanciaLimite = 16;  // 160mm = 16cm

// Função para medir a distância usando o sensor ultrassônico
long medirDistancia() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duracao = pulseIn(echoPin, HIGH);
  long distancia = duracao * 0.034 / 2;  // Calcula a distância em cm
  
  return distancia;
}

void handleRoot() {
  // Medir a distância usando o sensor ultrassônico
  long distancia = medirDistancia();
  
  // Atualizar as vagas com base na distância medida
  String vagasStatus = "Sim";
  
  // Se a distância for menor que o limite, consideramos a vaga ocupada
  if (distancia < distanciaLimite) {
    vagasLivres = max(vagasLivres - 1, 0);  // Diminui as vagas livres, mas não permite valor negativo
    vagasOcupadas = 3 - vagasLivres;        // Atualiza vagas ocupadas
    vagasStatus = "Nao";
  }

  // Retorna os dados no formato JSON
  String response = "{";
  response += "\"vagasLivres\": " + String(vagasLivres) + ","; 
  response += "\"vagasOcupadas\": " + String(vagasOcupadas) + ",";
  response += "\"vagaStatus\": \"" + vagasStatus + "\""; // Adiciona o status da vaga
  response += "}";

  server.send(200, "application/json", response); // Responde ao cliente
}

void setup() {
  Serial.begin(115200);
  
  // Configura os pinos do sensor ultrassônico
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  // Conecta ao Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("Conectando ao Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConectado ao Wi-Fi.");
  Serial.print("IP do servidor: ");
  Serial.println(WiFi.localIP()); // Mostra o IP atribuído ao ESP32

  // Configura rota para o endpoint HTTP
  server.on("/", handleRoot);

  // Inicia o servidor
  server.begin();
  Serial.println("Servidor HTTP iniciado.");
}

void loop() {
  server.handleClient(); // Mantém o servidor ativo
}
