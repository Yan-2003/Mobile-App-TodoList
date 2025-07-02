import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function NavBTN({name, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.box}>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    text_color : {

    },

    box : {
      backgroundColor : 'white',
      width : 50,
      height : 50,
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius : '50%',
    },
    
})