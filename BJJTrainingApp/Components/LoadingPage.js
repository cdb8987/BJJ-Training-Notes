import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import {Dimensions} from 'react-native'



export default function Loadingpage(){
    return(
        <>
          
          <View style={styles.container}>
          
            <View style={styles.imageContainer}>
                <Image source={{uri: 'https://static.wixstatic.com/media/d95d1e_ec6d2eaf578d42bcaffb9e6507ffcfde~mv2.png/v1/fill/w_178,h_178,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Only%20Logo%20313031.pngS'}} style={styles.image}/>
            </View>
            
          </View>
           </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#19c37d',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: (Dimensions.get('window').height / 2) - Dimensions.get('window').width /2,
    },
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      borderRadius: 18,
    },
    header:{
      fontSize: 25,
      fontWeight: 'bold', 
      padding: 15,
    }
    
  });