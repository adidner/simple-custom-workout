import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducer';

const store = createStore(rootReducer);
export default store;
