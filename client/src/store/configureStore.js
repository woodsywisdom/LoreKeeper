import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import campaigns from './campaigns';
import categories from './categories';
import tags from './tags';

const entities = combineReducers({
  campaigns,
  categories,
  tags,
})

const rootReducer = combineReducers({
  auth,
  entities,
});

let storeEnhancer;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancer
  );
}
