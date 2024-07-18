const initialState = {
  recipes: [],
};

export const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_RECIPES":
      const isPayload = state.recipes.filter(
        (item) => item.id === payload.id
      ).length;
      return {
        ...state,
        recipes: isPayload ? state.recipes : [...state.recipes, payload],
      };

    case "REMOVE_FROM_RECIPES":
      return {
        ...state,
        recipes: state.recipes.filter((item) => item.id !== payload.id),
      };

    default:
      return state;
  }
};
