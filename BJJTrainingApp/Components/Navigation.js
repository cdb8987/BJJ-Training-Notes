import { StyleSheet, View, Button, SafeAreaView } from 'react-native';

export default function Navbar(props){
   const {setDashboardVisible, setLogDrillingVisible, setLogRollingVisible, setstatsPageVisible, setVideoPageVisible} = props
   
    return (
    <>
    <SafeAreaView >
    <View style={styles.container}>
      {/* <View style={{flex: 1}}></View> */}
      <Button style={styles.button}
        title="DASHBOARD"  
        // buttonColor="#f194ff"
        onPress={(() => {setDashboardVisible(true), setLogDrillingVisible(false), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      />
      <Button style={styles.button}
        title="STATS"  
        // buttonColor="#f194ff"
        onPress={(() => {setstatsPageVisible(true); setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      />
      <Button style={styles.button}
        title="DRILLS"  
        // buttonColor="#f194ff"
        onPress={(() => {setstatsPageVisible(false),setDashboardVisible(false), setLogDrillingVisible(true), setLogRollingVisible(false),console.log('Button with adjusted color pressed')})}
      />
      <Button style={styles.button}
        title="ROLLS"  
        // buttonColor="#f194ff"
        onPress={(() => {setstatsPageVisible(false), setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(true),console.log('Button with adjusted color pressed')})}
      />
      <Button style={styles.button}
        title="VIDEOS"  
        // buttonColor="#f194ff"
        onPress={(() => {setstatsPageVisible(false), setDashboardVisible(false), setLogDrillingVisible(false), setLogRollingVisible(false), setVideoPageVisible(true),console.log('Button with adjusted color pressed')})}
      />
       {/* <View style={{flex: 1}}></View> */}
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