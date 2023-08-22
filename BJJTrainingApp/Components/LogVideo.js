import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveDropdown2 from './ResponsiveDropdown2';
import { StyleSheet, Text, View,  Button, ImageBackground} from 'react-native';
import React from "react";
import Notesinput from './NotesInput';
import EnterURLInputbox from './EnterUrlInputBox'
 
export default function Logvideo(props){
    
    const image = require("../assets/Aegis_Clear_Logo.png")
    
    
    const {techniques, positions, renderLogVideo, setRenderLogVideo, setVideoPageVisible}= props
    const positionsObjectList = positions.map((x)=> {return {label: x, value: x }})
    const techniquesObjectList = techniques.map((x)=> {return {label: x, value: x }})
    positionsObjectList.unshift({label: 'POSITION', value: 'POSITION' })
    techniquesObjectList.unshift({label: 'TECHNIQUE', value: 'TECHNIQUE' })

    let videoRecord = {};
    
    //THESE ARE CALLBACK FUNCTIONS TO BE PASSED TO DROPDOWN COMPONENTS SO THAT VIDEORECORD STATE CAN BE MANAGED IN LOGVIDEO.JS
    const updateVideoPositionSelection = function(positionChoice){
      videoRecord['position'] = positionChoice;
      
    }
    const updateVideoTechniqueSelection = function(techniqueChoice){
      videoRecord['technique'] = techniqueChoice
      
    }
    
    const updateVideoNotes = (notes)=>{
      videoRecord['notes'] = notes;
      console.log(videoRecord)
    }
    const updateVideoURL = (url)=>{
        videoRecord['url'] = url;
        console.log(videoRecord)
      }
    
    const handleLogVideo = async () => {
      let videoHistory;
      
      const getData = async ()=>{
        if(await AsyncStorage.getItem('videoHistory')===null){
          const initialData = await JSON.stringify({ "data":[] })
          console.log('videoHistory undefined.  set to empty array.  ', initialData); await AsyncStorage.setItem('videoHistory', initialData)
        }
        let storedData = await AsyncStorage.getItem('videoHistory')
        console.log('STORED VIDEO DATA IS:', storedData)
        return storedData
      }      
      const updateData = async (storedData)=>{
        if(!videoRecord.url){return null}
        videoHistory= await JSON.parse(storedData)
        const d = new Date()
        videoRecord['createdAt'] = d
        videoRecord['recordType'] = 'video'
        videoRecord['recordID'] = d.getTime()
        for(let i of ['url', 'position', 'technique', 'notes']){
          if(!videoRecord[i]){
            videoRecord[i]=''
          }
        }
        let validLink = false
        try{
          const response = await fetch(videoRecord.url)
          if(response.status == 200){validLink = true}
        }
        catch(error){alert('The link you entered appears to be broken.  Please check your entry and try again.')}
  
        if(validLink){
          videoHistory.data.push(videoRecord)
          console.log('VIDEO RECORD IN VOLATILE MEMORY', videoHistory)
          await AsyncStorage.setItem('videoHistory', JSON.stringify(videoHistory))
          setVideoPageVisible(false)
          setVideoPageVisible(true)
        }
      }
      updateData(await getData())
      setVideoPageVisible(false)
      setVideoPageVisible(true) // we just want to rerender component to clear dropdowns and notes
    }
    return(       
        <View style={styles.containerStyle}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle= 
        {{opacity:0.25}}> 
          <View style={styles.DropdownContainerverticalpadding}>
          </View>
          <Text style={styles.header}>VIDEOS</Text>
          <View style={styles.DropdownsContainer}>                       
            <ResponsiveDropdown2 style={styles.dropdown}listOptions={positionsObjectList} dropdownLabel={'ENDING POSITION'} updateSelection={updateVideoPositionSelection}/>
            <ResponsiveDropdown2 style={styles.dropdown} listOptions={techniquesObjectList} dropdownLabel={'SUBMISSION'} updateSelection={updateVideoTechniqueSelection}/>           
          </View>
          <View id={'DropdownContainerverticalpadding'} style={styles.DropdownContainerverticalpadding}>
          <EnterURLInputbox style={styles.notes} updateVideoURL={updateVideoURL}/>
          </View>        
          <View style={styles.notes}>
            <Notesinput updateNotes={updateVideoNotes}/>
          </View>
          <Button style={styles.button}
            title="LOG VIDEO"  
            onPress={(async () => {handleLogVideo()})}
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