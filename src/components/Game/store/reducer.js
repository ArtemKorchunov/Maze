export const initialState = {
  rowLength: 0,
  colLength: 0,
  maze: "",
  arrow: {
    direction: "",
    position: 0
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "increment": {
      return { ...state, count: state.count + 1, loading: false };
    }
    default: {
      return state;
    }
  }
};
