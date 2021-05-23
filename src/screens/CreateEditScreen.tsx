import React, { useState } from 'react';
import { Text, TextInput, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { exerciseElement, restElement, workoutPlaylist } from '../../constants/interfaces';
import { getCurrentWorkout } from '../../redux/selectors';
import { createGuid, secondsToDisplayTimeString } from '../Utils';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ButtonColor } from '../../constants/colorStuff';
import DraggableFlatList from "react-native-draggable-flatlist";
import AddExerciseModal from '../components/AddExerciseModal';
import AddRestModal from '../components/AddRestModal';
import { deleteExerciseOrRestByKey, overrideOrAppendAllWorkouts, setCurrentWorkout} from '../../redux/actions';

export default function CreateEdit(props: any){

    const reduxWorkout = useSelector(getCurrentWorkout);

    const [newWorkout, setNewWorkout] = useState<workoutPlaylist>(reduxWorkout);
    
    const [addExerciseModalVisisble, setAddExerciseModalVisisble] = useState(false);
    const [currentEditExercise, setCurrentEditExercise] = useState({exerciseName: "", exerciseReps: 0, keyGUID:createGuid()});
    const [addRestModalVisisble, setAddRestModalVisisble] = useState(false);
    const [currentEditRest, setCurrentEditRest] = useState({restTime: 0, keyGUID:createGuid()});

    const dispatch = useDispatch()

    //TODO: test this, because it probably doesn't work, like the entire function including the redux call
    function onSaveExerciseOrRestModal(element: exerciseElement | restElement){
        let nextWorkout: workoutPlaylist = newWorkout;
        let replaced = false;
        nextWorkout.exerciseList.forEach((current, index) => {
            if(current.keyGUID == element.keyGUID){
                nextWorkout.exerciseList[index] = element;
                setNewWorkout(nextWorkout);
                replaced = true;
            }
        });
        if(!replaced){
            nextWorkout.exerciseList.push(element);
            setNewWorkout(nextWorkout);
        }
    }


    function onSaveWorkout(){
        dispatch(overrideOrAppendAllWorkouts(newWorkout));
        props.navigation.navigate('CreateStart');
    }


    function onAddExercise(){
        setCurrentEditExercise({exerciseReps: 0,exerciseName: "",keyGUID: createGuid()});
        setAddExerciseModalVisisble(true);
    }

    function onAddRest(){
        setCurrentEditRest({restTime: 0, keyGUID: createGuid()});
        setAddRestModalVisisble(true);
    }

    let renderItem = (item: any, index: any, drag: any, isActive: any ) => {
        if((item as exerciseElement).exerciseName){   
            var exercise = item as exerciseElement
            return <ExerciseElement drag={drag} exerciseName={exercise.exerciseName} exerciseReps={exercise.exerciseReps} keyGUID={exercise.keyGUID} 
            openModal={() => setAddExerciseModalVisisble(true)} closeModal={() => setAddExerciseModalVisisble(false)} setCurrentEditExercise={setCurrentEditExercise}/>;
        }
        else if((item as restElement).restTime){
            var rest = item as restElement
            return <RestElement drag={drag} restName={rest.restName} restTime={rest.restTime} keyGUID={rest.keyGUID} openModal={() => setAddRestModalVisisble(true)} 
            closeModal={() => setAddRestModalVisisble(false)} setCurrentEditRest={setCurrentEditRest}/>;
        }
        return <View/>;
    }
    
    return (
        <View style={{flex: 1}}>
            <AddExerciseModal 
                existingExercise={currentEditExercise} 
                visible={addExerciseModalVisisble} 
                setVisibleFalse={() => setAddExerciseModalVisisble(false)} 
                saveActionCallback={(exerciseElement) => onSaveExerciseOrRestModal(exerciseElement)}
            />
            <AddRestModal 
                existingRest={currentEditRest} 
                visible={addRestModalVisisble} 
                setVisibleFalse={() => setAddRestModalVisisble(false)} 
                saveActionCallback={(restElement) => onSaveExerciseOrRestModal(restElement)}
            />
            
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TextInput  
                    style={{paddingVertical: 8, paddingHorizontal: 4, margin: 7, borderBottomColor: "black", borderBottomWidth: 1}} 
                    value={newWorkout.workoutName} placeholder={newWorkout.workoutName ? "" : "Enter Workout Title"} 
                    // onChangeText={(newTitle) => dispatch(setCurrentWorkout({workoutName: newTitle, exerciseList: newWorkout.exerciseList, keyGUID: newWorkout.keyGUID}))}
                    onChangeText={(newTitle) => setNewWorkout({workoutName: newTitle, exerciseList: newWorkout.exerciseList, keyGUID: newWorkout.keyGUID})}
                />
                <TouchableOpacity  style={{padding: 12, margin: 7, backgroundColor: ButtonColor}} onPress={() => onSaveWorkout()}><Text>Save Workout</Text></TouchableOpacity>
            </View>

            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <TouchableOpacity onPress={onAddExercise} style={{padding: 12, backgroundColor: ButtonColor, margin: 7}}><Text>Add Exercise</Text></TouchableOpacity>
                <TouchableOpacity onPress={onAddRest} style={{padding: 12, backgroundColor: ButtonColor, margin: 7}}><Text>Add Rest</Text></TouchableOpacity>
            </View>

            <View style={{flex: 1}}>
                <DraggableFlatList
                    data={newWorkout.exerciseList}
                    renderItem={({ item, index, drag, isActive }) => renderItem( item, index, drag, isActive )}
                    keyExtractor={item => {return item.keyGUID}}
                    // onDragEnd={({ data }) => dispatch(setCurrentWorkout({workoutName: newWorkout.workoutName, exerciseList: data, keyGUID: newWorkout.keyGUID}))}
                    onDragEnd={({ data }) => setNewWorkout({workoutName: newWorkout.workoutName, exerciseList: data, keyGUID: newWorkout.keyGUID})}
                />
            </View>
            
        </View>
    );
}



function ExerciseElement(props: exerciseElement){

    const dispatch = useDispatch();

    function onEditExercise(){
        //pull up the modal and pre-populate it
        if(props.openModal != undefined){
            props.openModal();
        }
        if(props.setCurrentEditExercise != undefined){
            props.setCurrentEditExercise({exerciseReps: props.exerciseReps, exerciseName: props.exerciseName, keyGUID: props.keyGUID});
        }

    }

    function onDeleteExercise(){
        //delete using on changelist
        dispatch(deleteExerciseOrRestByKey(props.keyGUID))
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

    const dispatch = useDispatch();

    function onEditRest(){
        //pull up modal pre-populated
        if(props.openModal != undefined){
            props.openModal();
        }
        if(props.setCurrentEditRest != undefined){
            props.setCurrentEditRest({restTime: props.restTime, restName: props.restName, keyGUID: props.keyGUID});
        }
    }

    function onDeleteRest(){
        //delete using on change list
        dispatch(deleteExerciseOrRestByKey(props.keyGUID))
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
