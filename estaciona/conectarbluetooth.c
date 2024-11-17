#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define DEVICE_NAME "ESP32"
#define SERVICE_UUID "service-uuid"
#define CHARACTERISTIC_UUID "characteristic-uuid"

BLECharacteristic *pCharacteristic;
bool commandReceived = false;
std::string receivedCommand;

class MyCallbacks : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    receivedCommand = pCharacteristic->getValue();
    if (receivedCommand.length() > 0) {
      Serial.println("Comando recebido:");
      Serial.println(receivedCommand.c_str());
      commandReceived = true;
    }
  }
};

void setup() {
  Serial.begin(115200);
  BLEDevice::init(DEVICE_NAME);
  BLEServer *pServer = BLEDevice::createServer();

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );

  pCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  BLEDevice::startAdvertising();

  Serial.println("Esperando conexão...");
}

void loop() {
  if (commandReceived) {
    Serial.print("Processando comando: ");
    Serial.println(receivedCommand.c_str());
    // Adicione lógica para processar comandos recebidos
    commandReceived = false;
  }
}
