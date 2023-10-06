import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import {historydata} from "../servise/allApis"
import './History.css';
import { Link } from "react-router-dom";
import Button from "react-bootstrap";

function History() {

    const [history,setHistory]=useState([])

    const getHistory=async()=>{
       const Responce= await historydata()
       setHistory(Responce.data)
    }

    useEffect(()=>{
        getHistory()
    },[])

  return (
    <div style={{ margin: "2rem 0" }}>
      <Container>
        <div id="tabledata">
        <Table striped bordered hover variant="dark"style={{height:'100vh',overflow:'auto'}} >
          <thead >
            <tr>
              <th className="td text-success">#</th>
              <th className="td text-success">Video Title</th>
              <th className="td text-success">Url</th>
              <th className="td text-success">Date</th>
            </tr>
          </thead>
          <tbody>
            {
                history.length>0?(
                    history?.map(i=>(
                        <tr>
                        <td className='tbd' >{i?.id}</td>
                        <td className='tbd' >{i?.caption}</td>
                        <td className='tbd' >{i?.url}</td>
                        <td className='tbd' >{i?.date}</td>
                    </tr>
                    ))
                ):
                (<h1>No History Data</h1>)
            }
          </tbody>
        </Table>
        </div>
        <div>
          <Link to={'/Home'}><label className="btn btn-outline-success">Home</label></Link>
        </div>
      </Container>
    </div>
  );
}

export default History;
