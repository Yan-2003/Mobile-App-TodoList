import { StyleSheet, Text, View, ScrollView , Platform, TouchableOpacity,  } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';


export default function AddList() {
    
    const navigation = useNavigation()

     const API_URL = "http://10.0.2.2:8000/api/todo"

    const [newTodo, setnewTodo] = useState('');

    const add_new_todo = async () =>{
        try {
            console.log("adding new todo...")
            
            const response_data = {value : newTodo, done : false}

            console.log(response_data)

            const response = await axios.post(API_URL, response_data )

            console.log(response.data)

            return navigation.navigate('Home')
        } catch (error) {
            return console.log(error)
        }
    }


  return (
       <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.body}>
                <Text style={styles.title}> ToDo </Text>
                <TextInput placeholder='Enter Todo' value={newTodo} onChangeText={text => setnewTodo(text)}/>
                <View style={styles.btn_section}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btn}><Text>Back</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=>add_new_todo()} style={styles.btn}><Text>Save</Text></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height : '100%',
        flexDirection : 'column',
        backgroundColor: '#fff',
        paddingTop : Platform.OS === 'android' ? 20 : 0,
        paddingBottom : Platform.OS === 'android' ? 20 : 0,
      },
    
      body : {
        flex : 1,
        padding : 15,
      },

    
      title : { 
        fontSize : 32,
        fontWeight : 900,
        marginBottom : 10,
        borderBottomWidth : 1,
      },


      btn: {
        backgroundColor : 'gray',
        padding : 10,
      },

      btn_section : {
        width : '100%',
        flexDirection: 'row',
        gap : 10,
    }
})