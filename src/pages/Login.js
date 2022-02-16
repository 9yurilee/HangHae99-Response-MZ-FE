import React from "react";
import styled from "styled-components";
import { Button, Grid, Input} from "../element/index";
import { useDispatch } from "react-redux";
import { actionCreators as loginAction } from "../redux/modules/user";
import {history} from "../redux/configStore"

const Login = ()=> {
    const dispatch = useDispatch();
    
    const [id, setId] = React.useState("");
    const [password, setPwd] = React.useState("");

    const login = () => {
        if (id === "" || password === "") {
          window.alert("아이디 혹은 비밀번호가 공란입니다! 입력해주세요!");
          return;
        }
        dispatch(loginAction.loginDB(id, password));
        history.replace("/");
    };

    return(
        <React.Fragment>
            <LoginContent>
                <Grid>
                    <h2>로그인</h2>
                    <Input width="350px" margin="0 0 30px 0" placeholder="아이디를 입력해주세요." _onChange={(e) => {setId(e.target.value);}}/>
                    <Input width="350px" margin="0 0 30px 0" placeholder="비밀번호를 입력해주세요." type="password" _onChange={(e) => {setPwd(e.target.value);}}/>
                    <Grid is_flex padding="30px 0 0 0">
                        <Button _onclick={login} text="로그인" size="18px" padding="15px 0"></Button>
                        <Button _onclick={()=> {history.push("/register");}} text="회원가입" size="18px" margin="0 0 0 25px" padding="15px 0"></Button>    
                    </Grid>
                </Grid>
            </LoginContent>
        </React.Fragment>
    )
}

const LoginContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 85px;
    box-sizing: border-box;
    h2 {
        font-family: 'DungGeunMo'; font-size: 45px; color: #fff; text-shadow: 4px 4px 0px #1f969c, 8px 8px 0px #59c1c2, 12px 12px 0px #e3fdf5; letter-spacing: 10px; margin: 0 0 60px 0;
    }
    input {
        border-radius: 5px; padding: 15px 10px; background-color: transparent; border: 2px solid #418b8f; outline-color: #1f969c; letter-spacing: 1px;
    }
`;
export default Login;