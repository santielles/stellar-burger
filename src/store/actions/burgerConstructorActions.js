import { ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS } from '../../utils/constants';
import { v4 as uuidv4 } from 'uuid';

function addIngredientToBurgerAction(ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient: {
      ...ingredient,
      uniqueId: uuidv4()
    }
  };
};

function removeIngredientAction(ingredientIndex) {
  return {
    type: REMOVE_INGREDIENT,
    ingredientIndex: ingredientIndex
  };
};

function reorderIngredientsAction(fromIndex, toIndex) {
  return {
    type: REORDER_INGREDIENTS,
    payload: { fromIndex, toIndex }
  };
};

export { addIngredientToBurgerAction, removeIngredientAction, reorderIngredientsAction };
