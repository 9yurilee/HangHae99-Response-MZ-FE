import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {getCookie, setCookie, deleteCookie} from "../../shared/Cookie"
import { api, api_token } from "../../shared/api";

// actions
const SET_USER = "SET_USER";
const LOG_OUT="LOG_OUT";
const GET_USER="GET_USER";

// action creators
const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user)=> ({user}));
const getUser = createAction(GET_USER, (user)=> ({user}));

// initialState
const initialState={
    user: null,
    is_login: false,
};

// middleware actions
const loginDB =
  (id, password) =>
  async (dispatch, getState, { history }) => {
    await api
      .post(`/auth`, {
        user_id: id,
        password: password,
      })
      .then((res) => {
        const accessToken = "Bearer " + res.data.token;
        setCookie('is_login', `${accessToken}`);
        
        dispatch(
          setUser({
            user_id: res.data.user_id,
          })
        );
        
        history.push("/");
      })
      .catch((err) => {
        window.alert("회원가입이 필요합니다!");
        history.push("/register");
      });
  };

const registerDB =
  (id, password) =>
  async (dispatch, getState, { history }) => {
    await api
      .post(`/users`, {
        user_id: id,
        password: password,
      })
      .then((res) => {
        window.alert(res.data.msg);
        history.push("/login");
      })
      .catch((err) => {
        window.alert("중복된 아이디입니다!");
      });
  };

  const loginCheckDB =
  () =>
  async (dispatch, getState, { history }) => {
    const token = getCookie("is_login");
    await api_token
      .get(`/users/me`)
      .then((res) => {
        dispatch(
          setUser({
            token: token,
            user_id: res.data.user_id,
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err.code, err.message);
      });
  };

// reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
		    draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
}, initialState);

// action creator export
const actionCreators = {
  setUser, logOut, getUser, loginDB, registerDB, loginCheckDB
};

export {actionCreators};