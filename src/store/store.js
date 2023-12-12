import { createStore, combineReducers } from 'redux';
import { reducerIngredientsList } from './reducers/ingredientsListReducer';
import { reducerBurgerConstructor } from './reducers/burgerConstructorReducer';

// rootReducer это константа в котрой находится объект из нескольких редьюсеров
const rootReducer = combineReducers({
  ingredientsListStore: reducerIngredientsList,
  burgerConstructorStore: reducerBurgerConstructor
});

const store = createStore(rootReducer);

export { store };
