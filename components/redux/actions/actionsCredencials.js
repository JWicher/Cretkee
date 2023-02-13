import { UPDATE_CREDENTIALS } from "../constants/actionTypes";

export const updateCredencials = (newCredentials) => ({
  type: UPDATE_CREDENTIALS,
  credentials: newCredentials
});
