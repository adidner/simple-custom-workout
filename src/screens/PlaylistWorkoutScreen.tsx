import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MediumFontSize } from '../../constants/fontStuff';
import { exerciseElement, restElement } from '../../constants/interfaces';
import { getCurrentWorkout } from '../../redux/selectors';
import { styles } from '../../styles/styles';
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
            if((currentPlaylist[index] as exerciseElement).exerciseName){
                return <PlaylistExercise nextExercise={nextExercise} {...currentPlaylist[index] as exerciseElement}/> 
            }
            else if((currentPlaylist[index] as restElement).restTime){
                return <PlaylistRest nextExercise={nextExercise} {...currentPlaylist[index] as restElement}/>
            }
        } 
        else {    //take some action for having gotten to the end of the workout
            //TODO go to some workout is done congrats, I'm proud of you screen. 
            return <Text style={{fontSize: MediumFontSize}}>You Finished!!!</Text>
        }
    }


    return (
        <View style={{flex: 1,  padding: 10}}>
            <View style={{flex: 0}}>
                <Text style={{fontSize: MediumFontSize}}>You're Working out Right now. Good for you!!!</Text>
            </View>
            <View style={{justifyContent:"center", alignItems:"center", alignSelf:"stretch", flex: 1}}>
            {
               renderScreenContent()
            }
            </View>
        </View>
    );
}