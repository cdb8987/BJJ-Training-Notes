import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveDropdown2 from './ResponsiveDropdown2';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'




     
  export default function Logrolling(props){
    const image = require("../assets/Aegis_Clear_Logo.png")
    
    const result = [
      {
        label: "RESULT",
        value: "RESULT",
      },
      {
        label: "Win",
        value: "Win",
      },
      {
        label: "Loss",
        value: "Loss",
      },
  ]
    const {techniques, positions, setLogRollingVisible}= props
    const positionsObjectList = positions.map((x)=> {return {label: x, value: x }})
    const techniquesObjectList = techniques.map((x)=> {return {label: x, value: x }})
    positionsObjectList.unshift({label: 'POSITION', value: 'POSITION' })
    techniquesObjectList.unshift({label: 'TECHNIQUE', value: 'TECHNIQUE' })

    let rollRecord = {};
    
    //THESE ARE CALLBACK FUNCTIONS TO BE PASSED TO DROPDOWN COMPONENT SO THAT ROLLRECORD STATE CAN BE MANAGED IN LOGROLLING.JS
    const updateRollPositionSelection = function(positionChoice){
      rollRecord['position'] = positionChoice;
    }
    const updateRollTechniqueSelection = function(techniqueChoice){
      rollRecord['technique'] = techniqueChoice
    }
    const updateRollResultSelection = function(resultChoice){
      rollRecord['result'] = resultChoice
    }
    const updateRollNotes = (notes)=>{
      rollRecord['notes'] = notes;
      console.log(rollRecord)
    }
    const handleLogRoll = async (notes) => {
      let rollingHistory;
      
      const getData = async ()=>{
        if(await AsyncStorage.getItem('rollingHistory')===null){
          const initialData = await JSON.stringify({ "data":[] })
          console.log('rollingHistory undefined.  set to empty array.  ', initialData); await AsyncStorage.setItem('rollingHistory', initialData)
        }
        let storedData = await AsyncStorage.getItem('rollingHistory')
        return storedData
      }      
      const updateData = async (storedData)=>{
        if(!rollRecord.result){return}
        rollingHistory= await JSON.parse(storedData)
        const d = new Date()
        rollRecord['createdAt'] = d
        rollRecord['recordType'] = 'roll'
        rollRecord['recordID'] = d.getTime()
        for(let i of ['result', 'position', 'technique', 'notes' ]){
          if(!rollRecord[i]){
            rollRecord[i]=''
          }
        }

        rollingHistory.data.push(rollRecord)
        await AsyncStorage.setItem('rollingHistory', JSON.stringify(rollingHistory))
        console.log(rollingHistory)
      }

      updateData(await getData())
      setLogRollingVisible(false)
      setLogRollingVisible(true)
    }
    return(  
        <View style={styles.containerStyle}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle= 
        {{opacity:0.25}}>  
          <View style={styles.DropdownContainerverticalpadding}>
          </View>
          <Text style={styles.header}>ROLLING</Text>
          <View style={styles.DropdownsContainer}>            
            <ResponsiveDropdown2 style={styles.dropdown} listOptions={result} dropdownLabel={'RESULT'} updateSelection={updateRollResultSelection}/>
            <ResponsiveDropdown2 style={styles.dropdown}listOptions={positionsObjectList} dropdownLabel={'ENDING POSITION'} updateSelection={updateRollPositionSelection}/>
            <ResponsiveDropdown2 style={styles.dropdown} listOptions={techniquesObjectList} dropdownLabel={'SUBMISSION'} updateSelection={updateRollTechniqueSelection}/>
          </View>
          <View id={'DropdownContainerverticalpadding'} style={styles.DropdownContainerverticalpadding}>
          </View>
          <View style={styles.notes}>
              <Notesinput updateNotes={updateRollNotes}/>
          </View>
          <Button style={styles.button}
            title="LOG ROLL"  
            onPress={(async () => {handleLogRoll()})}
            />
          <View style={styles.DropdownContainerverticalpadding}>
          </View>

        </ImageBackground> 
        </View>
    )
  }
  const styles = StyleSheet.create({
    containerStyle: {
      width: "100%",
      flex: 1,
      // backgroundColor: '#19c37d',
      backgroundColor: 'white',
     
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
    button:{
      flex: 1,
      width: "33%",
      alignItems: 'center',
      justifyContent: 'center'
  }, 
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },
  button:{
    flex: 1,
    width: "33%",
    alignItems: 'center',
    justifyContent: 'center'
    
}, 
  DropdownsContainer:{
    flex: 2, 
    backgroundColor: 'white',
    zIndex: 2
},
  DropdownContainerverticalpadding: {
    flex: 2
},
  dropdown: {
  flex: 1,
  zIndex: 2
},
header:{
  
  alignItems: 'center',
  fontSize: 25,
  fontWeight: 'bold', 
  // padding: 40,
  justifyContent: 'center', 
  backgroundColor: 'white'
}, 
notes:{
  flex: 1,
  backgroundColor: 'white',
}
  });