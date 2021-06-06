import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { restElement } from '../../constants/interfaces';

interface props extends restElement{
    nextExercise: () => void;
}

export default function PlaylistRest(props: props){
    console.log("playlistRest", props)

    const [secondsLeft, setSecondsLeft] = useState(props.restTime);

    useEffect(()=> {
        const timer = setTimeout(() => {
            if(secondsLeft > 0){
                setSecondsLeft(secondsLeft - 1)
            }
            else {
                props.nextExercise();
            }
        }, 1000)
    });

    function displayTime(){
        let minutes = Math.floor(secondsLeft / 60);
        let seconds: number = secondsLeft % 60;
        let displaySeconds: string = seconds.toString();
        if(seconds < 10){
            displaySeconds = "0" + seconds.toString()
        }
        return <Text>{minutes}:{displaySeconds}</Text>
    }

    return (
        <View>
            <Text>Rest</Text>
            {displayTime()}
            <TouchableOpacity onPress={() => props.nextExercise()}>
                <Text>Next Exercise</Text>
            </TouchableOpacity>
        </View>
    );
}