import {SET_CURRENT_WORKOUT, SET_EXERCISE_INDEX, actionInterface, SET_ALL_WORKOUTS} from './actions';
import {reduxState} from '../constants/interfaces'
  
const initialState: reduxState = {
    currentWorkout: undefined,
    exerciseIndex: undefined,
    allWorkouts: [{workoutName: "workout1", exerciseList: []},{workoutName: "workout2", exerciseList: []}, {workoutName: "workout3", exerciseList: []}],
};
  
  export default function rootReducer(state = initialState, action: actionInterface) {
    switch (action.type){
      case SET_CURRENT_WORKOUT:
        return Object.assign({}, state, {
            currentWorkout: action.currentWorkout
          })
      case SET_EXERCISE_INDEX:
        return Object.assign({}, state, {
            exerciseIndex: action.exerciseIndex
          })
      case SET_ALL_WORKOUTS:
        return Object.assign({}, state, {
          allWorkouts: action.allWorkouts
        })   
      default:
        return state;
    }
  }
  
 
  