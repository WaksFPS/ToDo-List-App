import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown:false}}/>
      
      <Stack.Screen name="mainApp" options={{
        headerTitle:'To Do List',
         headerBackVisible:false,
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          headerStyle: {
            backgroundColor: 'orange',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 30,
            color: 'white',
          }
          }}/>
    </Stack>
  );
}
