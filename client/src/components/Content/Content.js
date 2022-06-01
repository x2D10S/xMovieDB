import React, {useState, useEffect} from 'react'
import { url_base, image_base, api_key, content_size  } from '../Config'
import axios from 'axios';
import styled from 'styled-components';
import {motion, AnimatePresence} from 'framer-motion'
import { Link } from 'react-router-dom';
const Content = () => {
    const [movieArray, setMovieArray] = useState([]);
    const [selectedOption, setSelectedOption] = useState(28);

    const getMovies= ()=>{
        axios.get(`${url_base}discover/movie?api_key=${api_key}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${selectedOption}`)
        .then(response=>{setMovieArray(movieArray=>[...response.data.results]);})
        .catch((err)=>{console.log(err)});
    }
    useEffect(()=>{
        getMovies();
    }, [selectedOption]);

  return (
    <div style={{backgroundColor: '#101e2b', color: 'white'}}>
    <SectionTitle>Discover</SectionTitle>
    <DiscoverSelect onChange={(e)=>{setSelectedOption(e.target.value);}}>
        <DiscoverOptions value={28}>Action</DiscoverOptions>
        <DiscoverOptions value={12}>Adventure</DiscoverOptions>
        <DiscoverOptions value={16}>Animation</DiscoverOptions>
        <DiscoverOptions value={35}>Comedy</DiscoverOptions>
        <DiscoverOptions value={80}>Crime</DiscoverOptions>
        <DiscoverOptions value={18}>Drama</DiscoverOptions>
        <DiscoverOptions value={99}>Documentary</DiscoverOptions>
        <DiscoverOptions value={27}>Horror</DiscoverOptions>
        <DiscoverOptions value={53}>Thriller</DiscoverOptions>
    </DiscoverSelect>
    <ContentContainer>
        <ContentWrapper>
        <ContentName></ContentName>
            <ContentByGenre>
            <AnimatePresence exitBeforeEnter>
            {   (
                movieArray.slice(6,12).map((obj)=>{
                    return(
                        
                        <Movies initial={{x: '-100vw', scale: 0.2, rotate: 45}}
                        animate={{x: 0, scale: 1, rotate: 0, transition: {duration: 0.8, ease: 'easeIn'}}}
                        exit={{x: '100vw', scale: 0.2, transition: {duration: 0.8, ease: 'easeOut'}, rotate: -45}}
                        key={obj.id} value={obj.id} 
                        >
                        <Link to={`/movie/${obj.id}`}>
                            <Movie src={`${image_base}${content_size}/${obj.poster_path}`} />
                            </Link>
                        </Movies>
                    )
                })
            )
            }
            </AnimatePresence>
            </ContentByGenre>
        </ContentWrapper>
    </ContentContainer>
    </div>
  )
}

export default Content


const SectionTitle = styled.h1`
margin-left: 30px;
font-size: 40px;
`;


const ContentContainer = styled.div`
margin-top: 30px;
height: 450px;
width: 95%;
margin-left: auto;
margin-right: auto;
`;

const ContentWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const ContentByGenre = styled.div`
height: 500px;
display: flex;
justify-content: space-around;
`;

const ContentName= styled.h2`
margin-top: 20px;`;

const Movies= styled(motion.div)`
display: flex;
`;

const Movie = styled.img`
height: 350px;
width: 230px;
padding: 5px; 
cursor: pointer;
`;

const DiscoverSelect = styled.select`
height: 50px;
border: none;
outline: none;
margin-left: 30px;
background-color: #233a50;
color: #abb7c4;
font-weight: 300;
text-transform: none;
width: 20%;
border-right: 1px solid #020d18;
text-transform: uppercase;
color: #ffffff;`;

const DiscoverOptions = styled.option``;
