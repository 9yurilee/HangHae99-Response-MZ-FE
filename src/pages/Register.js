import React, { useState } from "react";
import styled from "styled-components";
import { Button, Grid, Input} from "../element/index";
import { actionCreators as registerAction } from "../redux/modules/user";
import { useDispatch } from "react-redux";
import { emailCheck } from "../shared/common";

const Register = ()=> {
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [password, setPwd] = useState("");
    const [passwordConfirm, setPwdCheck] = useState("");

    const signUp = () => {
        if (id === "" || password === "") {
            window.alert("아이디, 패스워드를 모두 입력해 주세요!")
            return;
          }
      
          if(!emailCheck(id)){
            window.alert("이메일 형식이 맞지 않습니다!");
            return;
          }
      
          if (password.length < 8 || passwordConfirm.length < 8) {
            window.alert('비밀번호는 8자 이상으로 설정해 주세요!');
            return;
          }
          
          if (password !== passwordConfirm) {
            window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
            return;
          }
        dispatch(
          registerAction.registerDB(id, password)
        );
      };
    

    return(
        <React.Fragment>
            <RegisterContent>
                <Grid>
                    <h2>회원가입</h2>
                    <Input width="350px" margin="0 0 30px 0" placeholder="아이디를 입력해주세요." _onChange={(e) => {setId(e.target.value);}}/>
                    <Input width="350px" margin="0 0 30px 0" placeholder="비밀번호를 입력해주세요." type="password" _onChange={(e) => {setPwd(e.target.value);}}/>
                    <Input width="350px" margin="0 0 30px 0" placeholder="비밀번호를 다시 입력해주세요." type="password" _onChange={(e) => {setPwdCheck(e.target.value);}}/>
                    <Grid is_flex padding="30px 0 0 0">
                        <Button _onClick={signUp} text="회원가입" size="18px" padding="15px 0" disabled={id === "" || password === "" || passwordConfirm === ""? true : false}></Button>
                    </Grid> 
                </Grid>
            </RegisterContent>
        </React.Fragment>
    )
}

const RegisterContent = styled.div`
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

export default Register;