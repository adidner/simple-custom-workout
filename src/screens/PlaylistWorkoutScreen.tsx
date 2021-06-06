import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { exerciseElement, restElement } from '../../constants/interfaces';
import { getCurrentWorkout } from '../../redux/selectors';
import PlaylistExercise from '../components/PlaylistExercise';
import PlaylistRest from '../components/PlaylistRest';

interface props {

}

export default function PlaylistWorkoutScreen(props: props){

    //grab current workout, based on what the current item is by index
    //display either the playlist exercise or the playlistrest
    //pass relevant info via props
    //button at bottom to increment index
    //if we're at the end move perhaps a completed workout screen? or just go back to main home screen
    
    let currentWorkout = useSelector(getCurrentWorkout);
    const currentPlaylist = currentWorkout.exerciseList;
    const [index, setIndex] = useState(0);

    function nextExercise(){
        setIndex(index + 1);
    }

    function renderScreenContent(){
        if(index < currentPlaylist.length){
            console.log("if one")
            console.log("playlist Index", currentPlaylist[index])
            if((currentPlaylist[index] as exerciseElement).exerciseName){
                console.log("exercise")
                return <PlaylistExercise nextExercise={nextExercise} {...currentPlaylist[index] as exerciseElement}/> 
            }
            else if((currentPlaylist[index] as restElement).restTime){
                console.log("rest")
                return <PlaylistRest nextExercise={nextExercise} {...currentPlaylist[index] as restElement}/>
            }
        } 
        else {    //take some action for having gotten to the end of the workout
            //TODO go to some workout is done congrats, I'm proud of you screen. 
            return <Text>You Finished!!!</Text>
        }
    }


    return (
        <View>
            <Text>You're Working out Right now. Good for you!!!</Text>
            {
               renderScreenContent()
            }
        </View>
    );
}