import React, {useState, useEffect} from 'react'
import { FormButton, FormContent, Container, FormWrap, Icon, Form, FormH1,
FormLabel, FormInput, FormLink } from '../styles'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../auth/slice/user';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerStatus = useSelector(state=>state.user);
    const register = async (e)=>{
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        if(password !== passwordMatch){
            setFormStatus('Passwords do not match')
            return;
        }
        if(username.length < 6 || password.length < 8){
            if(username.length < 6){
                setFormStatus('Username must be at least 6 characters');
                return;
            }
            setFormStatus('Password must be at least 8 characters');
            return;
        }
        dispatch(signup(data));
    }
   useEffect(()=>{
       if(registerStatus.value.isLoggedIn || registerStatus.isLoggedIn)
       navigate('/');
       setFormStatus(registerStatus.message);
   }, [registerStatus]);
   
    return (
        <div>
            <Container>
                <FormWrap>
                    <Icon to='/'>
                        xMovieDB
                    </Icon>
                    <FormContent>
                        <Form>
                            <FormH1>Sign Up</FormH1>
                            <FormLabel  htmlFor='for'>{
                                (formStatus === 'Username must be at least 6 characters' || formStatus === `Username already exists`) ? formStatus : `Username`
                            }</FormLabel>
                            <FormInput style={{border: (formStatus === 'Username must be at least 6 characters' || formStatus === `Username already exists`) ? 'red 5px solid' : 'black 1px solid' }} type='text' required onChange={(e)=>{setUsername(e.target.value)}}/>
                            <FormLabel htmlFor='for'>{
                                (formStatus === 'Password must be at least 8 characters') ? formStatus : `Password`
                            }</FormLabel>
                            <FormInput style={{border: (formStatus === 'Password must be at least 8 characters') ? 'red 5px solid' : 'black 1px solid' }} type='password' required onChange={(e)=>{setPassword(e.target.value)}} />
                            <FormLabel htmlFor='for'>{
                                (formStatus === 'Passwords do not match') ? formStatus : `Confirm Password`
                            }</FormLabel>
                            <FormInput style={{border: (formStatus === 'Passwords do not match') ? 'red 5px solid' : 'black 1px solid' }} type='password' required onChange={(e)=>{setPasswordMatch(e.target.value)}} />
                            <FormButton onClick={e=>register(e)}>Sign Up</FormButton>
                            <FormLink to='/login'>Log In</FormLink>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </div>
    )
}

export default SignUp