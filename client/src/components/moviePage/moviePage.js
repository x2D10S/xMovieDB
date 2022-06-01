import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { url_base, image_base, api_key, carousel_size, embedded_base, search_size } from '../Config';
import notFound from '../images/notFound.png';
import {colorCoded} from '../genreColor';
import { Link } from 'react-router-dom';
import {FaHeart} from 'react-icons/fa';
import { toast } from 'react-toastify';
const MoviePage = () => {
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState('');
    const [cast, setCast] = useState({});
    const [isFavourite, setIsFavourite] = useState(false);
    const {movieID} = useParams();
    const trailerCheck = (result) =>{
        const check = /trailer/ ;
        const teaserCheck = /teaser/
        result.forEach((obj)=>{
            if(check.test(obj.name.toLowerCase())||teaserCheck.test(obj.name.toLowerCase()))
            {
                if(check.test(obj.name.toLowerCase()))
                {
                    setTrailer(obj.key);
                    return;
                }
                setTrailer(obj.key);
            }
        })
    }
    
    useEffect(()=>{
        (async ()=>{
            const response = await axios.get(`${url_base}movie/${movieID}?api_key=${api_key}`).catch((err)=>{console.log(err)})
            const data = await response.data;
            setMovie(data);
            const trailerResponse = await axios.get(`${url_base}movie/${data.id}/videos?api_key=${api_key}`);
            const trailerData = await trailerResponse.data.results;
            trailerCheck(trailerData);
            const castResponse = await axios.get(`${url_base}movie/${data.id}/credits?api_key=${api_key}`);
            setCast(castResponse.data);
        })();
    }, [movieID]);

    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    const likeToggle = ()=>{
        if(!user){
            toast.error("Login to add!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000
            });
            return;
        }
        const data = {
            token: token,
            movie: movieID
        }
        if(isFavourite){
            axios.post(`/like/removemovie`, data);
            setIsFavourite(false);
            return;
        }
        axios.post(`/like/addmovie`, data);
        setIsFavourite(true);
    }

    const check = () =>{
        if(!user) return;
        const data = {
            token: token,
            movie: movieID
        }
        axios.post(`/like/movie`, data)
        .then(response=>{
            if(response.data === 'Favourite')
            {
                setIsFavourite(true);
                return;
            }
            setIsFavourite(false);
        });
        
    }
    
    useEffect(()=>{
        check();
    }, [user, movieID]);

    
  return (
    <div>
    <MoviePageContainer>
    <MovieMediaContainer>
    <MoviePosterWrapper>
        <MoviePoster src={(movie.poster_path===null)? notFound : `${image_base}${carousel_size}/${movie.poster_path}`} />
        <LikeContainer onClick={likeToggle} style={{background: isFavourite? 'red': 'white'}}>
            <FaHeart style={{height: '3.5em', width: '2em', marginLeft: '0.3em', marginTop: 'auto', marginBottom: 'auto', color: (isFavourite)? 'white': 'red'}}/>
            { isFavourite?
                <LikeText>Remove from Favourites</LikeText>
            : 
                <LikeText>Add to Favourites</LikeText>
            }
        </LikeContainer>
    </MoviePosterWrapper>
    <MovieTrailerWrapper>
    <TrailerTitle>Trailer</TrailerTitle>
    <MovieTrailer src={`${embedded_base}${trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
    </MovieTrailerWrapper>
    </MovieMediaContainer>
    <MovieDescriptionContainer>
    <MovieTitle>{movie.title}</MovieTitle>
    <MovieYear>Release: {movie.release_date}</MovieYear>
    <MovieGenreContainer>
    <strong style={{fontSize: '2em'}}>Genres:</strong>
    {
        (movie.genres?.length)&&
        movie.genres.map((obj)=>{
            return(
                    <Genre style={{background: `${colorCoded[obj.id]}`}} key={obj.id}>{obj.name}</Genre>
            )
        })
    }
    </MovieGenreContainer>
    <MovieRatings>Ratings: {movie.vote_average}/10</MovieRatings>
    <MovieOverview><strong style={{fontSize: '1.5em'}}>Overview:</strong> <br/>{movie.overview}</MovieOverview>
    <MovieCastContainer>
    <CastTitle>Cast: </CastTitle>
    <MovieActorsContainer>
    {
        cast.cast?.length && cast.cast.map((obj)=>{
           return(<div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
           <Link to={`/person/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
            <CastImage src={(obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`} />
                <CastName>{obj.name}</CastName>
                <CastCharacter>{obj.job}</CastCharacter>
            </Link>
           </div>)
        })
    }
    </MovieActorsContainer>
    <CastTitle>Crew: </CastTitle>
    <MovieCrewContainer>
    {
        cast.crew?.length && cast.crew.map((obj)=>{
            if(obj.job.toLowerCase() === 'director')
            return(<div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
            <Link to={`/person/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
            <CastImage src={(obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`} />
                <CastName>{obj.name}</CastName>
                <CastCharacter>{obj.job}</CastCharacter>
            </Link>
            </div>);
        })
    }
    {
        cast.crew?.length && cast.crew.filter(obj=>!obj.job.toLowerCase().includes('director'||'screenplay')).map((obj)=>{
            return(<div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
            <Link to={`/person/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
            <CastImage src={(obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`} />
                <CastName>{obj.name}</CastName>
                <CastCharacter>{obj.job}</CastCharacter>
            </Link>
            </div>)
            
        })
    }
    </MovieCrewContainer>
    </MovieCastContainer>
    </MovieDescriptionContainer>
    </MoviePageContainer>
    </div>
  )
}

export default MoviePage

const MoviePageContainer = styled.div`
margin-top: 5%;
margin-bottom: 5%;
display: flex;
justify-content: space-around;
background-color: #061521;`;


const MovieMediaContainer = styled.div`
display: flex;
flex-direction: column;
`;


const MovieDescriptionContainer=styled.div`
min-height: 800px;
width: 800px;
display: flex;
flex-direction: column;
justify-content: space-evenly;`;


const MovieTitle = styled.h1`
text-align: center;
font-size: 3em;
margin-top: 2%;`;


const MovieYear = styled.h2`
font-size: 2em;
margin-top: 1%;`;


const MovieOverview = styled.a`
font-size: 1.5em;
margin-top: 1%;`;


const MovieRatings = styled.h3`
font-size: 2em;
margin-top: 1%;`;

const MoviePosterWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;`;

const MoviePoster = styled.img`
height: 650px;
width: 450px;`;

const MovieTrailerWrapper = styled.div`
margin-top: 30px;
`;

const TrailerTitle = styled.h2`
font-size: 2em;`;

const MovieTrailer = styled.iframe`
height: 282px;
width: 500px;`;

const MovieGenreContainer = styled.div`
display: flex;
flex-direction: row;
margin-top: 1%;
`;

const Genre = styled.h4`
margin-left: 1em;
font-size: 1.3em;
padding: 0.5em;
border: 1px solid #000;
border-radius: 25px;
color: #000;`;

const MovieCastContainer = styled.div`
`;

const MovieActorsContainer = styled.div`
width: 100%;
max-height: 700px;
display: flex;
overflow-x: auto;
margin-top: 1%;
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background-color: #113a5c;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 20px;
}`;

const MovieCrewContainer = styled.div`
display: flex;
max-height: 700px;
overflow-x: auto;
margin-top: 1%;
::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background-color: #113a5c;
    border-radius: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #fff;
    border-radius: 20px;
}`;

const CastImage = styled.img`
height: 250px;
padding: 10px;
width: 180px;
`;

const CastTitle= styled.h2`
font-size: 2em;
margin-top: 1%;
`; 

const CastName = styled.h3`
font-size: 1.3em;
text-align: center;`;

const CastCharacter = styled.h4`
font-size: 1em;
text-align: center;`;

const LikeContainer = styled.div`
height: 4em;
width: 12em;
background: white;
color: black;
display: flex;
justify-content: space-around;
border-radius: 1em;
margin-top: 0.8em;
cursor: pointer;`;

const LikeText = styled.h2`
font-size: 1.1em;
margin-left: 0.2em;
width: 8em;
margin-top: auto;
margin-bottom: auto;
`;