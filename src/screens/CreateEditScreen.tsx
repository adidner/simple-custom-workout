import React, { useState } from 'react';
import {FlatList, ImagePropTypes, Text, TextInput, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { exerciseElement, restAndExerciseElement, restElement, workoutPlaylist } from '../../constants/interfaces';
import { getAllWorkouts, getCurrentAllWorkoutsIndex, getCurrentWorkout } from '../../redux/selectors';
import { createGuid, secondsToDisplayTimeString } from '../Utils';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonColor } from '../../constants/colorStuff';
import DraggableFlatList from "react-native-draggable-flatlist";
import TestComponent from "./TestComponent";
import AddExerciseModal from '../components/AddExerciseModal';

export default function CreateEdit(){

    var currentWorkout: workoutPlaylist | undefined = useSelector(getCurrentWorkout);
    console.log(currentWorkout);
    const [titleValue, onChangeTitle] = useState(currentWorkout != undefined ? currentWorkout.workoutName : "");
    const [exerciseRestPlaylist, onChangeExerciseRestPlaylist] = useState(currentWorkout != undefined ? currentWorkout.exerciseList : []);
    const [addExerciseModalVisisble, setAddExerciseModalVisisble] = useState(false);
    const [addRestModalVisisble, setAddRestModalVisisble] = useState(false);
    

    function onSave(){
        //override state in redux store, using local state playlist obj to override the one at the index we're talking about
    }

    function onAddExercise(){

    }

    function onAddRest(){

    }

    let renderItem = (item: any, index: any, drag: any, isActive: any ) => {
        if((item as exerciseElement).exerciseName){   
            var exercise = item as exerciseElement
            return <ExerciseElement drag={drag} exerciseName={exercise.exerciseName} exerciseReps={exercise.exerciseReps} key={exercise.key}/>;
        }
        else if((item as restElement).restTime){
            var rest = item as restElement
            return <RestElement drag={drag} restName={rest.restName} restTime={rest.restTime} key={rest.key}/>;
        }
        return <View/>;
    }
    
    return (
        <View style={{flex: 1}}>
            {/* <AddExerciseModal visible={addExerciseModalVisisble} setVisibleFalse={() => setAddExerciseModalVisisble(false)} saveActionCallback={}/> */}
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TextInput  style={{paddingVertical: 8, paddingHorizontal: 4, margin: 7, borderBottomColor: "black", borderBottomWidth: 1}} value={titleValue} placeholder={titleValue ? "" : "Enter Workout Title"} onChangeText={onChangeTitle}/>
                <TouchableOpacity  style={{padding: 12, margin: 7, backgroundColor: ButtonColor}} onPress={onSave}><Text>Save Workout</Text></TouchableOpacity>
            </View>

            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity onPress={onAddExercise} style={{padding: 12, backgroundColor: ButtonColor, margin: 7}}><Text>Add Exercise</Text></TouchableOpacity>
                <TouchableOpacity onPress={onAddRest} style={{padding: 12, backgroundColor: ButtonColor, margin: 7}}><Text>Add Rest</Text></TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
                <DraggableFlatList
                    data={exerciseRestPlaylist}
                    renderItem={({ item, index, drag, isActive }) => renderItem( item, index, drag, isActive )}
                    keyExtractor={item => {return item.key}}
                    onDragEnd={({ data }) => onChangeExerciseRestPlaylist(data)}
                />
            </View>
            

             {/* <TestComponent/> */}
        </View>
    );
}



function ExerciseElement(props: exerciseElement){

    function onEditExercise(){
        //pull up the modal and pre-populate it
    }

    function onDeleteExercise(){
        //delete using on changelist
    }

    return (
        <View style={{flexDirection:'row', alignItems: "center", marginHorizontal: 12, justifyContent:'space-between', marginVertical: 10, padding: 12, flex: 1, backgroundColor: "purple",}}>
            <TouchableOpacity onPressIn={props.drag}><Entypo name="menu" size={50} color="black" /></TouchableOpacity>
            <View style={{flexDirection: "row"}}>
                <View><Text style={{fontSize: 20, paddingHorizontal: 4}}>{props.exerciseName}</Text></View>
                <View><Text style={{fontSize: 20, paddingHorizontal: 4}}>{props.exerciseReps}</Text></View>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={onEditExercise} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialIcons name="mode-edit" size={24} color="black" /></View></TouchableOpacity>
                <TouchableOpacity onPress={onDeleteExercise} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialCommunityIcons name="trash-can" size={24} color="black" /></View></TouchableOpacity>
            </View>
        </View>
    );
}

function RestElement(props: restElement){

    function onEditRest(){
        //pull up modal pre-populated
    }

    function onDeleteRest(){
        //delete using on change list
    }

    return (
        <View  style={{flexDirection:'row', alignItems: "center", marginHorizontal: 12, justifyContent:'space-between', marginVertical: 10, padding: 12, flex: 1, backgroundColor: "purple",}}>
            <TouchableOpacity onPressIn={props.drag}><Entypo name="menu" size={50} color="black" /></TouchableOpacity>
            <View style={{flexDirection: "row"}}>
                <View><Text style={{fontSize: 20, paddingHorizontal: 4}}>{props.restName != undefined ? props.restName : "Rest"}</Text></View>
                <View><Text style={{fontSize: 20, paddingHorizontal: 4}}>{secondsToDisplayTimeString(props.restTime)}</Text></View>
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={onEditRest} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialIcons name="mode-edit" size={24} color="black" /></View></TouchableOpacity>
                <TouchableOpacity onPress={onDeleteRest} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialCommunityIcons name="trash-can" size={24} color="black" /></View></TouchableOpacity>
            </View>
        </View>
    );
}
