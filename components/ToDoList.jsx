//Jeane Claude Maglaqui WD-402
//OJT Onboarding Training | ToDo List App
//React Native, Expo Router, Android Studio
//Jotai, React Hook Form, Zod, Moment
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox' //wrap to touchableOpac nalang
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAtom } from 'jotai';
import { tasksAtom, modalVisibleAtom, selectedTaskIdAtom, clearAllModalVisibleAtom } from './Atoms';
import Icon from 'react-native-vector-icons/Feather';//pencil icon
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'//trash can icon
import Icon3 from 'react-native-vector-icons/AntDesign';//addfile icon
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'//checkbox icon


//zod schema for validation
const taskSchema = z.object({
  newTask: z.string().min(1, { message: 'Task Name is Required' }),
});

const editTaskSchema = z.object({
  editingTask: z.string().min(1, { message: 'Task Name is Required' }),
});

export default function ToDoList() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [selectedTaskId, setSelectedTaskId] = useAtom(selectedTaskIdAtom);
  const [clearAllModalVisible, setClearAllModalVisible] = useAtom(clearAllModalVisibleAtom);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(taskSchema),
  });

  const { control: editControl, handleSubmit: handleEditSubmit, setValue, formState: { errors: editErrors } } = useForm({
    resolver: zodResolver(editTaskSchema),
  });

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error(error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error(error);
    }
  };

  const addTask = (data) => {
    setTasks([...tasks, { id: Date.now().toString(), text: data.newTask, checked: false }]);
    reset({ newTask: '' });
  };

  const editTask = (data) => {
    setTasks(tasks.map(task => (task.id === selectedTaskId ? { ...task, text: data.editingTask } : task)));
    setSelectedTaskId(null);
    setModalVisible(false);
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearAllTasks = () => {
    setTasks([]);
    setClearAllModalVisible(false);
  };

  const toggleCheck = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setTasks(updatedTasks);
  };

  const anyTaskChecked = tasks.some(task => task.checked);

  const openEditModal = (task) => {
    setSelectedTaskId(task.id);
    setValue('editingTask', task.text);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      
      <Controller
        control={control}
        name="newTask"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={value}
            onChangeText={onChange}
            maxLength={23} //might fix in the future | limited to 24 kasi if more than 24 mawawala yung edit button hahaha
          />
        )}
      />
      {errors.newTask && <Text style={styles.errorText}>{errors.newTask.message}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(addTask)}>
        <Text style={styles.buttonText}><Icon3 name='addfile' size={20} color='white'/>  Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            
            <TouchableOpacity onPress={() => toggleCheck(item.id)}>
            <Icon4 
                name={item.checked ? 'checkbox-marked' : 'checkbox-blank-outline'} 
                size={40}
                color={item.checked ? 'orange' : 'grey'} 
              />
            </TouchableOpacity>
            
            <Text style={styles.taskText}>{item.text}</Text>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Icon name="edit" size={20} color="white" style={styles.iconButton} />
              </TouchableOpacity>
          </View>
        )}
      />
      {anyTaskChecked && (
        <TouchableOpacity style={styles.button} onPress={() => setTasks(tasks.filter(task => !task.checked))}>
          <Text style={styles.buttonText}> <Icon2 name='delete' size={25} color='white'/> Delete Selected</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={[styles.button, { backgroundColor: tasks.length === 0 ? '#ccc' : 'orange' }]} onPress={() => setClearAllModalVisible(true)} disabled={tasks.length === 0}>
        <Text style={styles.buttonText}><Icon2 name='delete-outline' size={25} color='white'/> Clear All</Text>
      </TouchableOpacity>

      {/* Edit Task Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.container2}>
          <Controller
            control={editControl}
            name="editingTask"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Edit task"
                value={value}
                onChangeText={onChange}
                maxLength={23} //might fix in the future | limited to 24 kasi if more than 24 mawawala yung edit button hahaha
              />
            )}
          />
          </View>
          {editErrors.editingTask && <Text style={styles.errorText}>{editErrors.editingTask.message}</Text>}
          <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.button} onPress={() => { setModalVisible(false); setSelectedTaskId(null); }}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleEditSubmit(editTask)}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity> 
        </View>
        </View>
        </View>
      </Modal>

      {/* Clear All Confirmation Modal */}
      <Modal visible={clearAllModalVisible} animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to clear all tasks?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button2} onPress={clearAllTasks}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.noButton} onPress={() => setClearAllModalVisible(false)}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
// I havent used tailwind here kasi hindi pa po ako sanay sa mga shortcuts niya like yung margin top bottom is "my" pala hehe pero nagppractice na po
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 15,
    
  },
  container2:{
    width: '100%',
    paddingBottom:10,
    paddingTop:7
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.3,
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    fontSize: 20,
    textAlign: 'center',
    elevation:5,
    backgroundColor:'white'
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft:5,
    paddingRight: 10,
    padding:5,
    margin:5,
    elevation:5,
    backgroundColor:'white',
    
  },
  taskText: {
    fontSize:20,
    textAlign: 'center',
    fontWeight:'500',
    
    
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation:3,
  },
  button2: {
    backgroundColor: 'red',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15

  },
  noButton: {
    backgroundColor: 'orange',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft:19,
    paddingRight:19

  },
  saveButton:{
    backgroundColor: 'orange',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft:18,
    paddingRight:18
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    textAlign:'center',
    fontSize:17
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize:20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    width: '100%',
  },
  iconButton: {
    backgroundColor: 'orange',
    padding: 6,
    borderRadius: 5,
    alignItems: 'center',
  },

});
