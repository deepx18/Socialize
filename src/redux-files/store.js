/** @format */

import { legacy_createStore } from "redux";

const initialState = {
  currentUser: null,
};

/* 
connect_user
logout_user

*/

function reducer(state = initialState, action = { type: "" }) {
  switch (action.type) {
    case "connect_user":
      return { ...state, currentUser: action.payload };

    case "logout_user":
      return { ...state, currentUser: null };

    default:
      return state;
  }
}

const store = legacy_createStore(reducer);

export default store;
