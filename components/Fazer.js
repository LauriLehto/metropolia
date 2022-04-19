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
    <Container fluid 
    className="fazer"
    >
      <TopBar/>
      {/* Restaurant open and closed information */}
      <Row>
        <Col xs={4} style={{textAlign:"center"}}>{`Food & CO - ${foodnco.address}`}</Col>
        <Col>
        { !!data.fi && data.fi.MenusForDays[0].LunchTime ? 
          <>{foodnco.lunch.fi} / {foodnco.lunch.en} klo. {data.fi.MenusForDays[0].LunchTime}</>
          : 
          <>Ravintola suljettu tänään</>
        }
        </Col>
        <Col>
          <Row>{foodnco.open.fi} / {foodnco.open.en} klo. {foodnco.open.time}</Row>
        </Col>
      </Row>
      <hr  />
      <Container fluid style={{maxWidth:"90vw"}}>
      {/* Lunch menu items */}
      <Row style={{minHeight: "60vh"}}>
        { !!data.fi && !!data.fi.MenusForDays[0].SetMenus[0] ?
          <>
            <Col>
              <FazerRow data={data} />
            </Col>
            
          </>
          : 
          fetched ? 
            <div style={{padding:"50px", textAlign: "center"}}>{"Food 'n' Co ruokalista ei ole saatavilla"}</div> 
            : 
            <Spinner animation="border" role="status" variant="dark" />
        }
      </Row>
      </Container>

      <footer className="field" ref={fieldRef}>
        {/* Dieatry information */}
        {foodnco.diets}
        {/* {data.fi && data.fi.Footer} */}
      </footer>
    </Container> 
  )
}

export default Menu