import { UPDATE_CREDENTIALS } from "../constants/actionTypes";

const reducerCredentials = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CREDENTIALS: {
      return { ...state, credentials: action.newCredentials };
    }

    // no default
  }

  return state;
};

export default reducerCredentials;
