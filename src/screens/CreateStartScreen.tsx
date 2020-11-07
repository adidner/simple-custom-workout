import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { ButtonColor } from '../../constants/colorStuff';
import { LargeFontSize, MediumFontSize, SuperLargeFontSize } from '../../constants/fontStuff';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWorkouts } from '../../redux/selectors';
import { workoutPlaylist } from '../../constants/interfaces';
import { setCurrentAllWorkoutsIndex, setCurrentWorkoutByIndex } from '../../redux/actions';

export default function CreateStart(props: any){

    //do async stuff to grab DATA array
    var DATA: workoutPlaylist[] = useSelector(getAllWorkouts);

    function onCreateNewWorkout(){
        //go to other screen and have it be empty
        props.navigation.navigate('CreateEdit');
    }

    return (
        <View style={{paddingLeft: 10, paddingRight: 10, alignItems:"center", justifyContent: "space-around", flex: 1}}>
            <View style={{ flex: 0.25, justifyContent:'center'}}><Text style={{fontSize:LargeFontSize}}>Simple Custom Workout</Text></View>

            <View style={{flex: 1.5, backgroundColor: "yellow",alignSelf: "stretch", paddingHorizontal: 15}}>
                {DATA == [] 
                ? <Text>No Workouts Saved</Text> 
                : <FlatList
                    data={DATA}
                    renderItem={({item}) => <WorkoutElement name={item.workoutName} navigation={props.navigation} index={item.index} />}
                    keyExtractor={item => item.workoutName}
                />}
            </View>

            <View style={{flex: 0.25, justifyContent:'center'}}><TouchableOpacity onPress={onCreateNewWorkout}><Text style={{fontSize:MediumFontSize, backgroundColor:ButtonColor, padding: 10}}>Create New Workout</Text></TouchableOpacity></View>
        </View>
    );
}

function WorkoutElement(props: {name:string, navigation: any, index: number}){

    const dispatch = useDispatch();

    function onDelete(){
        //delete from memory and then reload from memory
    }
    
    function onEdit(index: number){
        //go to other screen and populate with that workout
        dispatch(setCurrentWorkoutByIndex(index));
        props.navigation.navigate('CreateEdit');
    }
    
    function onStartWorkout(){

    }
    
    return (
        <TouchableOpacity onPress={onStartWorkout} style={{flexDirection: "row",  marginVertical: 10, padding: 12, flex: 1, backgroundColor: "purple", alignItems:"center", justifyContent:'space-between'}}>
            <View><Text style={{fontSize: MediumFontSize}}>{props.name}</Text></View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={() => onEdit(props.index)} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialIcons name="mode-edit" size={24} color="black" /></View></TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialCommunityIcons name="trash-can" size={24} color="black" /></View></TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

