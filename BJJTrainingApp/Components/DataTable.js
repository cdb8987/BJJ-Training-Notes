import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native';
import { DataTable } from 'react-native-paper';

  
const Datatable = (props) => {
  const {positions, techniques, setPositions, setTechniques, positionSelection, setPositionSelection, techniqueSelection, setTechniqueSelection, aggregateFilteredRecords, seteditPositionsToggled, seteditTechniquesToggled } = props
  
      let positionCells = positions.sort()
      positionCells = positions.map((x, i)=>{
      const isSelected = (x==positionSelection)? 'selected' : 'unSelected'
      return (
      <DataTable.Row key={i} >
        <DataTable.Cell 
        style={styles[isSelected]} 
        onLongPress={()=>{console.log('LONG PRESS HELD FOR', x), handleSelect(positionSelection, setPositionSelection) }}
        onPress={()=>{
          if(x==positionSelection){setPositionSelection(''); aggregateFilteredRecords('', techniqueSelection)}
          else{setPositionSelection(x); aggregateFilteredRecords(x, techniqueSelection)}
          
           
          
          
          // (x==positionSelection)? setPositionSelection('') : setPositionSelection(x); 
          // aggregateFilteredRecords(positionSelection, techniqueSelection)
        }
        }
        >{x}</DataTable.Cell>
        <DataTable.Cell >
          
          {/* <Button 
            title="x"
            onPress={()=>{const newPositions = positions.filter(function(position){return position !== x}); setPositions(newPositions) }}
          >
          </Button> */}
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
          if(x==techniqueSelection){setTechniqueSelection(''); aggregateFilteredRecords(positionSelection, '')}
          else{setTechniqueSelection(x); aggregateFilteredRecords(positionSelection, x)}
          
          
          
          // (x==techniqueSelection)? setTechniqueSelection('') : setTechniqueSelection(x); aggregateFilteredRecords(positionSelection, techniqueSelection)
        }}
        >{x}</DataTable.Cell>
        <DataTable.Cell >
          {/* <Button 
            title="x"
            onPress={()=>{const newTechniques = techniques.filter(function(technique){return technique !== x}); setTechniques(newTechniques) }}
          >

          </Button> */}
        </DataTable.Cell>
      </DataTable.Row>
  )
}
)

  const renderEditPositionCellmenu = ()=>{
    return
  }

  const exitEditPositionCellmenu = ()=>{
    return
  }
  const exitEditTechniqueCellmenu = ()=>{
    return
  }
  
  const handleSelect = (param, setParam)=>{
    this.style = (this.style !== 'selected')? 'selected' : 'unSelected'
    console.log('this = ', this)
    console.log('this.style =', this.style)
    counter = param + 1
    setParam(counter)

  }
  
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
        
        {/* <Button 
            title="add"
            onPress={()=>{const newPositions = positions.filter(function(position){return position !== x}); setPositions(newPositions)  }}
          >

          </Button> */}
        
      </DataTable.Header>
      {positionCells}
      
      {/* <EditPositionCellmenu value={positionSelection} positions={positions} setPositions={setPositions} exitEditPositionCellmenu={exitEditPositionCellmenu} setPositionSelection={setPositionSelection} positionSelection={positionSelection}/> */}
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
      {/* <EditTechniqueCellmenu value={techniqueSelection} techniques={techniques} setTechniques={setTechniques} exitEditTechniqueCellmenu={exitEditTechniqueCellmenu} setTechniqueSelection={setTechniqueSelection} techniqueSelection={techniqueSelection}/> */}
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