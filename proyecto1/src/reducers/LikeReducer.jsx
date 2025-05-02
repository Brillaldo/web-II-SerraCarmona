export const likeReducer = (state, action) => {
    const { id } = action.payload;
    switch (action.type) {
      case 'LIKE':
        return { ...state, [id]: (state[id] || 0) + 1 };
      case 'DISLIKE':
        return { ...state, [id]: (state[id] || 0) - 1 };
      default:
        return state;
    }
  };
  