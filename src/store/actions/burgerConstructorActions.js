function actionAddIngredientToBurger(ingredient) {
  return {
    type: 'ADD_INGREDIENT',
    ingredient: ingredient
  };
};

function actionRemoveIngredient(ingredientIndex) {
  return {
    type: 'REMOVE_INGREDIENT',
    ingredientIndex: ingredientIndex
  };
};

export { actionAddIngredientToBurger, actionRemoveIngredient };
