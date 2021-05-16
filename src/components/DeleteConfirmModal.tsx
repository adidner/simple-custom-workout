import React from 'react';
import {Text, Modal, View, TouchableOpacity} from 'react-native';
import { styles } from '../../styles/styles'

interface DeleteConfirmModalPropsInterface {
    onYes?: () => void;
    onCancel?: () => void;
    visible: boolean;
    setVisibleFalse: () => void;
    deleteTargetText: string;
}


//TODO: Props shouldn't by any
//Should put this in CreateStart and pass it the toggleModal function, visibility, 
//Also correct style issues that definielty exist, use this as a tempalte for the other 2 modals
export default function DeleteConfirmModal(props: DeleteConfirmModalPropsInterface){

    function onYes(){
        //do some async stuff
        props.onYes?.();
    }

    function onCancel(){
        props.setVisibleFalse();
        props.onCancel?.();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}            
        >
            <View style={styles.centeredView}>    
                <View style={styles.modalView}>
                    <Text>Are you sure you want to delete: {props.deleteTargetText}</Text>
                    <View style={styles.modalRow}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => onCancel()}><Text>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.modalButton} onPress={onYes}><Text>Yes</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}