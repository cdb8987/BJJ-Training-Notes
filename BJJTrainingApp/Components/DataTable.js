import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { DataTable } from 'react-native-paper';

  
const Datatable = ({positions, techniques, positionSelection, setPositionSelection, techniqueSelection, setTechniqueSelection, aggregateFilteredRecords, seteditPositionsToggled, seteditTechniquesToggled, setFilteredRecords }) => {
  
  let positionCells = positions.sort()
  positionCells = positions.map((x, i)=>{
    const isSelected = (x==positionSelection)? 'selected' : 'unSelected'
          return (
          <DataTable.Row key={i} >
            <DataTable.Cell 
            style={styles[isSelected]} 
            onPress={()=>{
              if(x==positionSelection){setPositionSelection(''); aggregateFilteredRecords('', techniqueSelection, setFilteredRecords)}
              else{setPositionSelection(x); aggregateFilteredRecords(x, techniqueSelection, setFilteredRecords)}
            }
            }
            >{x}</DataTable.Cell>
            <DataTable.Cell >
            </DataTable.Cell>
          </DataTable.Row>
          )
        }
        )
  
  let techniqueCells = techniques.sort()
  techniqueCells = techniques.map((x, i)=>{
    const isSelected = (x==techniqueSelection)? 'selected' : 'unSelected'
          return(
            <DataTable.Row key={i}>
              <DataTable.Cell 
              style={styles[isSelected]}
              onLongPress={()=>{console.log('LONG PRESS HELD FOR', x) }}
              onPress={()=>{
                if(x==techniqueSelection){setTechniqueSelection(''); aggregateFilteredRecords(positionSelection, '', setFilteredRecords)}
                else{setTechniqueSelection(x); aggregateFilteredRecords(positionSelection, x, setFilteredRecords)}
              }}
              >{x}</DataTable.Cell>
              <DataTable.Cell >
              </DataTable.Cell>
            </DataTable.Row>
        )
      }
      )
  
  return (
    <View style={styles.container}>
    <DataTable style={styles.table}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>POSITION
          <TouchableOpacity 
          onPress={()=>{seteditPositionsToggled(true)}}
          >
            
            <Text style={{paddingLeft:5}}>+/-</Text>
          </TouchableOpacity>
          
        </DataTable.Title>
        
      </DataTable.Header>
      {positionCells}
    </DataTable>

    <DataTable style={styles.table}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>TECHNIQUE
        <TouchableOpacity 
          onPress={()=>{seteditTechniquesToggled(true)}}
          >
            
            <Text style={{paddingLeft:5}}>+/-</Text>
          </TouchableOpacity>

        </DataTable.Title>
      </DataTable.Header>
      {techniqueCells}
    </DataTable>
    </View>
  );
};
  
export default Datatable;
  
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    fontSize: 20
  },
  table: {
    flex: 1
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
    fontSize: 20
  },
  title: {
    fontSize: 20
  }, 
  selected:{
    backgroundColor: '#2196F3',
    fontSize: 'large',
    flex: 7

  },
  unSelected:{
    backgroundColor: 'transparent', 
    flex: 7
  }
});