import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import {FaBars, FaRegUserCircle, FaPowerOff } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {useClickOutside} from 'react-click-outside-hook';
const Navbar = ({toggle}) => {
    const navigate= useNavigate();
    const userStatus = useSelector(state=>state.user);
    const [isExpanded, setExpanded] = useState(false);
    const [parentRef, isClickedOutside] = useClickOutside();
    const expandContainer = ()=>{
        setExpanded(true);
    }
    const collapseContainer = () =>{
        setExpanded(false);
    }
    const logout = () =>{
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
        navigate(0)
    }
    useEffect(()=>{
        if(isClickedOutside) collapseContainer();
    }, [isClickedOutside]);

    const containerVariants = {
        expanded: {
            height: '10em'
        }, 
        collapsed: {
            height: '3.8em'
        }
    }
    const navContainerVariants = {
        expanded: {
            height: '12em'
        }, 
        collapsed: {
            height: '5em'
        }
    }
    const containerTransition = { type: "spring", damping: 22, stiffness: 150, duration: 0.3 };
    const navContainerTransition = { type: "spring", damping: 22, stiffness: 200, duration: 0.2 };
  return (
    <div>
        <Nav
        animate={isExpanded ? "expanded" : "collapsed"}
                variants={navContainerVariants}
                transition={navContainerTransition}>
            <NavLink to='/'>
                <h1>xMovieDB</h1>
            </NavLink>
            <Bars onClick={toggle} />
            <NavMenu>
                <NavExternalLink href='https://www.themoviedb.org/'>
                    TMDB
                </NavExternalLink>
                <NavLink to="/credits">
                    Credits
                </NavLink>
            </NavMenu>
            {
                userStatus.value.isLoggedIn || userStatus.isLoggedIn?
                <UserContainer
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariants}
                transition={containerTransition}
                ref={parentRef}
                onClick={expandContainer}
                >
                {
                    isExpanded? 
                <UserOptionsContainer>
                <Link to='/favourites' style={{textDecoration: 'none'}}>
                <UserOption>
                <Text>
                Favourites
                </Text>
                </UserOption>
                </Link>
                <UserOption onClick={logout}>
                <FaPowerOff style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto'}} />
                <Text>Logout</Text>
                </UserOption>
                </UserOptionsContainer>
                : 
                <User>
                <FaRegUserCircle style={{height: '2.3em', marginRight: '0.2em'}}/>
                <Username>{userStatus.username || userStatus.value.username}</Username>
                </User>
                }
                </UserContainer>:
                <>
                <NavButton>
                <NavButtonLink to="/login">
                    Login
                </NavButtonLink>
            </NavButton>
                </>
            }
        </Nav>
    </div>
  )
}

export default Navbar

//Styles
const Nav = styled(motion.nav)`
background-color: #000;
height: 80px;
max-height: 30em;
display: flex;
justify-content: space-between;
padding: 0.5rem calc((100vw - 1000px) /2);
z-index: 10;
`;

const NavLink = styled(Link)`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&:active{
    color: #15CDFC;
}
&:hover{
    color: #256ce1;
}
`;

const NavExternalLink = styled.a`
color: #fff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;

&:active{
    color: #15CDFC;
}
&:hover{
    color: #256ce1;
}
`;

const Bars = styled(FaBars)`
display: none;
color: #fff;
@media screen and (max-width: 768px){
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
}
`;

const NavMenu = styled.div`
display: flex;
align-items: center;
margin-right: -24px;

@media screen and (max-width: 768px){
    display: none;
}
`;

const NavButton = styled.nav`
display: flex;
align-items: center;
margin-right: 24px;

@media screen and (max-width: 768px){
    display: none;
}
`;

const NavButtonLink = styled(Link)`
border-radius: 4px;
background: #256ce1;
padding: 10px 22px;
color: #fff;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover{
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
}
`;

const UserContainer = styled(motion.div)`
background: white;
width: 12em;
cursor: pointer;
display: flex;
justify-content: space-around;
align-items: center;
background: #172e42;
color: #fff;
@media screen and (max-width: 768px){
    display: none;
}
`;

const Username = styled.h3`
${'' /* color: #fff; */}
${'' /* color: #000; */}
display: flex;
align-items: center;
text-decoration: none;
weight: bold;
height: 1.8em;
`;

const UserOptionsContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;`;

const UserOption = styled.div`
width: 100%; 
height: 5em;
color: #fff;
display: flex;
justify-content: space-evenly;
border: solid 0.1em #000;
`;

const Text = styled.h3`
weight: bold;
height: 1.8em;
${'' /* margin-top: auto;
margin-bottom: auto; */}
margin: auto;
`;
const User = styled.div`
display: flex;
`;