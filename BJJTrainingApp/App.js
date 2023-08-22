import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import DashBoard from './Components/Dashboard';
import Logdrilling from './Components/LogDrilling';
import Logrolling from './Components/LogRolling' ;
import Navbar from './Components/Navigation'
import { useState, useEffect } from 'react';
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
  if(dashboardVisible){selectedScreen = (<DashBoard techniques={techniques} positions={positions}  setPositions={setPositions} setTechniques={setTechniques}/>)}
  else if(logDrillingVisible){selectedScreen = (<Logdrilling techniques={techniques} positions={positions}  setLogDrillingVisible={setLogDrillingVisible}/>)}
  else if(logRollingVisible){selectedScreen = (<Logrolling techniques={techniques} positions={positions}  setLogRollingVisible={setLogRollingVisible}/>)}
  else if(statsPageVisible){selectedScreen = (<Statspage techniques={techniques} positions={positions}  />)}
  else if(videoPageVisible){selectedScreen = (<Logvideo techniques={techniques} positions={positions}  setVideoPageVisible={setVideoPageVisible}/>)}

  // console.log(selectedScreen)
  return (  
    <SafeAreaView style={styles.container}>
     {selectedScreen}
     <Navbar setDashboardVisible={setDashboardVisible} setLogDrillingVisible={setLogDrillingVisible} setLogRollingVisible={setLogRollingVisible} setstatsPageVisible={setstatsPageVisible} setVideoPageVisible={setVideoPageVisible}/>
    </SafeAreaView>
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
      