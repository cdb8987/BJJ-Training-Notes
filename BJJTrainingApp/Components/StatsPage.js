import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Piechart from './PieChart.js';



export default function Statspage(props){
    const {techniques, positions, isLoading} = props
    


    // const image = {uri: 'https://static.wixstatic.com/media/d95d1e_ec6d2eaf578d42bcaffb9e6507ffcfde~mv2.png/v1/fill/w_178,h_178,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Only%20Logo%20313031.pngS'};
    const image = require("../assets/Aegis_Clear_Logo.png")

    const countPositionRounds = async(positions) => {
        
        
        let drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
        const returnArray = []
        
        //  THESE OPERATIONS ARE 0(n^2).  In the future, we will include a master object which is updated with each new log record.  This will be simpler than iterating across all records on each render.  
        for(const pos of positions){ 
          let count = 0; 
          for(const drill of drillingHistory.data){
            if(drill.position === pos ){ 
              count += drill.rounds
            }
          }
          returnArray.push([pos, count])
        }
       
          return returnArray   
      }
    
      const countTechniqueRounds = async(techniques) => {
        let drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
        const returnArray = []
        for(const tech of techniques){
          let count = 0; 
          for(const drill of drillingHistory.data){
            if(drill.technique === tech ){ 
              count += drill.rounds
            }
          }
          returnArray.push([tech, count])
        }
          // console.log(returnArray)
          return returnArray   
      }
      const countPositionWins = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        const returnArray = []
    
        for(const pos of positions){ 
          let count = 0; 
          for(const roll of rollingHistory.data){
            if(roll.position === pos ){ 
              if(roll.result == 'Win') {count += 1}
            }
          }
          returnArray.push([pos, count])
        }
          // console.log(returnArray)
          return returnArray   
      }
      const countPositionLosses = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        const returnArray = []
    
        for(const pos of positions){ 
          let count = 0; 
          for(const roll of rollingHistory.data){
            if(roll.position === pos ){ 
              if(roll.result == 'Loss') {count += 1}
            }
          }
          returnArray.push([pos, count])
        }
          // console.log(returnArray)
          return returnArray   
      }
      const countTechniqueWins = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        const returnArray = []
    
        for(const tech of techniques){ 
          let count = 0; 
          for(const roll of rollingHistory.data){
            if(roll.technique === tech ){ 
              if(roll.result == 'Win') {count += 1}
            }
          }
          returnArray.push([tech, count])
        }
          // console.log(returnArray)
          return returnArray   
      }
      const countTechniqueLosses = async(positions) => {
        let rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
        const returnArray = []
    
        for(const tech of techniques){ 
          let count = 0; 
          for(const roll of rollingHistory.data){
            if(roll.technique === tech ){ 
              if(roll.result == 'Loss') {count += 1}
            }
          }
          returnArray.push([tech, count])
        }
          // console.log(returnArray)
          return returnArray   
      }





    return (
    <ImageBackground source={image} resizeMode="cover" style={styles.image} imageStyle={{opacity:0.25}}>
        <ScrollView>
        <View><Text style={styles.Historyheader}>Stats</Text></View>
            {/* <TableExample techniques={techniques.slice(1)} positions={positions.slice(1)}/> */}
            <View>
                
                <Piechart title={"Wins by Position"} dataToCount={positions} chartData={countPositionWins}/>
                <Piechart title={"Losses by Position"} dataToCount={positions} chartData={countPositionLosses}/>
                <Piechart title={"Wins by Technique"} dataToCount={techniques} chartData={countTechniqueWins}/>
                <Piechart title={"Losses by Technique"} dataToCount={techniques} chartData={countTechniqueLosses}/> 
                <Piechart title={'Drilling by position'} dataToCount={positions} chartData={countPositionRounds}/>
                <Piechart title={'Drilling by technique'} dataToCount={techniques} chartData={countTechniqueRounds}/>
                
            </View>

        </ScrollView>
    </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#19c37d',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
      
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
    Historyheader: {
      fontSize: 25,
      fontWeight: 'bold', 
      padding: 15,
      
  }

  });