import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaLinkedin } from 'react-icons/fa'
const Footer = () => {
  return (
    <div>
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                {/* <FooterLinksWrapper>
                <FooterLinkItems>
                <FooterLinkTitle>
                        About
                    </FooterLinkTitle>
                    <FooterLink>A</FooterLink>
                    <FooterLink>A</FooterLink>
                    <FooterLink>A</FooterLink>
                    <FooterLink>A</FooterLink>
                </FooterLinkItems>
                </FooterLinksWrapper> */}
                <FooterLinksWrapper>
                <FooterLinkItems>
                <FooterLinkTitle>
                        Credits
                    </FooterLinkTitle>
                    <FooterLink href='https://www.themoviedb.org/'>TMDB(API)</FooterLink>
                    <FooterLink href='https://www.w3schools.com/'>w3schools</FooterLink>
                    <FooterLink href='https://traversymedia.com/'>Traversy Media(YouTube Tutorials)</FooterLink>
                    <FooterLink href='https://developedbyed.com/'>Dev Ed(YouTube Tutorials)</FooterLink>
                    <FooterLink href='https://netninja.dev/'>Net Ninja(YouTube Tutorials)</FooterLink>
                    <FooterLink href='https://www.youtube.com/c/PedroTechnologies'>Pedro Tech(YouTube Tutorials)</FooterLink>
                    <FooterLink href='https://courses.webdevsimplified.com/'>Web Dev Simplified(YouTube Tutorials)</FooterLink>
                </FooterLinkItems>
                </FooterLinksWrapper>
                </FooterLinksContainer>
                <FinalView>
                <FinalViewWrap>
                <FinalLogo to='/'>
                        xMovieDB
                    </FinalLogo>
                    <WebsiteRights>
                    xMovieDB © {new Date().getFullYear()} All rights reserved.
                    </WebsiteRights>
                    <SocialIcons>
                            <SocialIconLinks href='https://www.instagram.com/x2_d10s/' target="_blank" aria-label="Instagram"><FaInstagram /></SocialIconLinks>  
                            <SocialIconLinks href='https://www.linkedin.com/in/yashas-n-b8236721a/' target="_blank" aria-label="LinkedIn"><FaLinkedin /></SocialIconLinks> 
                            </SocialIcons>
                </FinalViewWrap>
                </FinalView>
            </FooterWrap>
        </FooterContainer>
    </div>
  )
}

export default Footer

const FooterContainer=styled.footer`
background-color: #101522;`

const FooterWrap=styled.div`
padding: 48px 24px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 1100px;
margin: 0 auto;`;


const FooterLinksContainer=styled.div`
display: flex;
justify-content: center;

@media screen and (max-width: 820px){
    padding-top: 32px;
}`;

const FooterLinksWrapper=styled.div`
display: flex;

@media screen and (max-width: 820px){
    flex-direction: column;
}`;


const FooterLinkItems=styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
text-align: left;
width: 160px;
box-sizing: border-box;
color: #fff;

@media screen and (max-width: 420px){
    margin: 0;
    padding: 10px;
    width: 100%;
}`;

const FooterLinkTitle=styled.h1`
font-size: 14px;
margin-bottom: 16px`;

const FooterLink=styled.a`
color: #fff;
text-decoration: none;
margin-bottom: 0.5rem;
font-size: 14px;
width: 18em;
&:hover{
    color: #386d9c;
    transition: 0.3s ease-out;
}`;

const FinalView=styled.section`
max-width: 1000px;
width: 100%;`;

const FinalViewWrap=styled.div`
display: flex;
justify-content: space-between;
align-items: center;
max-width: 1100px;
margin: 40px auto 0 auto;

@media screen and (max-width: 820px){
    flex-direction: column;
}`;

const FinalLogo=styled(Link)`
color: #fff;
justify-self: start;
cursor: pointer;
text-decoration: none;
font-size: 1.5rem;
display: flex;
align-items: center;
margin-bottom: 16px;
font-weight: bold;`;

export const WebsiteRights=styled.small`
color: #fff;
margin-bottom: 16px;
`;

const SocialIcons=styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 240px;`;

const SocialIconLinks=styled.a`
color: #fff;
font-size: 24px;`;