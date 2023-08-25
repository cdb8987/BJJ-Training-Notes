import AsyncStorage from '@react-native-async-storage/async-storage';
import Rollrecord from '../Components/RollRecord.js';
import Drillrecord from '../Components/DrillRecord.js';
import ExternalVideoRecordandroid from '../Components/ExternalVideoRecordAndroid.js';
import React from 'react';

export let startingPositions = ["Guard", "Side Control", "Mount", "Back Control"]
export let startingTechniques = ['Armbar', 'Kimura', 'Lapel Choke', 'Triangle Choke', 'Americana', 'Head and Arm Choke', 'Rear Naked Choke', 'Escape', 'Sweep']




export const loadPositionsAndTechniques = async function(setPositions, setTechniques){
    if(await AsyncStorage.getItem('startingPositions')){
      startingPositions = await JSON.parse(await AsyncStorage.getItem('startingPositions'))
      setPositions(startingPositions)
    }
    else{
      AsyncStorage.setItem('startingPositions', JSON.stringify(startingPositions) )
    }
    if(await AsyncStorage.getItem('startingTechniques')){
      startingTechniques = await JSON.parse(await AsyncStorage.getItem('startingTechniques'))
      setTechniques(startingTechniques)
    }
    else{
      AsyncStorage.setItem('startingTechniques', JSON.stringify(startingTechniques) )
      
    }
  }


export const aggregateFilteredRecords = async function(positionSelection, techniqueSelection,  setFilteredRecords){
    
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
      catch(error){console.log('RetrievefilteredRollRecords FAILED' + error)}

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
      catch(error){console.log('RetrievefilteredDrillRecords FAILED' + error)}

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
        console.log('retrieveFilteredDrillRecords contains: ', recordsArray)
        

      }
      catch(error){'RetrievefilteredVIDEORecords FAILED' + error}

      return recordsArray
    }



    
    const retrieveFilteredLocalVideoRecords = async ()=>{
        try{ await getVideofromCamera() }
        catch(error){console.log('RetrievefilteredVIDEORecords FAILED' + error)}
        return []}
    

    let FilteredRollRecords, FilteredDrillRecords, FilteredExternalVideoRecords, FilteredLocalVideoRecords;

    try{FilteredRollRecords = await retrieveFilteredRollRecords(positionSelection, techniqueSelection)
    console.log('FilteredRollRecords:',  FilteredRollRecords) }
    catch(error){console.log(error)}

    try{FilteredDrillRecords = await retrieveFilteredDrillRecords(positionSelection, techniqueSelection)
    console.log('FilteredDrillRecords:',  FilteredDrillRecords) }
    catch(error){console.log(error)}

    try{FilteredExternalVideoRecords = await retrieveFilteredExternalVideoRecords(positionSelection, techniqueSelection)
    console.log('FilteredExternalVideoRecords:',  FilteredExternalVideoRecords) }
    catch(error){console.log(error)}
    
    try{FilteredLocalVideoRecords = await retrieveFilteredLocalVideoRecords(positionSelection, techniqueSelection)
    console.log('FilteredLocalVideoRecords:',  FilteredLocalVideoRecords)}
    catch(error){console.log(error)}
    

    
    
    
    


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
