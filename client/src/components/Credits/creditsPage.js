import React from 'react'
import styled from 'styled-components'
const Credits = () => {
  return (
    <div>
    <CreditsContainer>
    <strong style={{fontSize: '3em', marginLeft: '2em'}}>Credits: </strong>
    <Credit>
    <CreditFor>
        API:
    </CreditFor>
    <Links href='https://www.themoviedb.org/'> TheMovieDB(TMDB)</Links>
    </Credit>
    <Credit>
    <CreditFor>
        CSS/JavaScript:
    </CreditFor>
    <Links href='https://www.w3schools.com/'> W3Schools</Links>
    </Credit>
    <Credit>
    <CreditFor>
        Back-end/Redux(YouTube):
    </CreditFor>
    <Links href='https://traversymedia.com/'> Traversy Media</Links>
    </Credit>
    <Credit>
    <CreditFor>
        Animations/JWT(YouTube):
    </CreditFor>
    <Links href='https://developedbyed.com/'> Dev Ed</Links>
    </Credit>
    <Credit>
    <CreditFor>
        Animations/Redux(YouTube):
    </CreditFor>
    <Links href='https://netninja.dev/'> The Net Ninja</Links>
    </Credit>
    <Credit>
    <CreditFor>
        Redux(YouTube):
    </CreditFor>
    <Links href='https://www.youtube.com/c/PedroTechnologies'> Pedro Tech</Links>
    </Credit>
    <Credit>
    <CreditFor>
        MongoDB/React(YouTube): 
    </CreditFor>
    <Links href='https://courses.webdevsimplified.com/'> Web Dev Simplified</Links>
    </Credit>
    </CreditsContainer>
    </div>
  )
}

export default Credits

const CreditsContainer = styled.div`
margin-top: 2em;
min-height: 15em;
margin-bottom: 2em;
`;

const Credit = styled.div`
text-align: center;
margin-top: 1em;
`;

const CreditFor = styled.strong`
font-size: 1.5em;
`;
const Links = styled.a`
font-size: 2em;
text-decoration: none;
color: #fff;
:hover{
    color: #386d9c;
    transition: 0.3s ease-out;
}
`;