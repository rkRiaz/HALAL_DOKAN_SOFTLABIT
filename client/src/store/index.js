import { createStore, compose, applyMiddleware } from 'redux' 
import rootReducer from './reducers/rootReducer'
import thunk from 'redux-thunk'
import {loadState, saveState} from './localStorage'


const middlewares = [thunk]

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, compose(
    applyMiddleware(...middlewares),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

store.subscribe(() => {
  saveState({
    busket: store.getState().busket
  });
});


export default store