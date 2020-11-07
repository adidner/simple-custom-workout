import {SET_CURRENT_WORKOUT, SET_EXERCISE_INDEX, actionInterface, SET_ALL_WORKOUTS, SET_CURRENT_ALL_WORKOUTS_INDEX} from './actions';
import {reduxState} from '../constants/interfaces'
  
const initialState: reduxState = {
    currentWorkout: undefined,
    exerciseIndex: undefined,
    //we should grab all workouts from memory, and we should re-index things upon retrieval and whenever we delete an obj
    allWorkouts: [{index: 0, workoutName: "workout1name", exerciseList: [{exerciseName: "HSPUs", exerciseReps: 12},{restTime: 180}]},{index: 1, workoutName: "workout2name", exerciseList: [{restTime: 20}, {exerciseName: "Pullups", exerciseReps: 15},]}, {index: 2, workoutName: "workout3name", exerciseList: []}],
    currentAllWorkoutsIndex: undefined,
};
  
  export default function rootReducer(state = initialState, action: actionInterface) {
    switch (action.type){
      case SET_CURRENT_WORKOUT:
        return Object.assign({}, state, {
            currentWorkout: state.allWorkouts[action.currentWorkoutIndex],
            currentWorkoutIndex: action.currentWorkoutIndex
          })
      case SET_EXERCISE_INDEX:
        return Object.assign({}, state, {
            exerciseIndex: action.exerciseIndex
          })
      case SET_ALL_WORKOUTS:
        //also do an async save here

        
        return Object.assign({}, state, {
          allWorkouts: action.allWorkouts
        })   
      case SET_CURRENT_ALL_WORKOUTS_INDEX:
        return Object.assign({}, state, {
          currentAllWorkoutsIndex: action.currentAllWorkoutsIndex
        })
      default:
        return state;
    }
  }
  
 
  