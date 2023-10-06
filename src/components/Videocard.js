import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { MdDelete, MdModelTraining } from "react-icons/md";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalTitle } from "react-bootstrap";
import { removevieo ,addHistory } from '../servise/allApis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { compareAsc, format } from 'date-fns'
import uniqid from 'uniqid';


function Videocard({video,setDeletedVideo,hide}) {
    const [lgShow, setLgShow] = useState(false);

    const handleClose= async()=>{

      setLgShow(true)
      const id=uniqid()
      const { caption,url}=video
      let date=format(new Date(),'yyyy-MM-dd,h:mm:ss a')
      if(id !="" && caption!="" && url!=""&& date!=""){
        const body={
          id,
          caption,
          url,
          date
        }
       const Responce = await addHistory(body)
      }
    }

    const handleDelete=async(id)=>{
      const Responce=await removevieo(id)
      if(Responce.status>=200 && Responce.status<300){
        setDeletedVideo(true)
        toast.success('video deleted', {
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
         toast.warn('video not Deleted', {
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
    const dragStart=(e,id)=>{
      e.dataTransfer.setData('cardId',id)
      console.log(e);
    }


  return (
    <div>
      <Card className="my-3" draggable onDragStart={(e)=>dragStart(e,video?.id)} style={{ width: "250px"}} >
        <Card.Img variant="top" src={video?.thumbnail} style={{width:'100%',height:'250px'}} onClick={() =>handleClose()}/>
        <Card.Body>
          {/* <Card.Title>Card Title</Card.Title> */}
        </Card.Body>
        {hide?"":<Button onClick={()=>handleDelete(video?.id)} style={{alignItems:'end'}} variant="primary"><MdDelete/></Button>} 
      </Card>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
           Video Caption
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <iframe width="100%" height="400px" src={video?.url+"?autoplay=1"} title="ഇതറിയാതെ നിങ്ങൾ ട്രേഡിങ്ങിലേക്ക് ഇറങ്ങരുത് | Part 2 | Milliondots Edu" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
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

export default Videocard;
