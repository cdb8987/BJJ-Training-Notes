import {Picker} from '@react-native-picker/picker';
import React, { useState, useRef } from "react";



function ResponsiveDropdown2(props) {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const {listOptions, dropdownLabel, updateSelection } = props
    const pickerRef = useRef();
    const pickerItems = listOptions.map((x, i) => <Picker.Item key={i}label={x.label} value={x.value} />)

    function open() {
    pickerRef.current.focus();
    }

    function close() {
    pickerRef.current.blur();
    }
    return (
        <Picker itemStyle={{height: 100, margin:0, backgroundColor: 'white'}}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
            setSelectedLanguage(itemValue); console.log('value changed to', itemValue); updateSelection(itemValue) }
            }>
            {pickerItems}
      
        </Picker>
    )

}

export default ResponsiveDropdown2