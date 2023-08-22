import AsyncStorage from "@react-native-async-storage/async-storage"


export default function NotesFeedcontainer(props){
    //inside NotesFeedContainer, we will retrieve all the filtered records.  We will then pass them as a prop to NotesFeed where they will be rendered
    const {positionSelection, techniqueSelection, FilteredRecords, setFilteredRecords} = props
    
    

    //this function wraps all everything to be async
    const aggregateFilteredRecords= async (positionSelection, techniqueSelection)=>{
    
        // JSX Elements from all four functions below will be added to this array.  It will be sorted by createdAt, and will render JSX elements based on record type and ultimately be returned to the dashboard
        
    //

        const retrieveFilteredRollRecords = async (positionSelection, techniqueSelection)=>{
            const recordsArray = []
            const rollingHistory = await JSON.parse(await AsyncStorage.getItem('rollingHistory'))
            if(positionSelection !== '' && techniqueSelection == ''){
                for(let record of rollingHistory.data){
                    if(record.position == positionSelection){
                        recordsArray.push(record)
                    }
                }
            }
            else if(techniqueSelection !== '' && positionSelection == ''){
                for(let record of rollingHistory.data){
                    if(record.technique == techniqueSelection){
                        recordsArray.push(record)
                    }
                }
            }
            else if(techniqueSelection !== '' && positionSelection !== ''){
                for(let record of rollingHistory.data){
                    if(record.position == positionSelection){
                        if(record.technique == techniqueSelection){
                            recordsArray.push(record)
                        }    
                    }
                }
            }
            return recordsArray
        }
        
        const retrieveFilteredDrillRecords = async(positionSelection, techniqueSelection)=>{
            const recordsArray = []
            const drillingHistory = await JSON.parse(await AsyncStorage.getItem('drillingHistory'))
            
            if(positionSelection !== '' && techniqueSelection == ''){
                for(let record of drillingHistory.data){
                    if(record.position == positionSelection){
                        recordsArray.push(record)
                    }
                }
            }
            else if(techniqueSelection !== '' && positionSelection == ''){
                for(let record of drillingHistory.data){
                    if(record.technique == techniqueSelection){
                        recordsArray.push(record)
                    }
                }
            }
            else if(techniqueSelection !== '' && positionSelection !== ''){
                for(let record of drillingHistory.data){
                    if(record.position == positionSelection){
                        if(record.technique == techniqueSelection){
                            recordsArray.push(record)
                        }
                        
                    }
                }
            }
            console.log('retrieveFilteredDrillRecords contains: ', recordsArray)
            return recordsArray
        }

        const retrieveFilteredExternalVideoRecords = async()=>{return []}
        const retrieveFilteredLocalVideoRecords = async ()=>{return []}



        const FilteredRollRecords = await retrieveFilteredRollRecords(positionSelection, techniqueSelection)
        const FilteredDrillRecords = await retrieveFilteredDrillRecords(positionSelection, techniqueSelection)
        const FilteredExternalVideoRecords = await retrieveFilteredExternalVideoRecords(positionSelection, techniqueSelection)
        const FilteredLocalVideoRecords = await retrieveFilteredLocalVideoRecords(positionSelection, techniqueSelection)


        // const newJSXArray = []
        const aggregatedRecords = [...FilteredRollRecords, ...FilteredDrillRecords, ...FilteredExternalVideoRecords, ...FilteredLocalVideoRecords ]

        
        console.log('aggregatedRecords is',aggregatedRecords,  'FilteredRecords is', FilteredRecords)

       
        // setFilteredRecords(aggregatedRecords)
        
    }
    // aggregateFilteredRecords(positionSelection, techniqueSelection)

   
    
    // return <Notesfeed aggregateFilteredRecords={aggregateFilteredRecords} FilteredRecords={FilteredRecords} positionSelection={positionSelection} techniqueSelection={techniqueSelection} setFilteredRecords={setFilteredRecords}/>
    


    
}