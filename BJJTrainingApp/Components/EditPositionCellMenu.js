import { useState } from 'react'
import {  Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


export default function EditPositionCellmenu(props){
    // Rename, Remove
    const {value, positions, setPositions, setPositionSelection, seteditPositionsToggled, positionSelection, exitEditPositionCellmenu} = props
    const [text, setText] = useState('');
    //Rename Button
    const updateNoteTags = ()=>{
        //NEED TO ADD a function that iterates through the records and changes the associated tags so you don't lose data when you rename something.  
        return
    }
    const updatePositionListWithRenamedValue = ()=>{
        return
    }
    const updatePositionListwithRemovedValue =()=>{
        return
    }

    const handleRenamePosition = (position, renamedPosition)=>{
        const newPositionArray = positions.map((x)=>{
            if(x==position){return renamedPosition}
            return x
        }); 
        
        setPositions(newPositionArray.sort())
        setPositionSelection('')
    }

    const handleAddPosition = async(newPosition)=>{
        const newPositionArray = positions.map(x=> x)
        if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newPosition[0])){
            console.log('THIS IS A NUMBER!')
            newPosition = 'X-' + newPosition
        
        }
        newPositionArray.push(newPosition)
        setPositions(newPositionArray.sort())
        await AsyncStorage.setItem('startingPositions', JSON.stringify(newPositionArray.sort()))

        seteditPositionsToggled(false)
    }

    const handleDeletePosition = async()=>{
        const newPositions = positions.filter(function(position){return position !== text}); 
        
        const sortedPositions = newPositions.sort()
        setPositions(sortedPositions); 
        await AsyncStorage.setItem('startingPositions', JSON.stringify(sortedPositions))
        seteditPositionsToggled(false) 
    }




    return (
    <View style={{flex:1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}></View>
            <TouchableOpacity 
                
                style={{flex: 1}}
                onPress={()=>{seteditPositionsToggled(false)}}
            >
                <Text>{'<==Back'}</Text>
            </TouchableOpacity>
            <View style={{flex:1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
        
        <View style={{flex:1}}><Text style={{textAlign:'right', fontWeight:'bold', paddingTop:10, paddingRight: 10}}>POSITION</Text></View>
        <TextInput
                
                style={{height: 40}}
                placeholder={'Enter Position...'}
                onChangeText={(newText) => {setText(newText);}}
                
                defaultValue={text}
        />
         <View style={{flex:1}}></View>
        </View>
        <View style ={{flexDirection:'row', width: '100%'}}>
            <View style={{flex:2}}></View>
            <Button 
                style={{flex: 1}}
                title="ADD"
                onPress={()=>{handleAddPosition(text)}}
            >
            </Button>
            <Button 
                style={{flex: 1}}
                title="DELETE"
                onPress={()=>{handleDeletePosition()}}
            >
            </Button>
            <View style={{flex:2}}></View>
        </View>
    </View>
    )
    //Delete Button




}