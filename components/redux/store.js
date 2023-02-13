import { createStore } from "redux";
import rootReducer from "./reducers/root";

const initialState = {
  reducerCredentials: {
    credentials: []
  }
};

export const store = createStore(rootReducer, initialState);
