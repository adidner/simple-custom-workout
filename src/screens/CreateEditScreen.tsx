import React, { useState } from 'react';
import {FlatList, ImagePropTypes, Text, TextInput, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
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
import AddRestModal from '../components/AddRestModal';
import { overrideOrAppendAllWorkouts } from '../../redux/actions';

export default function CreateEdit(){

    var currentWorkout: workoutPlaylist = useSelector(getCurrentWorkout);
    //console.log(currentWorkout);
    const [titleValue, onChangeTitle] = useState(currentWorkout != undefined ? currentWorkout.workoutName : "");
    const [exerciseRestPlaylist, onChangeExerciseRestPlaylist] = useState(currentWorkout != undefined ? currentWorkout.exerciseList : []);
    const [addExerciseModalVisisble, setAddExerciseModalVisisble] = useState(false);
    const [currentEditExercise, setCurrentEditExercise] = useState({exerciseName: "", exerciseReps: 0, key:createGuid()});
    const [addRestModalVisisble, setAddRestModalVisisble] = useState(false);
    const [currentEditRest, setCurrentEditRest] = useState({restTime: 0, key:createGuid()});

    const dispatch = useDispatch()

    //TODO: test this, because it probably doesn't work, like the entire function including the redux call
    function onSaveExercise(element: exerciseElement){
        //go into currentWorkout look by GUID, if ours matches one, override it with this
        let replaced: boolean = false;
        console.log("element", element)
        for(let current of currentWorkout.exerciseList){
                
            //console.log("current.key", current.key);
            //console.log("elment.key ", element.key);
            if(current.key == element.key){
                //console.log("in if");
                current = element;
                replaced = true;
            }
        }
        //if it doesn't match any add it to the end (or beginning idk)
        if(!replaced){
            currentWorkout.exerciseList.push(element);
        }
        //make and call a function that does something similar but on the allWorkouts level rather than the exercisePlaylist level
        
        dispatch(overrideOrAppendAllWorkouts(currentWorkout));
    }

    function onSaveRest(element: restElement){

    }

    function onSave(){

    }


    function onAddExercise(){
        setCurrentEditExercise({exerciseReps: 0,exerciseName: "",key: createGuid()});
        setAddExerciseModalVisisble(true);

    }

    function onAddRest(){
        setCurrentEditRest({restTime: 0, key: createGuid()});
        setAddRestModalVisisble(true);
    }

    let renderItem = (item: any, index: any, drag: any, isActive: any ) => {
        if((item as exerciseElement).exerciseName){   
            var exercise = item as exerciseElement
            return <ExerciseElement drag={drag} exerciseName={exercise.exerciseName} exerciseReps={exercise.exerciseReps} key={exercise.key} openModal={() => setAddExerciseModalVisisble(true)} closeModal={() => setAddExerciseModalVisisble(false)} setCurrentEditExercise={setCurrentEditExercise}/>;
        }
        else if((item as restElement).restTime){
            var rest = item as restElement
            return <RestElement drag={drag} restName={rest.restName} restTime={rest.restTime} key={rest.key} openModal={() => setAddRestModalVisisble(true)} closeModal={() => setAddRestModalVisisble(false)} setCurrentEditRest={setCurrentEditRest}/>;
        }
        return <View/>;
    }
    
    return (
        <View style={{flex: 1}}>
            <AddExerciseModal existingExercise={currentEditExercise} visible={addExerciseModalVisisble} setVisibleFalse={() => setAddExerciseModalVisisble(false)} saveActionCallback={(exerciseElement) => onSaveExercise(exerciseElement)}/>
            <AddRestModal existingRest={currentEditRest} visible={addRestModalVisisble} setVisibleFalse={() => setAddRestModalVisisble(false)} saveActionCallback={(restElement) => onSaveRest(restElement)}/>
            
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
            
        </View>
    );
}



function ExerciseElement(props: exerciseElement){

    function onEditExercise(){
        //pull up the modal and pre-populate it
        if(props.openModal != undefined){
            props.openModal();
        }
        if(props.setCurrentEditExercise != undefined){
            console.log("key", props.key);
            props.setCurrentEditExercise({exerciseReps: props.exerciseReps, exerciseName: props.exerciseName, key: props.key});
        }

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
        if(props.openModal != undefined){
            props.openModal();
        }
        if(props.setCurrentEditRest != undefined){
            props.setCurrentEditRest(props);
        }
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
