import {Text, View} from 'react-native';
import Emoji from 'react-native-emoji';

export default function Rollrecord(props){
    const { position , technique, result, notes, createdAt, } = props
    const emoji = (result=='Win')? <Emoji name="white_check_mark" style={{fontSize: 30}} /> : <Emoji name="x" style={{fontSize: 30}} />
    const d = new Date(createdAt)
    // const dateString = `${}`
    const noteDisplay = (notes !== '')? `NOTES:  ${notes}` : null


    return (
        
        <>
        <View style={{flexDirection: 'row', paddingLeft: 15, paddingRight: 15}}>
            {emoji}
            <View style={{justifyContent: 'center', paddingLeft:5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{result.toUpperCase()} {[d.getMonth(), '-', d.getDate(), '-',  d.getFullYear()]}</Text>
            
            </View>
  
        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15}}>
            <Text>{position.toUpperCase()} via {technique.toUpperCase()}</Text>
            <Text style={{paddingTop: 5, paddingBottom: 15, paddingLeft: 15, paddingRight: 15}}>{noteDisplay}</Text>
        </View>
        </>
    )


}


