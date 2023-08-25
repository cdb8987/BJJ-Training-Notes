import { useState } from 'react'
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';


export default function EditTechniqueCellmenu(props){
    // Rename, Remove
    const {value, techniques, setTechniques, setTechniqueSelection, seteditTechniquesToggled, techniqueSelection, exitEditTechniqueCellmenu} = props
    const [text, setText] = useState('');
    //Rename Button
    const updateNoteTags = ()=>{
        //NEED TO ADD a function that iterates through the records and changes the associated tags so you don't lose data when you rename something.  
        return
    }
    const updateTechniqueListWithRenamedValue = ()=>{
        return
    }
    const updateTechniqueListwithRemovedValue =()=>{
        return
    }

    const handleRenameTechnique = (technique, renamedTechnique)=>{
        const newTechniqueArray = techniques.map((x)=>{
            if(x==technique){return renamedTechnique}
            return x
        }); 
        
        setTechniques(newTechniqueArray)
        setTechniqueSelection('')
    }

    const handleAddTechnique = async(newTechnique)=>{
        const newTechniqueArray = techniques.map(x=> x)
        if(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(newTechnique[0])){
            console.log('THIS IS A NUMBER!')
            newTechnique = 'X-' + newTechnique
        
        }
        
        newTechniqueArray.push(newTechnique)
        const sortedArray = newTechniqueArray.sort()
        setTechniques(sortedArray)
        await AsyncStorage.setItem('startingTechniques', JSON.stringify(sortedArray))
        seteditTechniquesToggled(false)
    }
    const handleDeleteTechnique = async ()=>{
        const newTechniques = techniques.filter(function(technique){return technique !== text}); 
        const sortedTechniques = newTechniques.sort()
        
        setTechniques(sortedTechniques); 
        await AsyncStorage.setItem('startingTechniques', JSON.stringify(sortedTechniques))
        
        seteditTechniquesToggled(false) 
    }


    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}></View>
            <TouchableOpacity 
                
                style={{flex: 1}}
                onPress={()=>{seteditTechniquesToggled(false)}}
            >
                <Text>{'<==Back'}</Text>
            </TouchableOpacity>
            <View style={{flex:1}}></View>
        </View>
        <View style={{flexDirection: 'row'}}>
        
        <View style={{flex:1}}><Text style={{textAlign:'right', fontWeight:'bold', paddingTop:10, paddingRight: 10}}>TECHNIQUE</Text></View>
        <TextInput
                
                style={{height: 40}}
                placeholder={'Enter Technique...'}
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
                onPress={()=>{handleAddTechnique(text)}}
            >
            </Button>
            <Button 
                style={{flex: 1}}
                title="DELETE"
                onPress={()=>{handleDeleteTechnique()}}
            >
            </Button>
            <View style={{flex:2}}></View>
        </View>
    </View>
    )
    //Delete Button




}

