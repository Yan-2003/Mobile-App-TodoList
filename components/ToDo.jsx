import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import CheckBox from 'expo-checkbox'
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ToDo({id, todo, done}) {


    const navigation = useNavigation()

    const url = `http://10.0.2.2:8000/api/todo/${id}`

    const [isSelected, setisSelected] = useState(done);

      const update_data_api = async ()=> {
        try {
          console.log("updating todo... id = "+ id +" value= "+todo + " done = " + isSelected + " sending request to : " + url)

          const response = await axios.put(url , {value : todo , done : isSelected})
    
          console.log("update done...")
          return console.log(response)
      
        } catch (error) {
          setisLoading(false)
          console.log(error)
        }
    
      }


    useEffect(() => {
      update_data_api()
    
      return () => {
        
      }
    }, [isSelected]);

  return (
    <View style={styles.box}>
      <CheckBox
        value={isSelected}
        onValueChange={setisSelected}
      />  
      <TouchableOpacity onPress={()=> navigation.navigate('EditList', {id : id , todo : todo, done : done}) }>
        <Text>{todo}</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    box : {
        flexDirection : 'row',
        gap : 10,
        paddingTop : 10,
        alignItems : 'center',
    }
})