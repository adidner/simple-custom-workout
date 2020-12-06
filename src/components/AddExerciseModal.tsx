import React, { useState } from 'react';
import {Text, Modal, View, TouchableOpacity,TextInput, 
    StyleSheet,} from 'react-native';
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
            <View style={{alignItems: "center", justifyContent: "center", backgroundColor: "white"}}>    
                <View style={styles.modalView}>
                    <Text>AddExerciseModal</Text>
                    <View style={{flexDirection: 'row'}}>
                            <Text>Exercise Name:</Text>
                            <TextInput>{props.existingExercise?.exerciseName}</TextInput>
                    </View>
                    
                    <View style={{flexDirection: 'row'}}>
                        <Text>Exercise Reps:</Text>
                        <TextInput>{props.existingExercise?.exerciseReps}</TextInput>
                    </View>
                    
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={onSave}><Text>Save</Text></TouchableOpacity>
                        <TouchableOpacity onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });