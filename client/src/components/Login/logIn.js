import React, {useState, useEffect} from 'react'
import { FormButton, FormContent, Container, FormWrap, Icon, Form, FormH1,
FormLabel, FormInput, FormLink } from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../../auth/slice/user';
import { useNavigate } from 'react-router-dom';
const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginStatus = useSelector(state=>state.user);
    const login = async (e)=>{
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
       dispatch(signin(data));
    }
    useEffect(()=>{
        if(loginStatus.isLoggedIn || loginStatus.value.isLoggedIn)
        navigate('/');
        setFormStatus(loginStatus.message);
    }, [loginStatus])
    return (
        <div>
            <Container>
                <FormWrap>
                    <Icon to='/'>
                        xMovieDB
                    </Icon>
                    <FormContent>
                        <Form>
                            <FormH1>Sign in to your account.</FormH1>
                            <FormLabel htmlFor='for'>{
                                (formStatus===`Username doesn't exist`)? formStatus : `Username`
                            }</FormLabel>
                            <FormInput style={{border: (formStatus === `Username doesn't exist`)? `red 5px solid` : 'none'}} type='text' required onChange={(e)=>{setUsername(e.target.value)}}/>
                            <FormLabel htmlFor='for'>{
                                (formStatus===`Password incorrect`)? formStatus : `Password`
                            }</FormLabel>
                            <FormInput style={{border: (formStatus === `Password incorrect`)? `red 5px solid` : 'none'}} type='password' required onChange={(e)=>{setPassword(e.target.value)}} />
                            <FormButton onClick={e=>{login(e)}}>Sign In</FormButton>
                            <FormLink to='/signup'>Sign Up</FormLink>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </div>
    )
}

export default LogIn