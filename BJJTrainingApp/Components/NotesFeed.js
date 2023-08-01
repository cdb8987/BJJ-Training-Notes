import { useState } from 'react'



export default function Notesfeed(props){
    const {aggregateFilteredRecords, FilteredRecords, positionSelection, techniqueSelection, setFilteredRecords} = props
    const [NotesFeedJSX, setNotesFeedJSX] = useState([])

    aggregateFilteredRecords(positionSelection, techniqueSelection, setFilteredRecords)
    console.log('aggregatedFilteredRecords: ', FilteredRecords)
    // console.log('AGGREGATED FILTERED RECORDS:', aggregatedFilteredRecords)

    //     for(let record of aggregatedFilteredRecords){
    //         if(record.recordType == 'roll'){
    //             const recordJSXElement = <Rollrecord position={record.position} technique={record.technique} result={record.result} notes={record.notes} createdAt={record.createdAt}/>
    //             newJSXArray.push(recordJSXElement)
    //         }
    //     }
}