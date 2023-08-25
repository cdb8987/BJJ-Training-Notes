import React from 'react';
// import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';
import DashBoard from './Components/Dashboard';
import Logdrilling from './Components/LogDrilling';
import Logrolling from './Components/LogRolling' ;
import Navbar from './Components/Navigation'
import { useState, useEffect, createContext } from 'react';
import Statspage from './Components/StatsPage';
import Logvideo from './Components/LogVideo';
import { loadPositionsAndTechniques } from './Functions/functions'
import {startingPositions, startingTechniques } from './Functions/functions'

// gh issue create --title "Blank" --body "Blank " --label 'enhancement'
export const AndroidContext = createContext()
const isAndroid = Platform.OS == 'android'  
 


export default function App() {
  useEffect(()=>{
    async function getData(){
      const res = await loadPositionsAndTechniques(setPositions, setTechniques)
    }; 
    getData(); 
  }, [])

  const [positions, setPositions] = useState(startingPositions)
  const [techniques, setTechniques] = useState(startingTechniques)

  // Set screens to visible or hidden for navigation
  const [dashboardVisible, setDashboardVisible] = useState(true)
  const [logDrillingVisible, setLogDrillingVisible] = useState(false)
  const [logRollingVisible, setLogRollingVisible] = useState(false)
  const [statsPageVisible, setstatsPageVisible] = useState(false)
  const [videoPageVisible, setVideoPageVisible] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  
  
  //   Selects screen
  let selectedScreen;
  if(dashboardVisible){selectedScreen = (<DashBoard techniques={techniques} positions={positions}  setPositions={setPositions} setTechniques={setTechniques}/>)}
  else if(logDrillingVisible){selectedScreen = (<Logdrilling techniques={techniques} positions={positions}  setLogDrillingVisible={setLogDrillingVisible}/>)}
  else if(logRollingVisible){selectedScreen = (<Logrolling techniques={techniques} positions={positions}  setLogRollingVisible={setLogRollingVisible}/>)}
  else if(statsPageVisible){selectedScreen = (<Statspage techniques={techniques} positions={positions}  />)}
  else if(videoPageVisible){selectedScreen = (<Logvideo techniques={techniques} positions={positions}  setVideoPageVisible={setVideoPageVisible}/>)}

  // console.log(selectedScreen)
  return (  
    <AndroidContext.Provider value={isAndroid}>
      <SafeAreaView style={styles.container}>
      {selectedScreen}
      <Navbar setDashboardVisible={setDashboardVisible} setLogDrillingVisible={setLogDrillingVisible} setLogRollingVisible={setLogRollingVisible} setstatsPageVisible={setstatsPageVisible} setVideoPageVisible={setVideoPageVisible}/>
      </SafeAreaView>
    </AndroidContext.Provider>
  )
  }
  const styles= StyleSheet.create({
    
    
    container:{
      flex: 1, 
      // width: "100%",
      // alignItems: "center",
      // justifyContent: "center",
      paddingTop: isAndroid? StatusBar.currentHeight : 0
    }
  })
      