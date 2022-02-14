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
        const accessToken = res.data.token;
        setCookie('is_login', `${accessToken}`);
        
        dispatch(
          setUser({
            user_id: res.data.user.user_id,
            id: res.data.user.id,
          })
        );
        
        history.replace("/");
      })
      .catch((err) => {
        console.log(err);
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
        window.alert(res.message);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

// reducer
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie("is_login", "success");
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
  setUser, logOut, getUser, loginDB, registerDB
};

export {actionCreators};