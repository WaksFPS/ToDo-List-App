import { ImageBackground,Text, View, ScrollView } from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";
import GetStartedButton from '../components/GetStartedButton';


const image = require ("../assets/images/landing.png");



const index = () => {
  return (
    <SafeAreaView className="bg-white h-full">
     <ImageBackground source={image} resizeMode="cover" >
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="w-full h-full px-4 flex-1 justify-center items-center mt-64">
          <Text className='text-black text-4xl font-extrabold'>ToDo App</Text>
          <Text className='text-black'>Jc Maglaqui</Text>
         
        <GetStartedButton 
        
        title='Get Started'
        handlePress={()=> router.push('/mainApp')}
        />
      </View>
      </ScrollView>
      </ImageBackground>
      <StatusBar barStyle='light' />
    </SafeAreaView>
    
  )
}

export default index

