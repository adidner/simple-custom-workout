import React, { useState } from 'react';
import {Text, Modal, View, TouchableOpacity} from 'react-native';
import { exerciseElement } from '../../constants/interfaces';
import { createGuid } from '../Utils';

interface props {
    visible: boolean;
    setVisibleFalse: () => void;
    saveActionCallback: (element: exerciseElement) => void;
    existingExercise?: exerciseElement
}

export default function AddExerciseModal(props: props){
    let existingName: string = props.existingExercise != undefined ? props.existingExercise.exerciseName : "";
    const [exerciseName, setExerciseName] = useState(existingName);

    let existingReps: string = props.existingExercise != undefined ? props.existingExercise.exerciseReps.toString() : "";
    const [exerciseReps, setExerciseReps] = useState(existingReps);
    

    function onSave(){
        let newExerciseElement: exerciseElement = {
            exerciseName: exerciseName,
            exerciseReps: Number(exerciseReps),
            key: createGuid(),
        };
        props.saveActionCallback(newExerciseElement);
    }

    function onCancel(){
        props.setVisibleFalse();
    }
    
    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        >
            
            <View style={{justifyContent: 'space-around'}}>
                <Text>AddExerciseModal</Text>
                <Text>Are you sure you want to delete: {props.workoutTitle}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={onSave}><Text>Save</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                </View>
            </View>

        </Modal>
    );
}