import React, { useState } from 'react';
import {Text, Modal, View, TouchableOpacity,TextInput, } from 'react-native';
import { restElement } from '../../constants/interfaces';
import { createGuid } from '../Utils';
import { styles } from '../../styles/styles'

interface props {
    visible: boolean;
    setVisibleFalse: () => void;
    saveActionCallback: (element: restElement) => void;
    existingRest?: restElement
}

export default function AddRestModal(props: props){

    let existingRest: string = props.existingRest != undefined ? props.existingRest.restTime.toString() : "";
    const [exerciseRest, setExerciseRest] = useState(existingRest);

    
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    

    function onSave(){
        let newRestElement: restElement = {
            restTime: Number(exerciseRest),
            key: createGuid(),
        };
        props.saveActionCallback(newRestElement);
    }

    function onCancel(){
        props.setVisibleFalse();
    }

    function onChangeMinutes(text: string){
        var numberVersion: number = Number(text);
        if(numberVersion >= 0 && numberVersion <= 59){
            setMinutes(numberVersion);
        }
    }

    function onChangeSeconds(text: string){
        var numberVersion: number = Number(text);
        console.log("numberVersion", numberVersion);
        if(numberVersion >= 0 && numberVersion <= 59){
            
            console.log("in setter");
            setSeconds(numberVersion);
        }
    }
    
    return (
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centeredView}>    
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Add Rest</Text>
                    
                    <View style={styles.modalRow}>
                        <View style={styles.modalColumn}>
                            <Text style={styles.modalTextRest}>Rest:</Text>
                        </View>
                        
                        <View style={styles.modalColumn}>
                            <View style={styles.modalRow}>
                                <TextInput style={styles.modalInputTimer} keyboardType={'numeric'} onChangeText={(text) => onChangeMinutes(text)} value={minutes.toString()}/>
                                <Text style={styles.modalText}>:</Text>
                                <TextInput style={styles.modalInputTimer} keyboardType={'numeric'} onChangeText={(text) => onChangeSeconds(text)} value={seconds.toString()}/>
                            </View>
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

