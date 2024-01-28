import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsListReducer } from './reducers/ingredientsListReducer';
import { burgerConstructorReducer } from './reducers/burgerConstructorReducer';
import { orderReducer } from './reducers/orderReducer';
import { accountReducer } from './reducers/accountReducer';

// rootReducer это константа в котрой находится объект из нескольких редьюсеров
const rootReducer = combineReducers({
  ingredientsListStore: ingredientsListReducer,
  burgerConstructorStore: burgerConstructorReducer,
  orderDataStore: orderReducer,
  accountDataStore: accountReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
