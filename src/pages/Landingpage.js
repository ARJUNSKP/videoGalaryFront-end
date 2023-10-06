import React from "react";
import "./Landingpage.css";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Landingpage() {
  return (
    <div id="imagesdiv" style={{}}>
      <Row>
        <Col md={12} lg={6}>
          <img
            src="https://i.postimg.cc/3xh6q7bw/Nature-on-screen.png"
            alt="..."
            style={{ width: "100%", height: "100" }}
          />
        </Col>
        <Col md={12} lg={6} id="labeldata">
          <Container>
            <div className='w-100'>
              <h1>The Link You Need for Better Collaboration</h1>
              <Link to={"/Home"}>
                <button className="btn btn-outline-warning w-50">Click</button>
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Landingpage;
