import { workoutPlaylist } from "../constants/interfaces";

export interface actionInterface{
    type: string;
    currentWorkoutIndex: number;
    exerciseIndex: number;
    allWorkouts: workoutPlaylist[];
    currentAllWorkoutsIndex: number;
}


export const SET_CURRENT_WORKOUT = "SET_CURRENT_WORKOUT";
export const SET_EXERCISE_INDEX = "SET_EXERCISE_INDEX";
export const SET_ALL_WORKOUTS = "SET_ALL_WORKOUTS";
export const SET_CURRENT_ALL_WORKOUTS_INDEX = "SET_CURRENT_ALL_WORKOUTS_INDEX";


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