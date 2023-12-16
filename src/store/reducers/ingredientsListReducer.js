const ingredientsList = [];

// Функция reducerIngredientsList наш редьюсер со списком ингредиентов
// Он принимает в качестве аргументов - стор (ingredientsList) и действие/объект (action)
// т.е. то что диспетчер нам передает и будет в action
// а передает он объект где будет type и responseJSON.data (список наших ингредиентов)
function reducerIngredientsList(state = ingredientsList, action) {
  switch (action.type) {
    case 'LOAD_INGREDIENTS':
      return action.ingredients;
    case 'INCREASE_INGREDIENTS_COUNT':
      // здесь мы прогоняем наш state(массив со списком ингредиентов) через map и получаем каждый ингредиент
      return state.map((ingredient) => {
        // action.ingredientID - приходит из action "actionIncreaseCount" который указан в бургер конструкторе в диспетчере
        // dispatch(actionIncreaseCount(draggableIngredientInfo._id)) - где "draggableIngredientInfo._id" это наши перетаскиваемые
        // ингредиенты. То есть мы проверяем, если наш ингредиент из стора с полем id равно уже дропнутому ингредиенту с такой же id
        // то тогда мы берем наш ингредиент и в нем изменяем поле count на текущее значение count но уже +1
        if (ingredient._id === action.ingredientID) {
          if (ingredient.type === 'bun') {
            return { ...ingredient, count: ingredient.count + 2 };
          } else {
            return { ...ingredient, count: ingredient.count + 1 };
          }
        }
        // и возвращаемый преобразованный ингредиент
        return ingredient;
      });
    case 'DECREASE_INGREDIENTS_COUNT':
      // здесь мы прогоняем наш state(массив со списком ингредиентов) через map и получаем каждый ингредиент
      return state.map((ingredient) => {
        // action.ingredientID - приходит из action "actionDecreaseCount" который указан в бургер конструкторе в диспетчере
        // dispatch(actionDecreaseCount(actionDicreaseCount(el._id))) - где "el._id" это наши перетаскиваемые
        // ингредиенты. То есть мы проверяем, если наш ингредиент из стора с полем id равно уже дропнутому ингредиенту с такой же id
        // то тогда мы берем наш ингредиент и в нем изменяем поле count на текущее значение count но уже -1, что равно его удалению
        if (ingredient._id === action.ingredientID) {
          if (ingredient.type === 'bun') {
            return { ...ingredient, count: 0 };
          } else {
            return { ...ingredient, count: ingredient.count - 1 };
          }
        }
        // и возвращаемый преобразованный ингредиент
        return ingredient;
      });
    default:
      return state;
  }
};

export { reducerIngredientsList };
