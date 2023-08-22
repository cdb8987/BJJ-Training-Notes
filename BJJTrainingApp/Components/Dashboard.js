import React from 'react'
import { ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
import Datatable from './DataTable.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState, useEffect} from 'react';
import { Divider } from 'react-native-paper'
import Rollrecord from './RollRecord.js';
import Drillrecord from './DrillRecord.js'
import ExternalVideoRecordandroid from './ExternalVideoRecordAndroid.js';
import EditPositionCellmenu from './EditPositionCellMenu.js';
import EditTechniqueCellmenu from './EditTechniqueCellMenu.js';




export default  function DashBoard(props){
  const {techniques, positions, setPositions, setTechniques } = props

  const [positionSelection, setPositionSelection] = useState('')
  const [techniqueSelection, setTechniqueSelection] = useState('')
  const [FilteredRecords, setFilteredRecords] = useState([])
  const [editPositionsToggled, seteditPositionsToggled] = useState(false)
  const [editTechniquesToggled, seteditTechniquesToggled] = useState(false)

  let bottomContainer = <View style={styles.NotesContainer}>
                          <Text style={styles.Notesheader}>Notes</Text>
                        <ScrollView>
                        {/* <NotesFeedcontainer positionSelection={positionSelection} techniqueSelection={techniqueSelection }FilteredRecords={FilteredRecords} setFilteredRecords={setFilteredRecords}/> */}
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
  
  // const [recordsJSX, setRecordsJSX] = useState([])
  
  
  // const image = {uri: 'https://static.wixstatic.com/media/d95d1e_ec6d2eaf578d42bcaffb9e6507ffcfde~mv2.png/v1/fill/w_178,h_178,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Only%20Logo%20313031.pngS'};

  const image = require("../assets/Aegis_Clear_Logo.png")

  

  const aggregateFilteredRecords= async (positionSelection, techniqueSelection)=>{
    
    // JSX Elements from all four functions below will be added to this array.  It will be sorted by createdAt, and will render JSX elements based on record type and ultimately be returned to the dashboard
    
//

    const retrieveFilteredRollRecords = async (positionSelection, techniqueSelection)=>{
      const recordsArray = []
      try{
        
        const rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        
        if(positionSelection == '' && techniqueSelection == ''){
          for(let record of rollingHistory.data){
            recordsArray.push(record)   
          }
        }
        
        else if(positionSelection !== '' && techniqueSelection == ''){
            for(let record of rollingHistory.data){
                if(record.position == positionSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection == ''){
            for(let record of rollingHistory.data){
                if(record.technique == techniqueSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection !== ''){
            for(let record of rollingHistory.data){
                if(record.position == positionSelection){
                    if(record.technique == techniqueSelection){
                        recordsArray.push(record)
                    }    
                }
            }
        }
        
      }
      catch(error){'RetrievefilteredRollRecords FAILED' + error}

      return recordsArray
    }
    
    const retrieveFilteredDrillRecords = async(positionSelection, techniqueSelection)=>{
        
      const recordsArray = []
      
      try{
      
      
        
        const drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
        
        if(positionSelection == '' && techniqueSelection == ''){
          for(let record of drillingHistory.data){
            recordsArray.push(record)   
          }
        }
        
        else if(positionSelection !== '' && techniqueSelection == ''){
            for(let record of drillingHistory.data){
                if(record.position == positionSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection == ''){
            for(let record of drillingHistory.data){
                if(record.technique == techniqueSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection !== ''){
            for(let record of drillingHistory.data){
                if(record.position == positionSelection){
                    if(record.technique == techniqueSelection){
                        recordsArray.push(record)
                    }
                    
                }
            }
        }
        // console.log('retrieveFilteredDrillRecords contains: ', recordsArray)
        

      }
      catch(error){'RetrievefilteredDrillRecords FAILED' + error}

      return recordsArray
    }

    const retrieveFilteredExternalVideoRecords = async(positionSelection, techniqueSelection)=>{
        
      const recordsArray = []

      try{
        
        const videoHistory = await JSON.parse(await AsyncStorage.getItem('videoHistory'))
        
        
        if(positionSelection == '' && techniqueSelection == ''){
          for(let record of videoHistory.data){
            recordsArray.push(record)   
          }
        }
        
        else if(positionSelection !== '' && techniqueSelection == ''){
            for(let record of videoHistory.data){
                if(record.position == positionSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection == ''){
            for(let record of videoHistory.data){
                if(record.technique == techniqueSelection){
                    recordsArray.push(record)
                }
            }
        }
        else if(techniqueSelection !== '' && positionSelection !== ''){
            for(let record of videoHistory.data){
                if(record.position == positionSelection){
                    if(record.technique == techniqueSelection){
                        recordsArray.push(record)
                    }
                    
                }
            }
        }
        // console.log('retrieveFilteredDrillRecords contains: ', recordsArray)
        

      }
      catch(error){'RetrievefilteredVIDEORecords FAILED' + error}

      return recordsArray
    }



    
    const retrieveFilteredLocalVideoRecords = async ()=>{return []}



    const FilteredRollRecords = await retrieveFilteredRollRecords(positionSelection, techniqueSelection)
    console.log('FilteredRollRecords:',  FilteredRollRecords)
    const FilteredDrillRecords = await retrieveFilteredDrillRecords(positionSelection, techniqueSelection)
    console.log('FilteredDrillRecords:',  FilteredDrillRecords)
    const FilteredExternalVideoRecords = await retrieveFilteredExternalVideoRecords(positionSelection, techniqueSelection)
    console.log('FilteredExternalVideoRecords:',  FilteredExternalVideoRecords)
    const FilteredLocalVideoRecords = await retrieveFilteredLocalVideoRecords(positionSelection, techniqueSelection)
    console.log('FilteredLocalVideoRecords:',  FilteredLocalVideoRecords)


    const newJSXArray = []

    let aggregatedRecords;
    try{
    aggregatedRecords = [...FilteredRollRecords, ...FilteredDrillRecords, ...FilteredExternalVideoRecords, ...FilteredLocalVideoRecords ]
    }
    catch(error){'Spread Operation aggregatedRecordsFailed' + error}

    console.log('aggregatedRecords tpye and content is is: ', typeof aggregatedRecords, aggregatedRecords)

    aggregatedRecords.sort(function(a, b) {
      var keyA = new Date(a.createdAt),
        keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    })
    



    for(let record of aggregatedRecords){
      if(record.recordType == 'roll'){
        newJSXArray.push(<Rollrecord  key={record.createdAt} position={record.position} technique={record.technique} result={record.result} notes={record.notes} createdAt={record.createdAt} recordType={record.recordType}/>             )
      }
      else if(record.recordType == 'drill'){
        newJSXArray.push(<Drillrecord  key={record.createdAt} position={record.position} technique={record.technique} rounds={record.rounds} notes={record.notes} createdAt={record.createdAt} recordType={record.recordType}/>             )
        
      }
      else if(record.recordType == 'video'){
        newJSXArray.push(<ExternalVideoRecordandroid key={record.createdAt} position={record.position} technique={record.technique} url={record.url} createdAt={record.createdAt} recordType={record.recordType} notes={record.notes}/>             )
        
      }
      else{newJSXArray.push(<View key={record.createdAt}><Text>{JSON.stringify(record)}</Text></View>)}
    }


    
      setFilteredRecords(newJSXArray.reverse())
       
    
}


  useEffect(()=>{
    async function getRecords(){
    try{
      aggregateFilteredRecords(positionSelection, techniqueSelection )
    }
    catch(error){console.log('useEffect didnt return anything')}
  }
   getRecords()
    
    
    }, [])






  // if(bottomContainer == 'Notes')
  
  
  
  return(
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.25}}>
          <View style={styles.DataTableContainer}>
            <ScrollView>
              <View > 
                <View><Text style={styles.TrainingPlanheader}>Training Plan</Text>
                </View>
                <Datatable techniques={techniques} positions={positions} setPositions={setPositions} setTechniques={setTechniques} positionSelection={positionSelection} setPositionSelection={setPositionSelection} techniqueSelection={techniqueSelection} setTechniqueSelection={setTechniqueSelection} aggregateFilteredRecords={aggregateFilteredRecords} seteditPositionsToggled={seteditPositionsToggled} seteditTechniquesToggled={seteditTechniquesToggled}/>
                {/* <View><Text style={styles.Historyheader}>Stats</Text></View> */}
                {/* <TableExample techniques={techniques.slice(1)} positions={positions.slice(1)}/> */}
              </View>
            </ScrollView>
          </View>
          <Divider bold={true} theme={{ colors: { primary: 'green' } }}/>
          {bottomContainer}
          
          {/* <View style={styles.NotesContainer}>
              <Text style={styles.Notesheader}>Notes</Text>
              <ScrollView>
                <NotesFeedcontainer positionSelection={positionSelection} techniqueSelection={techniqueSelection }FilteredRecords={FilteredRecords} setFilteredRecords={setFilteredRecords}/>
                
              </ScrollView>
          </View> */}
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

  //commit 1
  //commit 2
  //commit 3