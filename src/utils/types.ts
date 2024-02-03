// export const overlayType = {
//   onClose: PropTypes.func
// };

// export const modalType = {
//   children: PropTypes.node,
//   onClose: PropTypes.func
// };

// export const tabsType = {
//   activeTab: PropTypes.string,
//   setActiveTab: PropTypes.func
// };

// export const draggableIngredientType = {
//   index: PropTypes.number.isRequired,
//   ingredient: ingredientType.isRequired
// };

export type TIngredient = {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
  index?: number;
  uniqueId?: string;
};
