import React, {useState} from 'react';
import Button from '../element/Button'
import { Route } from 'react-router';
import { Main, Login, Register, Detail, Edit, PostWrite} from '../pages/index';
import Header from '../component/Header';
import './App.css';
import {ConnectedRouter} from "connected-react-router";
import {history} from "../redux/configStore";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as loginActions } from "../redux/modules/user";
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);
  
  const [data, setData] = useState(null);
  const onClick = () => {
    axios.get('http://localhost:3001/articles').then((response) =>{
      setData(response.data);
      console.log(response.data);
    })
  }
  
    React.useEffect(() => {
    dispatch(loginActions.loginCheckDB());
  }, []);
  
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header></Header>
        <Route path="/" component={Main} exact></Route>
        <Route path="/login" component={Login} exact></Route>
        <Route path="/register" component={Register} exact></Route>
        <Route path="/postwrite" component={PostWrite} exact></Route>
        <Route path="/edit" component={Edit} exact></Route>
        <Route path="/detail" component={Detail} exact></Route>
      </ConnectedRouter>
      <Button text="test" onClick={onClick}></Button>
      {
        is_login === true ? <FixdBtn onClick={() => {history.push('/postwrite');}}><FontAwesomeIcon icon={faPenToSquare} className="btn_icon" /></FixdBtn> : null
      }
    </div>
  );
}

const FixdBtn = styled.div`
    width: 0;
    height: 0;
    border-bottom: 80px solid #f47b6a;
    border-top: 80px solid transparent;
    border-left: 80px solid transparent;
    border-right: 80px solid #f47b6a;
    position: fixed;
    bottom: 0px;
    right: 0px;
    cursor: pointer;
    .btn_icon {
      font-size: 40px; color: #fff; position: absolute; top: 12px; left: 16px;
    }
`;

export default App;
