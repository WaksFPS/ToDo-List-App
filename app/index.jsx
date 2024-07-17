import { Text, View, ScrollView } from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from "expo-status-bar";
import GetStartedButton from '../components/GetStartedButton';





const index = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
      <View className="w-full h-full px-4 flex-1 justify-center items-center ">
          <Text className='text-white text-4xl font-extrabold'>ToDo App</Text>
          <Text className='text-white'>Jc Maglaqui</Text>
          <Text></Text>
        <GetStartedButton 
        title='Get Started'
        handlePress={()=> router.push('/mainApp')}
        />
      </View>
      </ScrollView>
      <StatusBar barStyle='light' />
    </SafeAreaView>
    
  )
}

export default index

