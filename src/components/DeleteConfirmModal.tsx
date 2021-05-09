import React from 'react';
import {Text, Modal, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface DeleteConfirmModalPropsInterface {
    onYes?: () => void;
    onCancel?: () => void;
    visible: boolean;
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
        props.onCancel?.();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}            
        >
            <View style={{justifyContent: 'space-around'}}>
                <Text>Are you sure you want to delete: {props.deleteTargetText}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={onYes}><Text>Yes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}