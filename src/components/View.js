import React from 'react'
import { Row,Col } from 'react-bootstrap'
import Videocard from '../components/Videocard'
import {getAllVideos} from '../servise/allApis'
import { useEffect } from 'react'
import { useState } from 'react'

function View({Update}) {

  const [videodata,setVideodata]=useState([])
  const [deletedvideo,setDeletedVideo]=useState(false)

  const getAllApi= async ()=>{
    const Responce= await getAllVideos()
    setVideodata(Responce.data)
  }

  useEffect(()=>{
    getAllApi()
  },[Update,deletedvideo])

  return (
    <div className='border p-3 rounded' style={{height:'100vh',overflow:'auto'}}>
        <Row>
          {
            videodata.map(video=>(
            <Col sm={12} md={6} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Videocard video={video} setDeletedVideo={setDeletedVideo}/>
            </Col>
            ))
          }
        </Row>
    </div>
  )
}

export default View