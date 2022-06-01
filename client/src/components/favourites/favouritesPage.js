import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import notFound from '../images/notFound.png';
import { url_base, image_base, api_key, content_size } from '../Config';

const Favourites = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');
    const [movies, setMovies] = useState([]);
    const [tv, setTV] = useState([]);
    const navigate = useNavigate();

    const fetchMovies= (movies)=>{
        if(movies.length>0){
            movies.forEach(async (obj)=>{
                const response = await axios.get(`${url_base}movie/${obj}?api_key=${api_key}`);
                setMovies(movie=>[...movie, response.data]);
            })
        }
    }

    const fetchTV = (tv)=>{
        if(tv.length>0){
            tv.forEach(async (obj)=>{
                const response = await axios.get(`${url_base}tv/${obj}?api_key=${api_key}`);
                console.log(response);
                setTV(tv=>[...tv, response.data]);
            })
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/');
            return;
        }
        (async ()=>{
           const response= await axios.post(`/like/fetchall`, {token: token});
           fetchMovies(response.data.movies);
           fetchTV(response.data.tv);
        })();
        
    }, [user]);
  return (
    <FavouritesPageContainer>
    <FavouritesMovieContainer>
    <strong style={{fontSize: '2em', marginLeft: '3em'}}>Movies: </strong>
    <MoviesContainer>
    {
        movies.map((obj)=>{
            return(
                <Link to={`/movie/${obj.id}`}>
                <Movie>
                <MoviePoster src={ (obj.poster_path)? `${image_base}${content_size}/${obj.poster_path}` : notFound} />
                <strong style={{fontSize: '1em', marginTop: '0.5em', textDecoration: 'none', color: '#fff'}}>
                    {obj.title}
                </strong>
                </Movie>
                </Link>
                
            )
        })
    }
    </MoviesContainer>
    </FavouritesMovieContainer>
    <FavouritesTvContainer>
    <strong style={{fontSize: '2em', marginLeft: '3em'}}>TV: </strong>
    <TVContainer>
        {
            tv.map((obj)=>{
                return(
                    <Link to={`/tv/${obj.id}`}>
                    <TV>
                <TVPoster src={ (obj.poster_path)? `${image_base}${content_size}/${obj.poster_path}` : notFound} />
                <strong style={{fontSize: '1em', marginTop: '0.5em', textDecoration: 'none', color: '#fff'}}>
                    {obj.original_name}
                </strong>
            </TV>
                    </Link>
                    
            )
            })
            
        }
    </TVContainer>
    </FavouritesTvContainer>
    </FavouritesPageContainer>
  )
}

export default Favourites

const FavouritesPageContainer = styled.div`
margin-top: 5%;
margin-bottom: 5%;
display: flex;
flex-direction: column;
justify-content: space-around;
`;

const FavouritesMovieContainer = styled.div`
min-height: 30em;`;

const FavouritesTvContainer = styled.div`
min-height: 30em;`;

const MoviesContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 1.5em;
row-gap: 2em;
max-width: 60em;
margin-left: auto;
margin-right: auto;
margin-top: 2em;
`;

const Movie = styled.div`
display: flex;
flex-direction: column;
`;

const MoviePoster = styled.img`
height: 18em;
width: 12em;`;

const TVContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
column-gap: 1.5em;
row-gap: 2em;
max-width: 60em;
margin-left: auto;
margin-right: auto;
margin-top: 2em;
`;

const TV = styled.div`
display: flex;
flex-direction: column;
`;

const TVPoster = styled.img`
height: 18em;
width: 12em;`;