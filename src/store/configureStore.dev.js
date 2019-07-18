import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
// import { routerMiddleware } from 'react-router-redux';
// import createHistory from 'history/createBrowserHistory';

// export const history = createHistory();
// const myRouterMiddleware = routerMiddleware(history);

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, reduxImmutableStateInvariant(), createLogger())
  );
}
