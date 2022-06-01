import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Sidebar = ({toggle, isOpen}) => {
    const userStatus = useSelector(state=>state.user);
    const navigate= useNavigate();
    const logout = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        navigate(0);
    }
  return (
    <div>
         <SidebarContainer isOpen={isOpen} onClick={toggle}> 
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        <SidebarExternalLink href="https://www.themoviedb.org/" onClick={toggle}>
                         TMDB
                        </SidebarExternalLink>
                        <SidebarLink to="/credits" onClick={toggle}>
                         Credits 
                        </SidebarLink>
                        <SidebarLink to="/favourites" onClick={toggle}>
                         Favourites
                        </SidebarLink>
                        </SidebarMenu>
                        { (userStatus.value.isLoggedIn || userStatus.isLoggedIn)?
                            <SideBtnWrap>
                                <SidebarRoute to='#' onClick={logout}>Logout</SidebarRoute>
                            </SideBtnWrap>
                            :
                            <SideBtnWrap>
                        <SidebarRoute to="/login">Log In</SidebarRoute>
                    </SideBtnWrap>
                    
                    }
                </SidebarWrapper>
            </SidebarContainer>
    </div>
  )
}

export default Sidebar

//styles

const SidebarContainer=styled.aside`
position: fixed;
z-index: 999;
width: 100%;
height: 100%;
background: #0d0d0d;
display: grid;
align-items: center;
top: 0;
left: 0;
transition: 0.3s ease-in-out;
opacity: ${({isOpen})=>(isOpen? '100%' : '0')};
top: ${({isOpen})=>(isOpen? '0': '-100%')};
`;

const CloseIcon=styled(FaTimes)`
color: #fff`;

const Icon=styled.div`
position: absolute;
top: 1.2rem;
right: 1.5rem;
background: transparent;
font-size: 2rem;
cursor: pointer;
outline: none;`;

const SidebarWrapper=styled.div`
color: #fff;`

const SidebarMenu=styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(6, 80px);
text-align: center;


@media screen and (max-width: 480px){
    grid-template-rows: repeat(6, 60px);
}`;

const SidebarLink= styled(Link)`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
text-decoration: none;
list-style: none;
transition: 0.2s ease-in-out;
text-decoration: none;
color: #fff;
cursor: pointer;

&:hover{
    color: #256ce1;
    transition: 0.2s ease-in-out;
}`;
const SidebarExternalLink= styled.a`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
text-decoration: none;
list-style: none;
transition: 0.2s ease-in-out;
text-decoration: none;
color: #fff;
cursor: pointer;

&:hover{
    color: #256ce1;
    transition: 0.2s ease-in-out;
}`;


const SideBtnWrap=styled.div`
display: flex;
justify-content: center;`;

const SidebarRoute = styled(Link)`
border-radius: 50px;
background: #256ce1;
white-space: nowrap;
padding: 16px 64px;
color: #010606;
font-size: 16px;
outline: none;
border: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
}`
