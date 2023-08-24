import React from 'react'
import { ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
import Datatable from './DataTable.js';
import {useState, useEffect} from 'react';
import { Divider } from 'react-native-paper'
import EditPositionCellmenu from './EditPositionCellMenu.js';
import EditTechniqueCellmenu from './EditTechniqueCellMenu.js';
import { aggregateFilteredRecords } from '../Functions/functions'

export default  function DashBoard({techniques, positions, setPositions, setTechniques }){

  const [positionSelection, setPositionSelection] = useState('')
  const [techniqueSelection, setTechniqueSelection] = useState('')
  const [FilteredRecords, setFilteredRecords] = useState([])
  const [editPositionsToggled, seteditPositionsToggled] = useState(false)
  const [editTechniquesToggled, seteditTechniquesToggled] = useState(false)

  let bottomContainer = <View style={styles.NotesContainer}>
                          <Text style={styles.Notesheader}>Notes</Text>
                        <ScrollView>
                        {FilteredRecords}
                        </ScrollView>
                      </View>

  if(editPositionsToggled){
    
    //set bottom container to render POSITION menu JSX
    bottomContainer = <EditPositionCellmenu editPositionsToggled={editPositionsToggled} seteditPositionsToggled={seteditPositionsToggled} positions={positions} setPositions={setPositions} techniques={techniques} setTechniques={setTechniques} seteditTechniquesToggled={seteditTechniquesToggled}/>
  }
  else if(editTechniquesToggled){
    //set bottom container to render TECHNIQUE menu JSX
    bottomContainer = <EditTechniqueCellmenu editTechniquesToggled={editTechniquesToggled} seteditTechniquesToggled={seteditTechniquesToggled} techniques={techniques} setTechniques={setTechniques} seteditPositionsToggled={seteditPositionsToggled}/>
  }

  const image = require("../assets/Aegis_Clear_Logo.png")

  useEffect(()=>{
    async function getRecords(){
    try{
      aggregateFilteredRecords(positionSelection, techniqueSelection, setFilteredRecords )
    }
    catch(error){console.log('useEffect didnt return anything')}
  }
   getRecords()
    
    }, [])

  return(
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.25}}>
          <View style={styles.DataTableContainer}>
            <ScrollView>
              <View > 
                <View><Text style={styles.TrainingPlanheader}>Training Plan</Text>
                </View>
                <Datatable techniques={techniques} positions={positions} setPositions={setPositions} setTechniques={setTechniques} positionSelection={positionSelection} setPositionSelection={setPositionSelection} techniqueSelection={techniqueSelection} setTechniqueSelection={setTechniqueSelection} aggregateFilteredRecords={aggregateFilteredRecords} seteditPositionsToggled={seteditPositionsToggled} seteditTechniquesToggled={seteditTechniquesToggled} setFilteredRecords={setFilteredRecords}/>
              </View>
            </ScrollView>
          </View>
          <Divider bold={true} theme={{ colors: { primary: 'green' } }}/>
          {bottomContainer}
        </ImageBackground>
      </View>
      
    )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    // backgroundColor: '#19c37d',
    backgroundColor: 'white',
  },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    TrainingPlanheader: {
        fontSize: 25,
        fontWeight: 'bold', 
        padding: 15,
        marginTop: 30
    },
    Notesheader: {
      fontSize: 25,
      fontWeight: 'bold', 
      padding: 15 
      // padding: 15,
      // marginTop: 30
  },
    Historyheader: {
      fontSize: 25,
      fontWeight: 'bold', 
      padding: 15,
      
    }, 
    DataTableContainer: {
      flex: 1
    }, 
    NotesContainer: {
      flex: 1
    }

  });

