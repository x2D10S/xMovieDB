import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';
import { url_base, api_key, image_base, carousel_size } from '../Config';
import { FaCircle, FaSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const MovieCarousel = () => {
    const [array, setArray] = useState([]);
    const [arrayDay, setArrayDay] = useState([]);
    const [arrayShows, setArrayShows] = useState([]);
    const [current, setCurrent] = useState(0);
    const [move, setMove] =useState(0);
    const getMovies = () => {
        axios.get(`${url_base}/trending/movie/week?api_key=${api_key}`)
        .then(response=>{setArray(array=>[...response.data.results])});
    }
    const getMoviesDay = () =>{
      axios.get(`${url_base}/trending/movie/day?api_key=${api_key}`)
      .then(response=>{setArrayDay(arrayDay=>[...response.data.results])});
    }
    const getShows = () =>{
      axios.get(`${url_base}/trending/tv/day?api_key=${api_key}`)
      .then(response=>{setArrayShows(arrayShows=>[...response.data.results])});
    }
useEffect(()=>{
    getMovies();
    getMoviesDay();
    getShows();
}, []);

useEffect(()=>{
  setMove(current*450);
}, [current]);

useEffect(()=>{
  const id = setInterval(()=>{
    setCurrent((current===4)? 0: current+1);
  }, 5000);
  return () =>{
    clearTimeout(id);
  }
}, [current]);
  return (
    <div style={{color: 'white'}}>
    <ContentContainer>
      <TrendingContentContainer>
        <TrendingCarousel>
        <TrendHeading>Trending This Week</TrendHeading>
        <CarouselContainer>
        {
          array.slice(0,5).map((obj)=>{
            return(
              <>
              <CarouselContent animate={{x: -move}} transition={{duration: 1}} style={{backgroundImage: `url(${image_base}${carousel_size}/${obj.poster_path})`}} key={obj.id}>
              <Link to={`/movie/${obj.id}`} style={{textDecoration: 'none'}}>
              <ContentTitle>
                {obj.title}
                </ContentTitle>
                <ContentRating>
                {obj.vote_average}/10
                </ContentRating>
              </Link>
                <Buttons>
                  <Button onClick={()=>{setCurrent(0)}}>
                    {(current===0)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(1)}}>
                    {(current===1)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(2)}}>
                    {(current===2)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(3)}}>
                    {(current===3)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(4)}}>
                    {(current===4)? <FaSquare />: <FaCircle />}
                  </Button>
                </Buttons>
              </CarouselContent>
              </>
            )
          })
        }
        </CarouselContainer>
        </TrendingCarousel>
        <TrendingCarousel>
        <TrendHeading>Trending Today</TrendHeading>
        <CarouselContainer>
        {
          arrayDay.slice(0,5).map((obj)=>{
            return(
              <>
              <CarouselContent animate={{x: -move}} transition={{duration: 1}} style={{backgroundImage: `url(${image_base}${carousel_size}/${obj.poster_path})`}} key={obj.id}>
              <Link to={`/movie/${obj.id}`} style={{textDecoration: 'none'}}>
              <ContentTitle>
                {obj.title}
                </ContentTitle>
                <ContentRating>
                {obj.vote_average}/10
                </ContentRating>
              </Link>
                <Buttons>
                  <Button onClick={()=>{setCurrent(0)}}>
                    {(current===0)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(1)}}>
                    {(current===1)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(2)}}>
                    {(current===2)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(3)}}>
                    {(current===3)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(4)}}>
                    {(current===4)? <FaSquare />: <FaCircle />}
                  </Button>
                </Buttons>
              </CarouselContent>
              </>
            )
          })
        }
        </CarouselContainer>
        </TrendingCarousel>
        <TrendingCarousel>
        <TrendHeading>Trending Shows</TrendHeading>
        <CarouselContainer>
        {
          arrayShows.slice(0,5).map((obj)=>{
            return(
              <>
              <CarouselContent key={obj.id} animate={{x: -move}} transition={{duration: 1}} style={{backgroundImage: `url(${image_base}${carousel_size}/${obj.poster_path})`}}>
              <Link to={`/tv/${obj.id}`} style={{textDecoration: 'none'}}>
              <ContentTitle>
                {obj.name}
                </ContentTitle>
                <ContentRating>
                {obj.vote_average}/10
                </ContentRating>
              </Link>
                <Buttons>
                  <Button onClick={()=>{setCurrent(0)}}>
                    {(current===0)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(1)}}>
                    {(current===1)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(2)}}>
                    {(current===2)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(3)}}>
                    {(current===3)? <FaSquare />: <FaCircle />}
                  </Button>
                  <Button onClick={()=>{setCurrent(4)}}>
                    {(current===4)? <FaSquare />: <FaCircle />}
                  </Button>
                </Buttons>
              </CarouselContent>
              </>
            )
          })
        }
        </CarouselContainer>
        </TrendingCarousel>
      </TrendingContentContainer>
    </ContentContainer>
    </div>
  )
}

export default MovieCarousel

const CarouselContainer = styled.div`
margin-top: 10px;
display: flex;
`;

const ContentContainer = styled.div`
margin-top: 30px;
background-color: #101e2b;
`;

const TrendingContentContainer= styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
${'' /* flex-wrap: wrap; */}
align-items: center;
height: 700px;`;

const TrendingCarousel = styled.div`
margin-left: 10px;
margin-right: 10px;
height: 650px;
width: 450px;
overflow: hidden;
display: flex;
flex-direction: column;
`;

const CarouselContent =styled(motion.div)`
min-width: 450px;
height: 550px;
background-repeat: no-repeat;
background-size: 100% 100%;
margin-bottom: 30px;
display: flex;
flex-direction: column;
background-color: rgba(0, 0, 0, 0.4);
background-blend-mode: multiply;
${'' /* position: relative; */}
cursor: pointer;
`;

const ContentTitle = styled.h2`
color: white;
border: 1px;
margin-top: 415px;
margin-left: 50px;
max-width: 400px;
font-size: 30px;
text-decoration: none !important;`;

const ContentRating = styled.h4`
color: white;
margin-left: 60px;
margin-top: 10px;
max-width: 300px;
text-decoration: none !important;
`;

const Buttons =styled(motion.div)`
color: white;
margin-top: 8px;
${'' /* background: rgba(0,0,0, 0.5); */}
display: flex;
align-items: center;
${'' /* position: absolute; */}
bottom: 0;
left: 0;
right: 0;
margin-left: auto;
margin-right: auto;
width: 300px;
`;

const Button = styled.div`
margin-left: 30px;
cursor: pointer;
`;

const TrendHeading = styled.h1`
font-size: 40px;`;