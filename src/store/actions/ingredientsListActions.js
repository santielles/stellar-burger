// Это action, и это объект, который передает данные из вашего приложения в store.
// Действия (actions) отправляются (dispatched) в store с помощью функций.
function actionLoadIngredients(ingredientsList) {
  return {
    type: 'LOAD_INGREDIENTS',
    ingredients: ingredientsList
  };
};

// этот action мы используем для того чтобы увеличть число над ингридиентом в BurgerIngredients в "Ingredients"
function actionIncreaseCount(ingredientID) {
  return {
    type: 'INCREASE_INGREDIENTS_COUNT',
    ingredientID: ingredientID
  };
};

function actionDecreaseCount(ingredientID) {
  return {
    type: 'DECREASE_INGREDIENTS_COUNT',
    ingredientID: ingredientID
  };
};

export { actionLoadIngredients, actionIncreaseCount, actionDecreaseCount };
