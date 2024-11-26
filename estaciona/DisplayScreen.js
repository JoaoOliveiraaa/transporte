import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplayScreen = () => {
  const [vagas, setVagas] = useState([]); // Armazena o status das vagas
  const [mensagem, setMensagem] = useState('Aguardando dados...'); // Mensagem para o usuário

  useEffect(() => {
    // Função para gerar status randomicamente
    const gerarStatusVagas = () => {
      const vagasSimuladas = [
        { id: 1, status: Math.random() > 0.5 ? 'Livre' : 'Ocupada' },
        { id: 2, status: Math.random() > 0.5 ? 'Livre' : 'Ocupada' },
        { id: 3, status: Math.random() > 0.5 ? 'Livre' : 'Ocupada' },
      ];
      setVagas(vagasSimuladas);

      // Atualizar mensagem com base no status das vagas
      const vagasLivres = vagasSimuladas.filter(vaga => vaga.status === 'Livre');
      if (vagasLivres.length > 0) {
        const mensagensVagasLivres = vagasLivres.map(vaga => `Direcione para a Vaga ${vaga.id}`).join('\n');
        setMensagem(mensagensVagasLivres);
      } else {
        setMensagem('Olá, seja bem-vindo! Aproveite e divirta-se!');
      }
    };

    // Atualizar os dados a cada 2 segundos
    const interval = setInterval(gerarStatusVagas, 2000);

    return () => clearInterval(interval); // Limpar intervalo ao desmontar componente
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.data}>{mensagem}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    color: 'lime',
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
});

export default DisplayScreen;


//   ESSE DE CIMA ESTOU USANDO SOMENTE PARA TESTES












//   ESSE DE BAIXO VAMOS USAR NO ESP32








// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DisplayScreen = () => {
//   const [vagas, setVagas] = useState([]); // Armazena o status das vagas
//   const [mensagem, setMensagem] = useState('Aguardando dados...'); // Mensagem para o usuário

//   useEffect(() => {
//     // Função para buscar o status das vagas
//     const fetchVagaStatus = async () => {
//       try {
//         const response = await fetch('http://192.168.204.42'); // Use o IP correto do ESP32
//         const vagasAtualizadas = await response.json(); // Certifique-se de que o ESP32 retorna JSON no formato correto

//         setVagas(vagasAtualizadas);

//         // Atualizar mensagem com base no status das vagas
//         const vagasLivres = vagasAtualizadas.filter(vaga => vaga.status === 'Livre');
//         if (vagasLivres.length > 0) {
//           const mensagensVagasLivres = vagasLivres.map(vaga => `Direcione para a Vaga ${vaga.id}`).join('\n');
//           setMensagem(mensagensVagasLivres);
//         } else {
//           setMensagem('Olá, seja bem-vindo! Aproveite e divirta-se!');
//         }
//       } catch (error) {
//         console.error('Erro ao buscar status das vagas:', error);
//         setMensagem('Erro ao obter informações das vagas.');
//       }
//     };

//     // Atualizar os dados a cada 2 segundos
//     const interval = setInterval(fetchVagaStatus, 2000);

//     return () => clearInterval(interval); // Limpar intervalo ao desmontar componente
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.data}>{mensagem}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   data: {
//     color: 'lime',
//     fontSize: 24,
//     textAlign: 'center',
//     padding: 10,
//   },
// });

// export default DisplayScreen;
