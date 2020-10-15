import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { ButtonColor } from '../../constants/colorStuff';
import { LargeFontSize, MediumFontSize, SuperLargeFontSize } from '../../constants/fontStuff';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DATA = [
    {workoutName: "workout 1"},
    {workoutName: "workout 2"},
    {workoutName: "workout 3"},
    {workoutName: "workout 4"},
    {workoutName: "workout 5"},
    {workoutName: "workout 6"},
    
];

export default function CreateStart(props: any){

    //do async stuff to grab DATA array

    return (
        <View style={{paddingLeft: 10, paddingRight: 10, alignItems:"center", justifyContent: "space-around", flex: 1}}>
            <View style={{ flex: 0.25, justifyContent:'center'}}><Text style={{fontSize:LargeFontSize}}>Simple Custom Workout</Text></View>

            <View style={{flex: 1.5, backgroundColor: "yellow",alignSelf: "stretch", paddingHorizontal: 15}}>
                {DATA == [] 
                ? <Text>No Workouts Saved</Text> 
                : <FlatList
                    data={DATA}
                    renderItem={({item}) => <WorkoutElement name={item.workoutName} navigation={props.navigation} />}
                    keyExtractor={item => item.workoutName}
                />}
            </View>

            <View style={{flex: 0.25, justifyContent:'center'}}><TouchableOpacity><Text style={{fontSize:MediumFontSize, backgroundColor:ButtonColor, padding: 10}}>Create New Workout</Text></TouchableOpacity></View>
        </View>
    );
}

function WorkoutElement(props: {name:string, navigation: any}){
    function onDelete(){

    }
    
    function onEdit(){
    
    }
    
    function onStart(){
        
    }
    
    return (
        <TouchableOpacity onPress={onStart} style={{flexDirection: "row",  marginVertical: 10, padding: 12, flex: 1, backgroundColor: "purple", alignItems:"center", justifyContent:'space-between'}}>
            <View><Text style={{fontSize: MediumFontSize}}>{props.name}</Text></View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={onEdit} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialIcons name="mode-edit" size={24} color="black" /></View></TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialCommunityIcons name="trash-can" size={24} color="black" /></View></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

