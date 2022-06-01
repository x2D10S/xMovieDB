import React, {useState} from 'react';
import Navbar from '../NavBar/Navbar';
import Sidebar from '../SideBar/Sidebar';
import Searchbar from '../SearchBar/Searchbar';
import Footer from '../Footer/footer';
import CastCrewPage from '../CastCrewPage/castCrewPage';
const CastCrew = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>{
        setIsOpen(!isOpen);
    }
  return (
    <div style={{backgroundColor: '#172e42', color: '#fff'}}>
   <Sidebar toggle={toggle} isOpen={isOpen}/>
    <Navbar toggle={toggle}/>
    <Searchbar />
    <CastCrewPage />
    <Footer />
    </div>
  )
}

export default CastCrew