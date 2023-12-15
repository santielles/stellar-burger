function actionAddIngredientToBurger(ingredientsList) {
  return {
    type: 'MAKE_BURGER',
    ingredients: ingredientsList
  };
};

function actionRemoveIngredient(ingredientIndex) {
  return {
    type: 'REMOVE_INGREDIENT',
    ingredientIndex: ingredientIndex
  };
};

export { actionAddIngredientToBurger, actionRemoveIngredient };
