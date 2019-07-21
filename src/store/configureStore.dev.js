import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, createLogger())
  );
}
