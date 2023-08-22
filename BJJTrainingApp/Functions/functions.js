export const loadPositionsAndTechniques = async function(){
    if(await AsyncStorage.getItem('startingPositions')){
      startingPositions = await JSON.parse(await AsyncStorage.getItem('startingPositions'))
      setPositions(startingPositions)
    }
    else{
      AsyncStorage.setItem('startingPositions', JSON.stringify(startingPositions) )
    }
    if(await AsyncStorage.getItem('startingTechniques')){
      startingTechniques = await JSON.parse(await AsyncStorage.getItem('startingTechniques'))
      setTechniques(startingTechniques)
    }
    else{
      AsyncStorage.setItem('startingTechniques', JSON.stringify(startingTechniques) )
      
    }
  }