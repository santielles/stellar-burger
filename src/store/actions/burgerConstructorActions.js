function burgerConstructorActions(ingredientsList) {
  return {
    type: 'MAKE_BURGER',
    ingredients: ingredientsList
  };
};

export { burgerConstructorActions };
