import { workoutPlaylist } from "../constants/interfaces";

export interface actionInterface{
    type: string;
    currentWorkoutIndex: number;
    exerciseIndex: number;
    allWorkouts: workoutPlaylist[];
    currentAllWorkoutsIndex: number;
    workout: workoutPlaylist;
}


export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_EXERCISE_INDEX = "SET_EXERCISE_INDEX";
export const SET_ALL_WORKOUTS = "SET_ALL_WORKOUTS";
export const SET_CURRENT_ALL_WORKOUTS_INDEX = "SET_CURRENT_ALL_WORKOUTS_INDEX";
export const OVERRIDE_OR_APPEND_ALL_WORKOUTS = "OVERRIDE_OR_APPEND_ALL_WORKOUTS";


export function setCurrentWorkoutByIndex(currentWorkoutIndex: number){
    return {type: SET_CURRENT_WORKOUT, currentWorkoutIndex}
}

export function setExerciseIndex(exerciseIndex: number){
    return {type: SET_EXERCISE_INDEX, exerciseIndex}
}

export function setAllWorkouts(allWorkouts: workoutPlaylist[]){
    return {type: SET_ALL_WORKOUTS, allWorkouts}
}

export function setCurrentAllWorkoutsIndex(currentAllWorkoutsIndex: number){
    return {type: SET_CURRENT_ALL_WORKOUTS_INDEX, currentAllWorkoutsIndex}
}

export function overrideOrAppendAllWorkouts(workout: workoutPlaylist){
    return {type: OVERRIDE_OR_APPEND_ALL_WORKOUTS, workout}
}