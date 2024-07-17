import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ToDoList from '.././components/ToDoList';
import CurrentDate from '../components/CurrentDate';
import CurrentTime from '../components/CurrentTime';

export default function App() {
  return (
    <View style={styles.container}>
      <CurrentDate/>
      <CurrentTime />
      <ToDoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white',
    paddingTop: 15,
    alignItems:'center',
  },
 
});
