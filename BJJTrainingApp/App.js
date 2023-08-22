import React from 'react';
import { StyleSheet} from 'react-native';
import DashBoard from './Components/Dashboard';
import Logdrilling from './Components/LogDrilling';
import Logrolling from './Components/LogRolling' ;
import Navbar from './Components/Navigation'
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statspage from './Components/StatsPage';
import Logvideo from './Components/LogVideo';
import { loadPositionsAndTechniques } from './Functions/functions'

// gh issue create --title "Blank" --body "Blank " --label 'enhancement'


export default function App() {
  let startingPositions = ["Guard", "Side Control", "Mount", "Back Control"]
  let startingTechniques = ['Armbar', 'Kimura', 'Lapel Choke', 'Triangle Choke', 'Americana', 'Head and Arm Choke', 'Rear Naked Choke', 'Escape', 'Sweep']
  
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
  const [isLoading, setIsLoading] = useState(true)
  
  
  //   Selects screen
  let selectedScreen;
  if(dashboardVisible){selectedScreen = (<DashBoard techniques={techniques} positions={positions} isLoading={isLoading} setPositions={setPositions} setTechniques={setTechniques}/>)}
  else if(logDrillingVisible){selectedScreen = (<Logdrilling techniques={techniques} positions={positions} isLoading={isLoading} setLogDrillingVisible={setLogDrillingVisible}/>)}
  else if(logRollingVisible){selectedScreen = (<Logrolling techniques={techniques} positions={positions} isLoading={isLoading} setLogRollingVisible={setLogRollingVisible}/>)}
  else if(statsPageVisible){selectedScreen = (<Statspage techniques={techniques} positions={positions} isLoading={isLoading} />)}
  else if(videoPageVisible){selectedScreen = (<Logvideo techniques={techniques} positions={positions} isLoading={isLoading} setVideoPageVisible={setVideoPageVisible}/>)}

  // console.log(selectedScreen)
  return (  
    <>
     {selectedScreen}
     <Navbar setDashboardVisible={setDashboardVisible} setLogDrillingVisible={setLogDrillingVisible} setLogRollingVisible={setLogRollingVisible} setstatsPageVisible={setstatsPageVisible} setVideoPageVisible={setVideoPageVisible}/>
     </>
  )
  }
  const styles= StyleSheet.create({
    container:{
      flex: 1, 
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    }
  })
      