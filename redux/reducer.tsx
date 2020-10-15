import {SET_CURRENT_WORKOUT, SET_EXERCISE_INDEX, actionInterface} from './actions';
import {reduxState} from '../constants/interfaces'
  
const initialState: reduxState = {
    currentWorkout: [],
    exerciseIndex: -1,
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
      default:
        return state;
    }
  }
  
 
  