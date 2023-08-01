import {
    Appbar,
    DarkTheme,
    DefaultTheme,
    Provider,
    Surface,
    ThemeProvider,
  } from "react-native-paper";
  import React, { useState } from "react";
  import { StatusBar, StyleSheet } from "react-native";
  import DropDown from "react-native-paper-dropdown";
  
  function ResponsiveDropdown(props) {

    const {listOptions, dropdownLabel, updateSelection } = props
    const [nightMode, setNightmode] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [listChoice, setListChoice] = useState('');
    const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
    
    
    updateSelection(listChoice)
    
  
    return (
      <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
        <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
          <StatusBar
            backgroundColor={
              nightMode ? DarkTheme.colors.surface : DefaultTheme.colors.primary
            }
            barStyle={"light-content"}
          />
          <Surface style={styles.containerStyle}>
              <DropDown
                label={dropdownLabel}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={listChoice}
                setValue={setListChoice}
                list={listOptions}
              />
          </Surface>
        </ThemeProvider>
      </Provider>
    );
  }
  
  const styles = StyleSheet.create({
    containerStyle: {
      justifyContent: "center"
    },
    spacerStyle: {
    },
    safeContainerStyle: {
      flex: 1,
      justifyContent: "center",
    },
  });
  
  export default ResponsiveDropdown;