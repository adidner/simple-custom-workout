import { workoutPlaylist } from "../constants/interfaces";

export interface actionInterface{
    type: string;
    currentWorkoutKey: string;
    allWorkouts: workoutPlaylist[];
    currentAllWorkoutsIndex: number;
    workout: workoutPlaylist;
    newWorkout: workoutPlaylist;
    keyGUID: string;
}


export const SET_CURRENT_WORKOUT_BY_KEY = "SET_CURRENT_WORKOUT_BY_KEY";
export const SET_CURRENT_WORKOUT_BLANK = "SET_CURRENT_WORKOUT_BLANK";
export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_ALL_WORKOUTS = "SET_ALL_WORKOUTS";
export const SET_CURRENT_ALL_WORKOUTS_INDEX = "SET_CURRENT_ALL_WORKOUTS_INDEX";
export const OVERRIDE_OR_APPEND_ALL_WORKOUTS = "OVERRIDE_OR_APPEND_ALL_WORKOUTS";
export const DELETE_WORKOUT_BY_KEY = "DELETE_WORKOUT_BY_KEY";

export function setCurrentWorkOutBlank(){
    return {type: SET_CURRENT_WORKOUT_BLANK}
}

export function setCurrentWorkout(newWorkout: workoutPlaylist){
    return {type: SET_CURRENT_WORKOUT, newWorkout}
}

export function setCurrentWorkoutByKey(currentWorkoutKey: string){
    return {type: SET_CURRENT_WORKOUT_BY_KEY, currentWorkoutKey}
}

export function setAllWorkouts(allWorkouts: workoutPlaylist[]){
    return {type: SET_ALL_WORKOUTS, allWorkouts}
}

export function overrideOrAppendAllWorkouts(workout: workoutPlaylist){
    return {type: OVERRIDE_OR_APPEND_ALL_WORKOUTS, workout}
}

export function deleteWorkoutByKey(keyGUID: string){
    return {type: DELETE_WORKOUT_BY_KEY, keyGUID}
}