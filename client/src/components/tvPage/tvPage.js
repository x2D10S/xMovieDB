import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { url_base, image_base, api_key, carousel_size, embedded_base, search_size } from '../Config'
import notFound from '../images/notFound.png';
import {colorCoded} from '../genreColor';
import { Link } from 'react-router-dom';
import {FaHeart} from 'react-icons/fa';
import { toast } from 'react-toastify';
const TVPage = () => {
    const [tvShow, setTvShow] = useState({});
    const [trailer, setTrailer] = useState('');
    const [cast, setCast] = useState({});
    const [isFavourite, setIsFavourite] = useState(false);
    const {tvID} = useParams();
    const checkTrailer = (result)=>{
        result.forEach((obj)=>{
            if(obj.type.toLowerCase()==="trailer"||obj.type.toLowerCase()==="teaser"){
                if(obj.type.toLowerCase()==="trailer")
                {
                    setTrailer(obj.key)
                    return;
                }
                setTrailer(obj.key);
            }
        })
    }
    useEffect(()=>{
        (async ()=>{
            const response = await axios.get(`${url_base}tv/${tvID}?api_key=${api_key}`);
            const tvData = await response.data;
            setTvShow(tvData);
            console.log(tvData);
            const trailerData = await axios.get(`${url_base}tv/${tvData.id}/videos?api_key=${api_key}`);
            checkTrailer(trailerData.data.results);
            console.log(trailerData.data.results);
            const castData = await axios.get(`${url_base}tv/${tvData.id}/credits?api_key=${api_key}`);
            console.log(castData.data);
            setCast(castData.data);
        })();
    },[tvID]);

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('auth_token');

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
            tv: tvID
        }
        if(isFavourite){
            axios.post(`/like/removetv`, data);
            setIsFavourite(false);
            return;
        }
        axios.post(`/like/addtv`, data);
        setIsFavourite(true);
    }

    const check = () =>{
        if(!user) return;
        const data = {
            token: token,
            tv: tvID
        }
        axios.post(`/like/tv`, data)
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
    }, [user, tvID]);

  return (
    <div>
        <TvPageContainer>
            <TvMediaContainer>
                <TvPosterWrapper>
                    <TvPoster src={(tvShow.poster_path===null)? notFound : `${image_base}${carousel_size}/${tvShow.poster_path}`} />
                </TvPosterWrapper>
                <LikeContainer onClick={likeToggle} style={{background: isFavourite? 'red': 'white'}}>
            <FaHeart style={{height: '3.5em', width: '2em', marginLeft: '0.3em', marginTop: 'auto', marginBottom: 'auto', color: (isFavourite)? 'white': 'red'}}/>
            { isFavourite?
                <LikeText>Remove from Favourites</LikeText>
            : 
                <LikeText>Add to Favourites</LikeText>
            }
        </LikeContainer>
                <TvTrailerWrapper>
                <TrailerTitle>Trailer</TrailerTitle>
                    <TvTrailer src={`${embedded_base}${trailer}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                </TvTrailerWrapper>
            </TvMediaContainer>
            <TvDescriptionContainer>
            <TvTitle>{tvShow.name}</TvTitle>
            <TvFirstAir>First Aired: {tvShow.first_air_date}</TvFirstAir>
            <TvLastAir>Last Aired: {tvShow.last_air_date}</TvLastAir>
            <TvGenreContainer>
            <strong style={{fontSize: '2em'}}>Genres:</strong>
                {
                    (tvShow.genres?.length) && tvShow.genres.map((obj)=>{
                       return(
                           <Genre style={{background: `${colorCoded[obj.id]}`}} key={obj.id}>{obj.name}</Genre>
                       )
                    })
                }
            </TvGenreContainer>
            <TvRatings>Ratings: {tvShow.vote_average || 'N/A'}/10</TvRatings>
            <CreatedByContainer>
            <TvCreatedBy>Created by: </TvCreatedBy>
                {
                    (tvShow.created_by?.length) && tvShow.created_by.map((obj)=>{
                        return(
                            <Creator>{obj.name || 'N/A'}</Creator>
                        )
                    })
                }
            </CreatedByContainer>
            {
                (tvShow.next_episode_to_air?.length) && tvShow.next_episode_to_air.map((obj)=>{
                    return(<>
                        <TvNextEpisode>Next Episode: {tvShow.next_episode_to_air.air_date || 'N/A'}</TvNextEpisode>
                    </>)
                })
                
            }
            <TvOverview>
            <strong style={{fontSize: '1.5em'}}>Overview:</strong> <br/>
            {tvShow.overview}
            </TvOverview>
            <TvSeasonsTitle>Seasons({tvShow.number_of_seasons}): </TvSeasonsTitle>
            <TvSeasonsContainer>
            {
                (tvShow.seasons?.length) && tvShow.seasons.map((obj)=>{
                    return(
                        <div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
                        <TvSeasonPoster src={(obj.poster_path===null)? notFound : `${image_base}${search_size}/${obj.poster_path}`} />
                            <TvSeasonName>{obj.name}</TvSeasonName>
                            <TvSeasonAir>Aired: {obj.air_date}</TvSeasonAir>
                        </div>
                    )
                })
            }
            </TvSeasonsContainer>
            <TvCastContainer>
            <CastTitle>Cast</CastTitle>
            <TvActorsContainer>
            {
                    (cast.cast?.length) && cast.cast.map((obj)=>{
                        return(
                            <div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
                            <Link to={`/person/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
                            <CastImage src={(obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`} />
                                <CastName>{obj.name}</CastName>
                                <CastCharacter>{obj.character}</CastCharacter>
                                </Link>
                            </div>
                        )
                    })
                }
            </TvActorsContainer>
            <CastTitle>Crew</CastTitle>
            <TvCrewContainer>
            {
                    (cast.crew?.length) && cast.crew.map((obj)=>{
                        return(
                            <div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
                            <Link to={`/person/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
                            <CastImage src={(obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`} />
                                <CastName>{obj.name}</CastName>
                                <CastCharacter>{obj.character}</CastCharacter>
                                </Link>
                            </div>
                        )
                    })
                }
            </TvCrewContainer>
            </TvCastContainer>
            </TvDescriptionContainer>
        </TvPageContainer>
    </div>
  )
}

export default TVPage

const TvPageContainer = styled.div`
margin-top: 5%;
margin-bottom: 5%;
display: flex;
justify-content: space-around;
background-color: #061521;`;

const TvMediaContainer = styled.div`
display: flex;
flex-direction: column;
`;

const TvPosterWrapper = styled.div``;

const TvPoster = styled.img`
height: 600px;
width: 400px;`;

const TvTrailerWrapper = styled.div`
margin-top: 30px;`;

const TrailerTitle = styled.h2`
font-size: 2em;`;

const TvTrailer = styled.iframe`
height: 282px;
width: 500px;`;

const TvDescriptionContainer = styled.div`
min-height: 800px;
width: 800px;
display: flex;
flex-direction: column;
justify-content: space-evenly;`;

const TvTitle = styled.h1`
text-align: center;
font-size: 3em;
margin-top: 2%;`;

const TvFirstAir = styled.h3`
font-size: 2em;
margin-top: 1%;`;

const TvLastAir = styled.h3`
font-size: 2em;
margin-top: 1%;`;

const TvGenreContainer = styled.div`
display: flex;
flex-direction: row;
margin-top: 1%;`;

const Genre = styled.h4`
margin-left: 1em;
font-size: 1.3em;
padding: 0.5em;
border: 1px solid #000;
border-radius: 25px;
color: #000`;

const TvRatings = styled.h4`
font-size: 2em;
margin-top: 1%;`;

const CreatedByContainer = styled.div`
display: flex;
flex-direction: row;
margin-top: 1%;`;

const Creator = styled.h3`
margin-left: 1em;
font-size: 1.3em;
padding: 0.5em;`;

const TvNextEpisode = styled.h3`
font-size: 2em;
margin-top: 1%;`;

const TvSeasonsTitle = styled.h2`
font-size: 2em;
margin-top: 1%;`;

const TvSeasonsContainer = styled.div`
width: 100%;
max-height: 500px;
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

const TvSeasonPoster = styled.img`
height: 250px;
padding: 10px;
width: 180px;`;

const TvSeasonName = styled.h2`
font-size: 1.15em;
text-align: center;`;

const TvSeasonAir = styled.h3`
font-size: 0.9em;
text-align: center;`;

const TvCastContainer = styled.div``;

const CastTitle = styled.h2`
font-size: 2em;
margin-top: 1%;`;

const TvActorsContainer = styled.div`
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

const CastImage = styled.img`
height: 250px;
padding: 10px;
width: 180px;`;

const CastName = styled.h2`
font-size: 1.15em;
text-align: center;`;

const CastCharacter = styled.h3`
font-size: 0.9em;
text-align: center;`;

const TvCrewContainer = styled.div`
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

const TvCreatedBy = styled.h3`
font-size: 2em;`;

const TvOverview = styled.a`
font-size: 1.5em;
margin-top: 1%;
`;

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