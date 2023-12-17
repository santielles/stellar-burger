import { ADD_INGREDIENT, REMOVE_INGREDIENT, REORDER_INGREDIENTS } from '../../utils/constants';

function addIngredientToBurgerAction(ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient: ingredient
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
