import React, { useState } from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { exerciseElement, restAndExerciseElement, restElement } from '../../constants/interfaces';
import { getAllWorkouts, getCurrentAllWorkoutsIndex, getCurrentWorkout } from '../../redux/selectors';
import { createGuid } from '../Utils';

export default function CreateEdit(){

    var allWorkouts = useSelector(getAllWorkouts)
    var currentAllWorkoutsIndex = useSelector(getCurrentAllWorkoutsIndex);
    var currentWorkout;
    if(currentAllWorkoutsIndex){
        currentWorkout = allWorkouts[currentAllWorkoutsIndex]; 
    }
    const [titleValue, onChangeTitle] = useState(currentWorkout?.workoutName);

    function onSave(){
        //override state in redux store, using local state playlist obj to override the one at the index we're talking about
    }

    function onAddExercise(){

    }

    function onAddRest(){

    }

    
    return (
        <View>
            <View style={{flexDirection: "row"}}>
                <TextInput value={titleValue} onChangeText={onChangeTitle}/>
                <TouchableOpacity onPress={onSave}><Text>Save</Text></TouchableOpacity>
            </View>

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity onPress={onAddExercise}><Text>Add Exercise</Text></TouchableOpacity>
                <TouchableOpacity onPress={onAddRest}><Text>Add Rest</Text></TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={currentWorkout?.exerciseList}
                    renderItem={({item}) => {
                        if(item as exerciseElement){
                        //if((item as exerciseElement).exerciseName){   
                            var exercise = item as exerciseElement
                            return <ExerciseElement name={exercise.exerciseName} repsOrTime={exercise.exerciseReps.toString()} />;
                        }
                        else if(item as restElement){
                            var rest = item as restElement
                            return <ExerciseElement name={rest.restName} repsOrTime={rest.restTime.toString()} />;
                        }
                        return <View/>;
                    }}
                    keyExtractor={item => {return createGuid()}}
                />
            </View>

        </View>
    );
}



function ExerciseElement(props: restAndExerciseElement){
    return (
        <View style={{flexDirection:'row'}}>
            <View><Text>Icon</Text></View>
            <View><Text>{props.name}</Text></View>
            <View><Text>{props.repsOrTime}</Text></View>
            <View><Text>Edit</Text></View>
            <View><Text>X</Text></View>
        </View>
    );
}