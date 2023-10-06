import React from "react";
import { MdAddTask, MdPlaylistAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import uniqid from 'uniqid';
import { addvideo } from "../servise/allApis";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUpdate}) {

  // create state for inputfiled to data geting to object state

  const [uploadData,setuploadData]=useState({
    id:"",
    caption:"",
    thumbnail:"",
    url:""
  })
  console.log(uploadData);
  // onchane function used to store input data to usestate variable
  // .>this function is colling each input field
  const setInput=(e)=>{
    let {name,value}=e.target
  
    // {...uploaddata this is spred oprater existing data to upload new data to using this}
    setuploadData({...uploadData,[name]:value})
  }

  const extracturl=(e)=>{
    let videoUrl=e.target.value
    // geting url http://www.google.com/watch?v=hhhhhhhhhhh&t=2s
    if(videoUrl.includes("v=")){
      // to chuck v= inthe string available or not
      // imdex value of v= geting
      let index=videoUrl.indexOf("v=")
      let extractUrl=videoUrl.substring(index+2,index+13)
      // full url geing
      let fullUrl=`https://www.youtube.com/embed/${extractUrl}`
      setuploadData({...uploadData,[e.target.name]:fullUrl})
    }
  }
  const addvideoData=async()=>{
    setuploadData({...uploadData,["id"]:uniqid()})
    const {caption,thumbnail,url}=uploadData
    if(!caption){
      toast.warn('caption is empty', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else if(!thumbnail){
      toast.warn('thumbnail nit added', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else if(!url){
      toast.warn('not add url', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
   const Responce = await addvideo(uploadData)
    if(Responce.status>=200 && Responce.status<300){
      setUpdate(Responce.data)
      toast.success('add video', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setShow(false)
    }
    else{
      alert("not add video")
    }
  }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <label>Add</label>
      <MdAddTask />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MdPlaylistAdd
          size={"5rem"}
          style={{ margin: "5rem 0rem" }}
          variant="primary"
          onClick={handleShow}
        />
      </div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel
        controlId="floatingInput"
        label="Video Caption"
        className="mb-3"
      >
         <Form.Control type="textarea" name="caption"
        onChange={setInput} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Video Cover Image Url"
        className="mb-3"
       
      >
         <Form.Control type="textarea"  name="thumbnail"
        onChange={setInput} />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Youtube Video Url"
        className="mb-3"
        
      >
         <Form.Control type="textarea" name="url"
        onChange={extracturl} />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addvideoData}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Add;
