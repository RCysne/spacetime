import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import blurBg from './src/assets/bg-blur.png';

import Stripes from './src/assets/stripes.svg'
import { styled } from 'nativewind';
import SpacetimeLogo from './src/assets/spacetime-logo.svg';

const StyledStripes = styled(Stripes);


export default function App() {

  // Utilização das fonts
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  })

  // Carregamento das fonts
  if (!hasLoadedFonts) {
    return null;
  }


  return (
    <ImageBackground source={blurBg} className='relative px-9 py-6 bg-gray-900 flex-1 items-center'
      imageStyle={{ position: 'absolute', left: '-100%' }}>
      {/* Preciso usar a função styled do nativewind no Stripes, para reconhecer o componete e aceitar formatação do nativewind  */}
      <StyledStripes className='absolute left-2' />
        
      <View className='flex-1 items-center justify-center gap-6'>
          <SpacetimeLogo />

      <View className='space-y-2'>
          
        <Text className='text-center text-2xl text-gray-50 leading-tight font-title '>Sua cápsula do tempo</Text>
        <Text className='text-center font-body text-base leading-relaxed text-gray-100 '>
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
          </Text>
          
        </View>
        <TouchableOpacity activeOpacity={0.7} className='rounded-full px-5 py-3 bg-green-500 mb-10'>
          <Text className='font-alt text-sm uppercase text-black'>Cadastrar Lembrança</Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm text-gray-200 leading-relaxed'>Desenvolvido por Ronaldo Cysne</Text>

      <StatusBar style="light" translucent/>
    </ImageBackground>
  );
}

{/* <View className='bg-gray-900 flex-1 items-center justify-center'>
      <Text className="text-gray-50 text-2xl font-alt">
        Photos Spacetime
      </Text>
      <StatusBar style="light" translucent/>
    </View> */}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 40,
//   }

  
// });
