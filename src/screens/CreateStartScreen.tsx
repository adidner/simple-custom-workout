import React, { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { ButtonColor } from '../../constants/colorStuff';
import { LargeFontSize, MediumFontSize, SuperLargeFontSize } from '../../constants/fontStuff';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getAllWorkouts } from '../../redux/selectors';
import { workoutPlaylist } from '../../constants/interfaces';
import { deleteWorkoutByKey, setCurrentWorkOutBlank, setCurrentWorkoutByKey } from '../../redux/actions';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import AddExerciseModal from '../components/AddExerciseModal';

export default function CreateStart(props: any){

    //do async stuff to grab DATA array
    let DATA: workoutPlaylist[] = useSelector(getAllWorkouts);

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [currentDeleteWorkoutKeyGUID, setCurrentDeleteWorkoutKeyGUID] = useState<string>();

    const dispatch = useDispatch();

    function onCreateNewWorkout(){
        //go to other screen and have it be empty
        dispatch(setCurrentWorkOutBlank());
        props.navigation.navigate('CreateEdit');
    }

    function onDelete(){
        if(currentDeleteWorkoutKeyGUID){
            dispatch(deleteWorkoutByKey(currentDeleteWorkoutKeyGUID))
        }
        console.log("currentDeletWorkout", currentDeleteWorkoutKeyGUID);
    }

    return (
        <View style={{paddingLeft: 10, paddingRight: 10, alignItems:"center", justifyContent: "space-around", flex: 1}}>
            <DeleteConfirmModal setVisibleFalse={() => setDeleteModalVisible(false)} visible={deleteModalVisible} deleteTargetText={props.name} onYes={onDelete} onCancel={() => setDeleteModalVisible(false)}/>
    
            <View style={{ flex: 0.25, justifyContent:'center'}}><Text style={{fontSize:LargeFontSize}}>Simple Custom Workout</Text></View>

            <View style={{flex: 1.5, backgroundColor: "yellow",alignSelf: "stretch", paddingHorizontal: 15}}>
                {DATA == [] 
                ? <Text>No Workouts Saved</Text> 
                : <FlatList
                    data={DATA}
                    renderItem={({item}) => <WorkoutElement setDeleteModalVisible={setDeleteModalVisible} name={item.workoutName} navigation={props.navigation} keyGUID={item.keyGUID} setCurrentDeleteWorkoutKeyGUID={setCurrentDeleteWorkoutKeyGUID}/>}
                    keyExtractor={item => item.workoutName}
                />}
            </View>

            <View style={{flex: 0.25, justifyContent:'center'}}><TouchableOpacity onPress={onCreateNewWorkout}><Text style={{fontSize:MediumFontSize, backgroundColor:ButtonColor, padding: 10}}>Create New Workout</Text></TouchableOpacity></View>
        </View>
    );
}

function WorkoutElement(props: {name:string, navigation: any, keyGUID:string, setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>,setCurrentDeleteWorkoutKeyGUID: (keyGUID:string) => void}){

    const dispatch = useDispatch();
    
    
    function onEdit(){
        //go to other screen and populate with that workout
        dispatch(setCurrentWorkoutByKey(props.keyGUID));
        props.navigation.navigate('CreateEdit');
    }
    
    function onStartWorkout(){
        dispatch(setCurrentWorkoutByKey(props.keyGUID));
        props.navigation.navigate('PlaylistWorkout');
    }

    function onTrashcanPress(){
        props.setCurrentDeleteWorkoutKeyGUID(props.keyGUID)
        props.setDeleteModalVisible(true)
    }
    
    return (
        <>
            <TouchableOpacity onPress={onStartWorkout} style={{flexDirection: "row",  marginVertical: 10, padding: 12, flex: 1, backgroundColor: "purple", alignItems:"center", justifyContent:'space-between'}}>
                <View><Text style={{fontSize: MediumFontSize}}>{props.name}</Text></View>
                <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => onEdit()} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialIcons name="mode-edit" size={24} color="black" /></View></TouchableOpacity>
                    <TouchableOpacity onPress={() => onTrashcanPress()} style={{paddingHorizontal:7}}><View style={{backgroundColor: ButtonColor, padding: 12}}><MaterialCommunityIcons name="trash-can" size={24} color="black" /></View></TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    );
}

