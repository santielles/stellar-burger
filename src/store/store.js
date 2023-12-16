import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { reducerIngredientsList } from './reducers/ingredientsListReducer';
import { reducerBurgerConstructor } from './reducers/burgerConstructorReducer';
import { reducerOrderData } from './reducers/orderReducer';

// rootReducer это константа в котрой находится объект из нескольких редьюсеров
const rootReducer = combineReducers({
  ingredientsListStore: reducerIngredientsList,
  burgerConstructorStore: reducerBurgerConstructor,
  orderDataStore: reducerOrderData
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
