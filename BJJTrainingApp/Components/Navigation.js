import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';

export default function Navbar(props){
   const {setDashboardVisible, setLogDrillingVisible, setLogRollingVisible, setstatsPageVisible, setVideoPageVisible} = props
   
    return (
    <>
    <SafeAreaView >
    <View style={styles.container}>
      <Button 
        mode="outlined"
        compact="true"
        onPress={(() => {setDashboardVisible(true), setLogDrillingVisible(false), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      >DASHBOARD</Button>
      <Button  
        mode="outlined" 
        compact="true"
        onPress={(() => {setstatsPageVisible(true); setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      >STATS</Button>
      <Button   
        mode="outlined" 
        compact="true"
        onPress={(() => {setstatsPageVisible(false),setDashboardVisible(false), setLogDrillingVisible(true), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      >DRILLS</Button>
      <Button   
        mode="outlined" 
        compact="true"
        onPress={(() => {setstatsPageVisible(false), setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(true),console.log('Button with adjusted color pressed')})}
      >ROLLS</Button>
      <Button 
        mode="outlined"  
        compact="true" 
        onPress={(() => {setstatsPageVisible(false), setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(false), setVideoPageVisible(true),console.log('Button with adjusted color pressed')})}
      >VIDEOS</Button>
       
    </View>
    </SafeAreaView>
      
    </>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'center',
        // backgroundColor: '#19c37d',
        backgroundColor: 'white',
        height: 50,
        paddingLeft: 10,
        paddingRight: 10
        
    },
    button:{
        flex: 1,
        width: "33%",
        alignItems: 'center',
        justifyContent: 'center'
        
    }
})