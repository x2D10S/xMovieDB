import React, {useState} from 'react'
import Navbar from '../NavBar/Navbar'
import Sidebar from '../SideBar/Sidebar'
import Searchbar from '../SearchBar/Searchbar'
import MovieCarousel from '../MovieCarousel/MovieCarousel'
import Content from '../Content/Content'
import Upcoming from '../Upcoming/upcoming'
import Footer from '../Footer/footer'
const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen);
    }
    return (
    <div style={{backgroundColor: '#172e42'}}>
    <Sidebar toggle={toggle} isOpen={isOpen}/>
    <Navbar toggle={toggle}/>
    <Searchbar />
    <MovieCarousel />
    <Upcoming />
    <Content />
    <Footer />
    </div>
  )
}

export default LandingPage

