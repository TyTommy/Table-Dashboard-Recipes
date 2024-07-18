export const add_to_recipes = (data) => {
  return {
    type: "ADD_TO_RECIPES",
    payload: data,
  };
};

export const remove_from_recipes = (data) => {
  return {
    type: "REMOVE_FROM_RECIPES",
    payload: data,
  };
};
