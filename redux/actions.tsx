import { workoutPlaylist } from "../constants/interfaces";

export interface actionInterface{
    type: string;
    currentWorkout: workoutPlaylist;
    exerciseIndex: number;
    allWorkouts: workoutPlaylist[];
}


export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_EXERCISE_INDEX = "SET_EXERCISE_INDEX";
export const SET_ALL_WORKOUTS = "SET_ALL_WORKOUTS";


export function setCurrentWorkout(currentWorkout: workoutPlaylist){
    return {type: SET_CURRENT_WORKOUT, currentWorkout}
}

export function setExerciseIndex(exerciseIndex: number){
    return {type: SET_EXERCISE_INDEX, exerciseIndex}
}

export function setAllWorkouts(allWorkouts: workoutPlaylist[]){
    return {type: SET_ALL_WORKOUTS, allWorkouts}
}