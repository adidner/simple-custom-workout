import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ButtonColor } from '../../constants/colorStuff';
import { MediumFontSize, SuperLargeFontSize } from '../../constants/fontStuff';
import { exerciseElement } from '../../constants/interfaces';

interface props extends exerciseElement{
    nextExercise: () => void;
}

export default function PlaylistExercise(props: props){

    return (
        <View style={{flex: 1, justifyContent:"space-around", alignItems:"center"}}>
            <Text style={{fontSize: SuperLargeFontSize}}>{props.exerciseName}: {props.exerciseReps}</Text>
            <TouchableOpacity onPress={() => props.nextExercise()}>
                    <Text style={{backgroundColor: ButtonColor, padding: 12, fontSize: MediumFontSize}}>Next Exercise</Text>
            </TouchableOpacity>
        </View>
    );
}