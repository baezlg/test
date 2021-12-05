import axios from "axios";
import userTypes from "./userTypes";

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch({
      type: userTypes.USER_LOGIN_REQUEST,
    });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    const { data } = await axios.post("api/users/login", {
      Email: email,
      Password: password,
    });

    dispatch({
      type: userTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: userTypes.USER_LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: userTypes.USER_LOGOUT });
  dispatch({ type: userTypes.USER_DETAILS_RESET });
  document.location.href = "/login";
};

// export const register = (name, email, password) => async (dispatch) => {
//     try {
//       dispatch({
//         type: USER_REGISTER_REQUEST,
//       })

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }

//       const { data } = await axios.post(
//         '/api/users',
//         { name, email, password },
//         config
//       )

//       dispatch({
//         type: USER_REGISTER_SUCCESS,
//         payload: data,
//       })

//       dispatch({
//         type: USER_LOGIN_SUCCESS,
//         payload: data,
//       })

//       localStorage.setItem('userInfo', JSON.stringify(data))
//     } catch (error) {
//       dispatch({
//         type: USER_REGISTER_FAIL,
//         payload:
//           error.response && error.response.data.message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: userTypes.USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: userTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: userTypes.USER_DETAILS_FAIL,
      payload: message,
    });
  }
};
