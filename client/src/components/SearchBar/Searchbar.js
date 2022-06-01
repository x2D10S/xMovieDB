import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IoClose, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "react-click-outside-hook";
import { useEffect } from "react";
import { useRef } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { useDebounce } from "./debounceHook";
import axios from "axios";
import { url_base, api_key, image_base, search_size } from '../Config';
import notFound from '../images/notFound.png';

const Searchbar=()=> {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [options, setOptions] = useState('movie');
  const [optionDisplay, setOptionDisplay] = useState('Movies')
  const isEmpty = !results || results.length === 0;

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoResults(false);

    setSearchQuery(e.target.value);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setLoading(false);
    setNoResults(false);
    setResults([]);
    if (inputRef.current) inputRef.current.value = "";
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `${url_base}search/${options}?api_key=${api_key}&query=${query}`;

    return encodeURI(url);
  };

  const search = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;

    setLoading(true);
    setNoResults(false);

    const URL = prepareSearchQuery(searchQuery);

    const response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err);
    });  
    if (response) {
      if (response.data.results && response.data.results.length === 0) setNoResults(true);

      setResults(response.data.results);
    }

    setLoading(false);
  };

  useDebounce(searchQuery, 500, search);

  useEffect(()=>{
    if(options==='movie')
    setOptionDisplay('Movies');
    else if(options==='tv')
    setOptionDisplay('TV Shows');
    else
    setOptionDisplay('People');
  }, [options])
  const containerVariants = {
    expanded: {
      height: "30em",
    },
    collapsed: {
      height: "3.8em",
    },
  };
  
  const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

  return (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
      <SearchBarSelect onChange={(e)=>{setOptions(e.target.value)}}>
          <SearchBarOption value={'movie'}>Movies</SearchBarOption>
          <SearchBarOption value={'tv'}>TV Shows</SearchBarOption>
          <SearchBarOption value={'person'}>People</SearchBarOption>
      </SearchBarSelect>
      <SearchBarContainer
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}
    >
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch />
        </SearchIcon>
        <SearchInput
          placeholder={`Search for ${optionDisplay}`}
          onFocus={expandContainer}
          ref={inputRef}
          value={searchQuery}
          onChange={changeHandler}
        />
        <AnimatePresence>
          {isExpanded && (
            <CloseIcon
              key="close-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={collapseContainer}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseIcon>
          )}
        </AnimatePresence>
      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#fff" size={20} />
            </LoadingWrapper>
          )}
          {!isLoading && isEmpty && !noResults && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && noResults && (
            <LoadingWrapper>
              <WarningMessage>No {optionDisplay} found!</WarningMessage>
            </LoadingWrapper>
          )}
          {!isLoading && !isEmpty && (
            <>
              {results.map((obj) => (
                <TvShowContainer to={`/${options}/${obj.id}`}>
      <Thumbnail>
        <ThumbnailImage src={(obj.poster_path === null) ? notFound : (obj.poster_path === undefined)?((obj.profile_path===null)? notFound: `${image_base}${search_size}/${obj.profile_path}`): `${image_base}${search_size}/${obj.poster_path}` } />
      </Thumbnail>
      <Name>{obj.name||obj.title}</Name>
      <Rating>{obj.vote_average || "N/A"}</Rating>
    </TvShowContainer>
              ))}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>
      </div>
    
  );
}

const SearchBarSelect = styled.select`
  ${'' /* margin-left: auto;
  margin-right: auto;
  margin-top: 30px; */}
  width: 10em;
  ${'' /* min-height: 4em; */}
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
  color: white;
  background-color: #101e2b;
  outline: none;
  border: none;
  text-align: center;
  `;


const SearchBarOption = styled.option`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
  color: white;
  background-color: #101e2b;
  outline: none;
  border: none;`;

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  ${'' /* margin-left: auto;
  margin-right: auto;
  margin-top: 30px; */}
  width: 50em;
  height: 3.8em;
  background-color: #101e2b;
  border-radius: 6px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 4em;
  display: flex;
  align-items: center;
  ${'' /* position: relative; */}
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 21px;
  ${'' /* color: #12112e; */}
  color: white;
  font-weight: 500;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &::placeholder {
    color: white;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: white;
  font-size: 27px;
  margin-right: 10px;
  margin-top: 6px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: white;
  font-size: 23px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: white;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;



const TvShowContainer = styled(Link)`
  width: 100%;
  min-height: 6em;
  display: flex;
  border-bottom: 2px solid #d8d8d852;
  padding: 6px 8px;
  align-items: center;
`;

const Thumbnail = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  flex: 0.4;
  img {
    width: auto;
    height: 100%;
  }
`;

const Name = styled.h3`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  flex: 2;
  display: flex;
`;

const Rating = styled.span`
  color: white;
  font-size: 16px;
  display: flex;
  flex: 0.2;
`;

const ThumbnailImage = styled.img``;

export default Searchbar;