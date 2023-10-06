import React from 'react'
import './Header.css'
import { BsCameraReels } from "react-icons/bs";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
         <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand id="brandid" href="#home">
            <Link to={''} style={{textDecoration:'none'}}>
            <BsCameraReels className='mx-2' style={{marginTop:'-9px'}}/>
            VideoLinker
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
