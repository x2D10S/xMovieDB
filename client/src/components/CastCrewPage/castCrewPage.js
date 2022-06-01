import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { url_base, image_base, carousel_size, api_key, search_size } from '../Config';
import { useParams } from 'react-router-dom';
import notFound from '../images/notFound.png'
import axios from 'axios';
import { Link } from 'react-router-dom';
const CastCrewPage = () => {
    const {personID} = useParams();
    const [personData, setPersonData] = useState({});
    const [personCast, setPersonCast] = useState([]);
    const [showAll, setShowAll] = useState(false);
    useEffect(()=>{
        ((async ()=>{
            const response = await axios.get(`${url_base}person/${personID}?api_key=${api_key}`);
            setPersonData(response.data);
            const personCastData = await axios.get(`${url_base}person/${response.data.id}/combined_credits?api_key=${api_key}`);
            console.log(personCastData.data);
            setPersonCast(personCast=>[...personCastData.data.cast]);
        }))()
        setShowAll(false);
    }, [personID])
  return (
    <div>
    <PersonDataContainer>
        <PersonMediaContainer>
            <PersonPosterWrapper>
                <PersonPoster src={(personData.profile_path===null)? notFound : `${image_base}${carousel_size}/${personData.profile_path}`} />
            </PersonPosterWrapper>
        </PersonMediaContainer>
        <PersonInfoContainer>
            <PersonName>{personData.name}</PersonName>
            <PersonDOB>Birthday: {personData.birthday}</PersonDOB>
            <PersonBio>{personData.biography}</PersonBio>
            <PersonCastInfoContainer>
            
            {
                (personCast.length>10) ? 
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <CastTitle>Known For</CastTitle>
                <AllCast onClick={()=>{setShowAll(true)}}>All Movies/TV Shows</AllCast>
                </div>
                : 
                <CastTitle>Known For</CastTitle>
            }
           
                <PersonCastInfoWrapper>
                    {
                        personCast?.length &&
                        (showAll)?
                        personCast.map((obj)=>{
                            return(
                                <div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
                                <Link to={`/${obj.media_type}/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
                                <CastImage src={(obj.poster_path===null)? notFound : `${image_base}${search_size}/${obj.poster_path}`} />
                                    <CastName>{(obj.title===undefined)? obj.name : obj.title}</CastName>
                                    <CastCharacter>{obj.character}</CastCharacter>
                                </Link>
                                </div>
                            )
                        })
                         :
                         personCast.slice(0,10).map((obj)=>{
                            return(
                                <div style={{border: '1px solid #1c486b', boxShadow: '2px 2px #1c486b' , borderRadius: '20px', marginRight: '1em', marginBottom: '1em', backgroundColor: '#fff', color: '#000'}}>
                                <Link to={`/${obj.media_type}/${obj.id}`} style={{textDecoration: 'none', color: '#000'}}>
                                <CastImage src={(obj.poster_path===null)? notFound : `${image_base}${search_size}/${obj.poster_path}`} />
                                    <CastName>{(obj.title===undefined)? obj.name : obj.title}</CastName>
                                    <CastCharacter>{obj.character}</CastCharacter>
                                </Link>
                                </div>
                            )
                        })
                    }
                </PersonCastInfoWrapper>
            </PersonCastInfoContainer>
        </PersonInfoContainer>
    </PersonDataContainer>
    </div>
  )
}

export default CastCrewPage

const PersonDataContainer = styled.div`
margin-top: 5%;
margin-bottom: 5%;
display: flex;
justify-content: space-around;
background-color: #061521;`;

const PersonMediaContainer = styled.div`
display: flex;
flex-direction: column;`;

const PersonPosterWrapper = styled.div``;

const PersonPoster = styled.img`
height: 600px;
width: 400px;`;

const PersonInfoContainer = styled.div`
min-height: 800px;
width: 800px;
display: flex;
flex-direction: column;
justify-content: space-evenly;`;


const PersonName = styled.h1`
text-align: center;
font-size: 2.5em;
margin-top: 2%;`;

const PersonDOB = styled.h2`
font-size: 1.5em;
margin-top: 1%;`;

const PersonBio = styled.a`
font-size: 1em;
margin-top: 1%;`;

const PersonCastInfoContainer = styled.div`
margin-top: 1%;
display: flex;
flex-direction: column`;

const CastTitle = styled.h2`
font-size: 1.5em;
`;

const PersonCastInfoWrapper = styled.div`
width: 100%;
max-height: 700px;
overflow-x: auto;
display: flex;
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

const CastName= styled.h3`
font-size: 1.1em;
text-align: center;`;

const CastCharacter = styled.h4`
font-size: 0.9em;
text-align: center;`;

const CastImage = styled.img`
height: 300px;
padding: 8px;
width: 200px;`;

const AllCast = styled.a`
font-size: 1.5em;
border: 1px solid black;
padding: 5px;
border-radius: 20px;
background: #215985;
:hover{
    font-weight: bold;
    cursor: pointer;
    color: grey;
    background: #fff;
}`;
