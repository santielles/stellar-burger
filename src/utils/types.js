import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number
});

export const overlayType = {
  onClose: PropTypes.func
};

export const modalType = {
  children: PropTypes.node,
  onClose: PropTypes.func
};

export const tabsType = {
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func
};

export const draggableIngredientType = {
  index: PropTypes.number.isRequired,
  ingredient: ingredientType.isRequired
};
