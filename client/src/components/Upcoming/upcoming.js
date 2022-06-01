import axios from 'axios';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { url_base,  api_key, embedded_base, embedded_image } from '../Config';
const Upcoming = () => {
    const [upcomingMovies, getUpcomingMovies] = useState([]);
    const [videos, setVideos] = useState([{}]);
    const [selectedVideo, setSelectedVideo] = useState();
    const [newSelect, setNewSelect] = useState(false);
   
    const check = (video, videoObj) =>{
        const trailerCheck = /trailer/;
        if(trailerCheck.test(video.name.toLowerCase())){
        setVideos(videos=>[...videos, {id: videoObj.id, name: video.name, movie: videoObj.title , key: video.key}]);
        }
    }

    const  getMovies = ()=>{
        axios.get(`${url_base}movie/upcoming?api_key=${api_key}&page=1`)
        .then(response=>{getUpcomingMovies(upcomingMovies=>[...response.data.results])})
    }
    const getTrailers = () =>{
        upcomingMovies.forEach((obj)=>{
            axios.get(`${url_base}movie/${obj.id}/videos?api_key=${api_key}`)
           .then(response=>{
               response.data.results.forEach((objRes)=>{
                  check(objRes, obj);
               })
           })
        })
    }
    useEffect(()=>{
       getMovies();
    },[upcomingMovies])
    useEffect(()=>{
        getTrailers();
    },[upcomingMovies]);
  return (
    <div style={{color: 'white'}}>
        <InTheaterContainer>
        <InTheaterHeading>In Theaters</InTheaterHeading>
        <InTheaterWrapper>
        <MainVideoContent>
        {
            
            videos.slice(1,2).map((obj)=>{
            return(
                <>
               { newSelect? <MainVideo src={`${embedded_base}${selectedVideo}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />: 
                   <MainVideo src={`${embedded_base}${obj.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />}
                </>
            )
            }) 
        }
        </MainVideoContent>
        <OtherVideosContainer>
            {videos.slice(2,20).map((obj)=>{
                return(
                    <OtherVideosWrapper value={obj.key} onClick={()=>{setSelectedVideo(obj.key); setNewSelect(true)}} style={{backgroundColor: (selectedVideo===obj.key)? '#08141f':'transparent'}}>
                        <OtherVideos src={`${embedded_image}${obj.key}/sddefault.jpg`} />
                        <OtherVideosTitle>{obj.movie}: {obj.name}</OtherVideosTitle>
                    </OtherVideosWrapper>
                )
            })}
        </OtherVideosContainer>
        </InTheaterWrapper>
        </InTheaterContainer>
    </div>
  )
}

export default Upcoming

const InTheaterContainer = styled.div`
margin-left: 30px;
height: 500px;
align-items: center;
margin-top: 40px;
`;

const InTheaterWrapper = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-evenly;
@media screen and (max-width: 768px){
display: flex;
flex-direction: column;
}`;

const MainVideoContent= styled.div``;

const OtherVideosContainer= styled.div`
display: flex;
flex-direction: column;
height: 350px;
overflow-y: scroll;
background-color: #112738;
`;

const MainVideo = styled.iframe`
height: 350px;
width: 648px;`;

const InTheaterHeading = styled.h1`
font-size: 40px;`;

const OtherVideosWrapper = styled.div`
height: 150px;
width: 700px;
display: flex;
justify-content: space-around;
cursor: pointer;
margin-top: 10px;

`;

const OtherVideos = styled.img`
height: 100px;
width: 150px;
margin-right: 10px;
`;

const OtherVideosTitle = styled.h2`
margin-left: 10px;
width: 750px;
margin-top: auto;
margin-bottom: auto;`;