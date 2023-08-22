import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveDropdown2 from './ResponsiveDropdown2';
import { ImageBackground, StyleSheet, Text, View, Button } from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
    const rounds = [
      {
        label: "# of ROUNDS",
        value: 'Rounds',
      },    
          {
            label: "One",
            value: 1,
          },
          {
            label: "Two",
            value: 2,
          },
          {
            label: "Three",
            value: 3,
          },
          {
            label: "Four",
            value: 4,
          },
          {
            label: "Five",
            value: 5,
          },
    ]


  

  export default function Logdrilling(props){
    const {techniques, positions, setLogDrillingVisible, isLoading}= props
    const positionsObjectList = positions.map((x)=> {return {label: x, value: x }})
    const techniquesObjectList = techniques.map((x)=> {return {label: x, value: x }})

    positionsObjectList.unshift({label: 'POSITION', value: 'POSITION' })
    techniquesObjectList.unshift({label: 'TECHNIQUE', value: 'TECHNIQUE' })

    const image = require("../assets/Aegis_Clear_Logo.png")

    let drillRecord = {};


    const updateDrillPositionSelection = function(positionChoice){
      drillRecord['position'] = positionChoice;
    }
    const updateDrillTechniqueSelection = function(techniqueChoice){
      drillRecord['technique'] = techniqueChoice
    }
    const updateDrillRoundsSelection = function(roundsChoice){
      drillRecord['rounds'] = roundsChoice
    }

    const updateDrillNotes = (notes)=>{
      drillRecord['notes'] = notes;
    }

    const handleLogDrill = async () => {
      let drillingHistory;
      
      const getData = async ()=>{
        if(await AsyncStorage.getItem('drillingHistory')===null){
          const initialData = await JSON.stringify({ "data":[] })
          console.log('drillingHistory undefined.  set to empty array.  ', initialData); await AsyncStorage.setItem('drillingHistory', initialData)
        }
        let storedData = await AsyncStorage.getItem('drillingHistory')
        return storedData
      }      
      const updateData = async (storedData)=>{
        if(!drillRecord.rounds){return null}
        drillingHistory = await JSON.parse(storedData)
        const d = new Date()
        drillRecord['createdAt'] = d
        drillRecord['recordType'] = 'drill'
        drillRecord['recordID'] = d.getTime()
        for(let i of ['rounds', 'position', 'technique', 'notes' ]){
          if(!drillRecord[i]){
            drillRecord[i]=''
          }
        }

        drillingHistory.data.push(drillRecord)
        await AsyncStorage.setItem('drillingHistory', JSON.stringify(drillingHistory))
        console.log(drillingHistory)
      }

      updateData(await getData())
      setLogDrillingVisible(false) //we simply want the page to rerender so that dropdown menus will clear
      setLogDrillingVisible(true)

    }


    return(
        
       
        <View style={styles.containerStyle}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle= 
        {{opacity:0.25}}>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            <Text style={styles.header}>DRILLING</Text>
            <View style={styles.DropdownsContainer}>
              <ResponsiveDropdown2 style={styles.dropdown}listOptions={positionsObjectList} dropdownLabel={'Position'} updateSelection={updateDrillPositionSelection}/>
              <ResponsiveDropdown2 style={styles.dropdown} listOptions={techniquesObjectList} dropdownLabel={'Technique'} updateSelection={updateDrillTechniqueSelection}/> 
              <ResponsiveDropdown2 style={styles.dropdown} listOptions={rounds} dropdownLabel={'Rounds'} updateSelection={updateDrillRoundsSelection}/>
            </View>
            <View style={styles.DropdownContainerverticalpadding}>
            </View>
            
            
            <View style={styles.notes}>
              <Notesinput updateNotes={updateDrillNotes}/>
            </View>
            
            
            
            
            
            <Button style={styles.button} 
              title="LOG DRILL"  
              // buttonColor="#f194ff"
              onPress={(async () => {handleLogDrill('test')})}
              />
              <View style={styles.DropdownContainerverticalpadding}></View>   
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
    spacerStyle: {
      marginBottom: 15,
    },
    safeContainerStyle: {
      flex: 1,
      margin: 20,
      justifyContent: "center",
    },
    button:{
      flex: 2,
      width: "33%",
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: 'green'
      
      
  }, 
    DropdownsContainer:{
      backgroundColor: 'white',
      flex: 2,
      zIndex: 2
  },
    DropdownContainerverticalpadding: {
      flex: 2
  },
    dropdown: {
    flex: 1,
    // zIndex: 2
  },
  header:{
    backgroundColor: 'white',
    fontSize: 25,
    fontWeight: 'bold', 
    // padding: 15,
  }, 
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  notes:{
    flex: 1,
    backgroundColor: 'white',
    zIndex: 2
  }
  
  });