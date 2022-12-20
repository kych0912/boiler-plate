import React,{useState} from "react"
import {useDispatch } from 'react-redux';
import { registerUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import Auth from '../../../hoc/auth'

function Register(props){
    const navigate = useNavigate();
    const dispatch = useDispatch ();

    const [Email,setEmail] = useState("");
    const [Password,setPassword] = useState("");
    const [name, setName] = useState("");
    const [ConfirmPassword,setConfirmPassword] = useState("");

    const onEmailHandler = (e) =>{
        setEmail(e.target.value);
    }

    const onPasswordHandler = (e) =>{
        setPassword(e.target.value);
    }

    const onNameHandler = (e) =>{
        setName(e.target.value);
    }

    const onConfirmPasswordHandler = (e) =>{
        setConfirmPassword(e.target.value);
    }

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        if(Password !== ConfirmPassword){
            return alert('비밀번호가 다릅니다.');
        }

        let body = {
            "email":Email,
            "password":Password,
            "name":name,
        }

        dispatch(registerUser(body)).then(response =>{
            if(response.payload.success){
                navigate("/Login");
            }
            else{
                alert("Failed to sign up");
            }
        });
    }
    return(
        <div style={{display:'flex' , justifyContent: 'center', alignItems:'center', width:'100%' , height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column',justifyContent:'center'}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value = {Email} onChange = {onEmailHandler}/>
                <label>name</label>
                <input type="text" value = {name} onChange = {onNameHandler}/>
                <label>Password</label>
                <input type="password" value = {Password} onChange = {onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="Password" value = {ConfirmPassword} onChange = {onConfirmPasswordHandler}/>
                <br/>
                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Auth(Register,false);