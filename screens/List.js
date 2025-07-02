import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, ScrollView, ScrollViewComponent, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBTN from '../components/NavBTN';
import ToDo from '../components/ToDo';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite' 
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
export default function List() {

    const API_URL = "http://192.168.1.88:8000/api/todo/"

    const navigation = useNavigation()
    
    const [ToDoList, setToDoList] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    const testfun = () =>{
        navigation.navigate('AddList')
    }

    const get_data_api = async () =>{


        setisLoading(true)
        console.log("getting all data from the database")
        try {
        const response = await axios.get(API_URL)
        console.log(response)
        console.log(response.data)
        setToDoList(response.data)
        return setisLoading(false)

        } catch (error) {
        setisLoading(false)
        return console.log(error)
        }
    }



    const initDB = async () =>{
        try {
        const database = await SQLite.openDatabaseAsync('database.db');
        await database.execAsync(`CREATE TABLE IF NOT EXISTS todo(id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, done INTEGER)`) 
        console.log("Init DB...")
        } catch (error) {
        console.log(error)
        }
    }


    const readDB = async () =>{
        setisLoading(true)
        try {
        const database = await SQLite.openDatabaseAsync('database.db');
        const result = await database.getAllAsync('SELECT * FROM todo') 
        console.log(result)
        setToDoList(result)
        console.log("getting Data....")
        setisLoading(false)
        } catch (error) {
        console.log(error)
        }
    }

    const addDB = async (text) =>{
        try {
        const database = await SQLite.openDatabaseAsync('database.db');
        const result = await database.runAsync('INSERT INTO todo(value, done) VALUES(?,?)', text, false) 
        console.log(result)
        setToDoList(result)
        console.log("getting Data....")
        } catch (error) {
        console.log(error)
        }
    }

    useEffect ( () => {

        //initDB()
        //readDB()
        get_data_api()
        setisLoading(false)
    }, []);


  return (
     <SafeAreaView style={styles.container}>
        <View style={styles.body}>
        <Text style={styles.title}>ToDo</Text>
        <ScrollView>
            {
            isLoading ? <Text>Loading your task....</Text>
            : ToDoList.length == 0 ? <Text>No Task.</Text> 
            : ToDoList.map((list , index)=>{

                return(
                <ToDo id={list.id} key={index} todo={list.value} done={list.done == 0 ? false : true} />
                )
            })
            }
        </ScrollView>
        <StatusBar style="auto" />
        </View>
        <View style={styles.navbar}>
        <NavBTN onPress={testfun} name={'+'} />
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

  navbar : {
    alignSelf : "center",
    borderRadius : 50,
    height : '10%',
    backgroundColor : 'black',
    padding : 15,
  },

  title : { 
    fontSize : 32,
    fontWeight : 900,
    marginBottom : 10,
    borderBottomWidth : 1,
  },
});
