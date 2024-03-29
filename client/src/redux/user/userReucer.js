import userTypes from "./userTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case userTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userTypes.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case userTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case userTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case userTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case userTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case userTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case userTypes.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case userTypes.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case userTypes.USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};
