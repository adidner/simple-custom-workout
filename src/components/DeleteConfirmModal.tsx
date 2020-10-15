import React from 'react';
import {Text, Modal, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


//TODO: Props shouldn't by any
//Should put this in CreateStart and pass it the toggleModal function, visibility, 
//Also correct style issues that definielty exist, use this as a tempalte for the other 2 modals
export default function DeleteConfirmModal(props: any){

    function onYes(){
        //do some async stuff
        props.toggleModal();
    }

    function onCancel(){
        props.toggleModal();
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.deleteConfirmModalVisible}            
        >
            <View style={{justifyContent: 'space-around'}}>
                <Text>Are you sure you want to delete: {props.workoutTitle}</Text>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={onYes}><Text>Yes</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onCancel}><Text>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}