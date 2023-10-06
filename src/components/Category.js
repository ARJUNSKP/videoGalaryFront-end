import React from "react";
import { MdAddTask, MdPlaylistAdd } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addCategory } from "../servise/allApis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { allCategory,removiecatogory,getVideo,updateCategory } from "../servise/allApis";
import { useEffect } from "react";
import {Row,Col} from 'react-bootstrap'
import Videocard from "./Videocard";

function Category() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [catogorychange,setCatogorychange]=useState(false)
  const [catogorys, setCatogorys] = useState([]);
  const [catogoryvalue, setCatogoryvalue] = useState({
    id: "",
    carogoryname: "",
    allvideos: [],
  });

  const getAllCatogory = async () => {
    const Responce = await allCategory();
    setCatogorys(Responce.data);
  };
  useEffect(() => {
    getAllCatogory();
  }, [catogorychange]);

  const deletedCatogoty=async(id)=>{
    const Responce= await removiecatogory(id)
    if (Responce.status >= 200 && Responce.status < 300) {
      toast.success("Deletec carogory", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCatogorychange(Responce.status)
      setShow(false);
    }else {
      toast.warn("Not Deleted carogory", {
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
    
  }
  const carogoryset = (e) => {
    const carogoryname = e.target.name;
    const { value } = e.target;
    setCatogoryvalue({
      ...catogoryvalue,
      [carogoryname]: value,
    });
  };
  const addcarogory = async () => {
    const Responce = await addCategory(catogoryvalue);
    if (Responce.status >= 200 && Responce.status < 300) {
      toast.success("carogory Added", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setCatogorychange(Responce.data)
      setShow(false);
    } else {
      toast.warn("carogory Not Added", {
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
  };
  const draggedover=(e)=>{
    e.preventDefault()
  }
  const dropped=async(e,id)=>{
    // access video id transfered from start drag when access data from DrageStart under transfer under start
    let sourcCardId=e.dataTransfer.getData("cardId")
    const {data}= await getVideo(sourcCardId)
    // console.log(data);
    const seletedCatogory = catogorys.find(i=>i.id==id)
    // drop video data in array
    seletedCatogory.allvideos.push(data)
    const Responce=await updateCategory(id,seletedCatogory)
    setCatogorychange(Responce.data)
  }
  return (
    <div>
      <button
        type="button"
        onClick={handleShow}
        className="w-100 btn btn-outline-success"
      >
        Catogory
      </button>
      <div></div>
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
            <Form.Control
              type="textarea"
              name="carogoryname"
              onChange={carogoryset}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addcarogory}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {catogorys?.map((i) => (
        <div
          droppable
          onDragOver={(e)=>draggedover(e)}
          onDrop={(e)=>dropped(e,i?.id)}
          style={{
            width: "100%",
            height: 'auto',
            backgroundColor: "white",
            borderRadius: "1rem",
          }}
          className="my-3"
        >
          <div className={"text-center"} style={{padding: '0 3.5rem'}}>
            <label>{i.carogoryname}</label>
            <label style={{position:'relative',left:'5rem' }}>
              <MdDelete onClick={()=>deletedCatogoty(i.id)} />
            </label>
            <Row className='text-center' style={{height:'50vh',overflow:'auto'}}>
              {i?.allvideos.map(i=>(
                <Col className='my-3' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Videocard  hide={true} video={i} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
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

export default Category;
