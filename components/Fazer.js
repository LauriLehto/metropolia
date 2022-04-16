import React, {useEffect, useRef, useState} from 'react'
import { 
  Container,
  Col, 
  Row,
  Spinner,
} from 'react-bootstrap'

import TopBar from './TopBar'
import FazerRow from './FazerRow'
import foodnco from '../data/foodnco'

const Menu = ({fetched,data}) => {

  const fieldRef = React.useRef(null);
  React.useEffect(() => {
    if (fieldRef.current) {
      setTimeout(function(){
      fieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    },10000)
    }
  }, []);


  //console.log(data)
  return (
    <Container 
      fluid 
      style={{margin:"20px"}}
    >
      <TopBar/>
      {/* Restaurant open and closed information */}
      <Row>
        <Col xs={6} style={{fontSize:'1.2em', margin: "20 0"}}>{`Food & CO - ${foodnco.address}`}</Col>
        { !!data.fi && data.fi.MenusForDays[0].LunchTime ? 
          <>
            <Col sx={1}>
              <Row>{foodnco.lunch.fi}</Row>
              <Row>{foodnco.lunch.en}</Row>
            </Col>
            <Col sx={1}> klo. {data.fi.MenusForDays[0].LunchTime}</Col>
          </>
          : 
          <Col sx={2}>Ravintola suljettu tänään</Col>
        }
        <Col xs={1}>
          <Row>{foodnco.open.fi}</Row>
          <Row>{foodnco.open.en}</Row>
        </Col>
        <Col sx={1}> klo. {foodnco.open.time}</Col>
      </Row>
      {/* Lunch menu items */}
      <Row style={{minHeight: "60vh"}}>
        { !!data.fi && !!data.fi.MenusForDays[0].SetMenus[0] ?
          <>
            <Col>
              <FazerRow data={data} />
            </Col>
            <Col xs={2} className="d-flex align-items-start flex-column justify-content-center p-10">
              {foodnco.diets.split(', ').map(diet => <Row style={{margin:"10px"}} key={diet}>{diet}</Row>)}
            </Col>
          </>
          : 
          fetched ? 
            <div style={{padding:"50px", textAlign: "center"}}>{"Food 'n' Co ruokalista ei ole saatavilla"}</div> 
            : 
            <Spinner animation="border" role="status" variant="dark" />
        }
      </Row>
      {/* Testing data overflow scroll to view */}
      {/* {[1,2,3,4,5,6,7,8].map(el => <Row style={{height: "150px"}}>{el}</Row>)} */}
    
      <footer className="field" ref={fieldRef}>
        {data.fi && data.fi.Footer}
      </footer>
    </Container> 
  )
}

export default Menu