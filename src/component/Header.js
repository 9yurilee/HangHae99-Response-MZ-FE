import React from "react";
import styled from "styled-components";
import { Button, Grid } from "../element/index";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import {history} from "../redux/configStore"
import logo from "../shared/img/logo_img.png";

const Header = ()=> {
    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    if(is_login){
        return(
            <React.Fragment>
                <Head>
                    <h1 onClick={()=> {history.push("/");}}>
                        <img src={logo} alt="logo" />
                    </h1>
                    <Grid is_flex>
                        <Button _onclick={()=> {dispatch(userActions.logOut({}));}} text="로그아웃" width="100px" padding="10px 0" font-size="15px"></Button>
                    </Grid>
                </Head>
            </React.Fragment>  
        ) 
    }
    return(
        <React.Fragment>
            <Head>
                <h1 onClick={()=> {history.push("/");}}>
                    <img src={logo} alt="logo" />
                </h1>
                <Grid is_flex>
                    <Button _onclick={()=> {history.push("/login");}} text="로그인" width="100px" padding="10px 0" font-size="15px"></Button>
                    <Button _onclick={()=> {history.push("/register");}} text="회원가입" width="100px" padding="10px 0" font-size="15px" margin="0 0 0 10px"></Button>
                </Grid>
            </Head>
        </React.Fragment>       
    )
}

const Head = styled.div`
    background-color: #1f969c;
    font-family: 'DungGeunMo';
    padding: 20px 20%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    h1{
        margin: 0; font-size: 30px; color: #fff; cursor: pointer;
    }
`;

export default Header;