import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { exerciseElement } from '../../constants/interfaces';

interface props extends exerciseElement{
    nextExercise: () => void;
}

export default function PlaylistExercise(props: props){

    return (
        <View>
            <Text>{props.exerciseName}</Text>
            <Text>{props.exerciseReps}</Text>
            <TouchableOpacity onPress={() => props.nextExercise()}>
                    <Text>Next Exercise</Text>
            </TouchableOpacity>
        </View>
    );
}