import {SET_CURRENT_WORKOUT_BY_KEY, actionInterface, SET_ALL_WORKOUTS, SET_CURRENT_ALL_WORKOUTS_INDEX, OVERRIDE_OR_APPEND_ALL_WORKOUTS, SET_CURRENT_WORKOUT_BLANK, SET_CURRENT_WORKOUT, DELETE_WORKOUT_BY_KEY} from './actions';
import {reduxState, workoutPlaylist} from '../constants/interfaces'
import { createGuid } from '../src/Utils';
  
const initialState: reduxState = {
    currentWorkout: {workoutName:"initial", exerciseList:[], keyGUID:createGuid()},
    //we should grab all workouts from memory, and we should re-index things upon retrieval and whenever we delete an obj
    allWorkouts: [{workoutName: "workout1", keyGUID:createGuid(), exerciseList: [{exerciseName: "HSPUs", exerciseReps: 12, keyGUID:createGuid()},{restTime: 187, keyGUID:createGuid()}, {exerciseName: "Pull UPs", exerciseReps: 12, keyGUID:createGuid()}]},{workoutName: "workout2", keyGUID:createGuid(), exerciseList: [{restTime: 20, keyGUID:createGuid()}, {exerciseName: "Pullups", exerciseReps: 15, keyGUID:createGuid()},]}, {workoutName: "workout3", keyGUID:createGuid(), exerciseList: []}],
    // currentAllWorkoutsIndex: undefined,
};
  
  export default function rootReducer(state = initialState, action: actionInterface) {
    switch (action.type){
      case SET_CURRENT_WORKOUT_BY_KEY:
        const newCurrentWorkout: workoutPlaylist[] = state.allWorkouts.filter((current) => current.keyGUID === action.currentWorkoutKey);
        return Object.assign({}, state, {
            currentWorkout: newCurrentWorkout[0],
          })
      case SET_CURRENT_WORKOUT:
        return Object.assign({}, state, {
          currentWorkout: action.newWorkout,
        })
      case SET_CURRENT_WORKOUT_BLANK:
        let newIndex = state.allWorkouts.length + 1;
        return Object.assign({}, state, {
          currentWorkout: {index: newIndex, workoutName:"", exerciseList:[]},
          currentWorkoutIndex: undefined
        })
      case DELETE_WORKOUT_BY_KEY: 
      return Object.assign({}, state, {
        allWorkouts: state.allWorkouts.filter((current) => current.keyGUID != action.keyGUID)
      }) 
      case SET_ALL_WORKOUTS:
        //also do an async save here
        return Object.assign({}, state, {
          allWorkouts: action.allWorkouts
        })   
      // case SET_CURRENT_ALL_WORKOUTS_INDEX:
      //   return Object.assign({}, state, {
      //     currentAllWorkoutsIndex: action.currentAllWorkoutsIndex
      //   })
      //TODO: test this, because it probably doesn't work
      // case OVERRIDE_OR_APPEND_ALL_WORKOUTS:
      //   let newAllWorkouts: workoutPlaylist[] = JSON.parse(JSON.stringify(state.allWorkouts));
      //   let replaced: boolean = false;
      //   newAllWorkouts.forEach((current, index) => {
      //     if(current.keyGUID == action.workout.keyGUID){
      //       newAllWorkouts[index] = action.workout;
      //       replaced = true;
      //     }
      //   });
          
      //   if(!replaced){
      //     newAllWorkouts.push(action.workout);
      //   }
      //   return Object.assign({}, state, {
      //     allWorkouts: newAllWorkouts
      //   })
      default:
        return state;
    }
  }
  
 
  