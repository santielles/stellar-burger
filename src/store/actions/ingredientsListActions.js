// Это action, и это объект, который передает данные из вашего приложения в store.
// Действия (actions) отправляются (dispatched) в store с помощью функций.
function actionLoadIngredients(ingredientsList) {
  return {
    type: 'LOAD_INGREDIENTS',
    ingredients: ingredientsList
  };
};

export { actionLoadIngredients };
