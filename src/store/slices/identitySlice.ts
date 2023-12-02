import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
import {
  CustomJWTPayload,
  IdentitySliceInitialState,
} from "../../interfaces/identity";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "identity",
  storage,
};

const initialState: IdentitySliceInitialState = {
  token: null,
  roles: null,
  picture: null,
  name: null,
};

export const identitySlice = createSlice({
  name: "identity",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload;
      const {
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": roles,
        picture,
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": name,
      } = jwtDecode<CustomJWTPayload>(action.payload);

      state.roles = roles;
      state.picture = picture;
      state.name = name;
    },
    logOut: (state) => {
      state.token = null;
      state.roles = null;
      state.picture = null;
      state.name = null;
    },
  },
});

export const { setCredentials, logOut } = identitySlice.actions;

const identityReducer = persistReducer(persistConfig, identitySlice.reducer);

export default identityReducer;

export const selectCurrentToken = (state: RootState) => state.identity.token;
export const selectCurrentRoles = (state: RootState) => state.identity.roles;
export const selectCurrentPicture = (state: RootState) =>
  state.identity.picture;
export const selectCurrentName = (state: RootState) => state.identity.name;
