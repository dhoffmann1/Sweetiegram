import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import postReducer from './post';
import followingReducer from './following';
import userReducer from './user';
import commentReducer from './comments';
import searchReducer from './searchbar';

const rootReducer = combineReducers({
  session,
  // added
  posts: postReducer,
  followings: followingReducer,
  users: userReducer,
  comments: commentReducer,
  search: searchReducer,

});



let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
