import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducer';
const composeEnhancers = compose;

export const composeStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export type AppState = ReturnType<typeof rootReducer>;
