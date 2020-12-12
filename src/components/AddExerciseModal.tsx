import React, { useState } from 'react';
import {Text, Modal, View, TouchableOpacity,TextInput, } from 'react-native';
import { exerciseElement } from '../../constants/interfaces';
import { createGuid } from '../Utils';
import { styles } from '../../styles/styles'

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
            <View style={styles.centeredView}>    
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add Exercise</Text>
                    <View style={styles.modalRow}>
                        <Text style={styles.modalText}>Name:</Text>
                        <TextInput style={styles.modalInput}>{props.existingExercise?.exerciseName}</TextInput>
                    </View>
                    
                    <View style={styles.modalRow}>
                        <Text style={styles.modalText}>Reps:</Text>
                        <TextInput style={styles.modalInput}>{props.existingExercise?.exerciseReps}</TextInput>
                    </View>
                    
                    <View style={styles.modalRow}>
                        <TouchableOpacity style={styles.modalButton} onPress={onSave}><Text>Save</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        
    );
}

