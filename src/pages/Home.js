import React from 'react'
import { Container,Row,Col } from 'react-bootstrap';
import Category from '../components/Category';
import Add from '../components/Add';
import View from '../components/View';
import { useState } from 'react';
import {Link} from 'react-router-dom'

function Home() {

  const [Update,setUpdate]=useState({})

  return (
    <div>
      <header className="my-5 text-center">All Video Cards</header>
      <Link to={'/history'} style={{textDecoration:'none'}}><label className='text-start mx-5 my-5'>WatchHistory</label></Link>
      <Container>
        <Row className='text-center'>
          <Col lg={1}>
            <Add setUpdate={setUpdate}/>
          </Col>
          <Col lg={7}>
            <View Update={Update}/>
          </Col>
          <Col lg={4}>
            <Category/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home