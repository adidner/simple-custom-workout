import { reduxState } from "../constants/interfaces";


export function getExerciseIndex(state: reduxState){
    return state.exerciseIndex;
}

export function getCurrentWorkout(state: reduxState){
    return state.currentWorkout;
}