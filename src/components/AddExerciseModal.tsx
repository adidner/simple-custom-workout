import React, { useEffect, useState } from 'react';
import {Text, Modal, View, TouchableOpacity,TextInput, } from 'react-native';
import { exerciseElement } from '../../constants/interfaces';
import { createGuid } from '../Utils';
import { styles } from '../../styles/styles'

interface props {
    visible: boolean;
    setVisibleFalse: () => void;
    saveActionCallback: (element: exerciseElement) => void;
    existingExercise: exerciseElement
}

export default function AddExerciseModal(props: props){

    //TODO, key is undefined here
    console.log("props", props);

    const [exerciseName, setExerciseName] = useState(props.existingExercise.exerciseName);

    const [exerciseReps, setExerciseReps] = useState(props.existingExercise.exerciseReps.toString());

    useEffect(() => {
        setExerciseName(props.existingExercise.exerciseName);
        setExerciseReps(props.existingExercise.exerciseReps.toString());
      }, [props]);

    function onSave(){
        let newExerciseElement: exerciseElement = {
            exerciseName: exerciseName,
            exerciseReps: Number(exerciseReps),
            //TODO, key is undefined here, which means in its onsave it can't match keys
            key: props.existingExercise.key,
        };
        props.saveActionCallback(newExerciseElement);
        props.setVisibleFalse();
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
                        <View style={styles.modalColumn}>
                            <Text style={styles.modalTextPaddingRight}>Name:</Text>
                            <Text style={styles.modalTextPaddingRight}>Reps:</Text>
                        </View>
                        
                        <View style={styles.modalColumn}>
                            <TextInput style={styles.modalInput} onChangeText={text => setExerciseName(text)} value={exerciseName}/>
                            <TextInput style={styles.modalInput} onChangeText={setExerciseReps} value={exerciseReps}/>
                        </View>
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

