import { useState } from 'react'



export default function Notesfeed(props){
    const {aggregateFilteredRecords, FilteredRecords, positionSelection, techniqueSelection, setFilteredRecords} = props
    const [NotesFeedJSX, setNotesFeedJSX] = useState([])

    aggregateFilteredRecords(positionSelection, techniqueSelection, setFilteredRecords)
    console.log('aggregatedFilteredRecords: ', FilteredRecords)
}