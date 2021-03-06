import { 
  Container,
  Col, 
  Row,
  Spinner
} from 'react-bootstrap'

import SodexoRow from '../components/SodexoRow'
import TopBar from './TopBar'

const Menu = ({data, fetched}) => {

  return (
    <Container fluid>
      <TopBar />
      <Row className="d-flex align-items-center justify-content-center">
        { data.courses ?
          <Col>
            { Object.keys(data.courses).map(c => {
              return <SodexoRow key={data.courses[c].title_fi} meal={data.courses[c]} />
            })}
          </Col>
          : 
          <Col>
            {fetched ? <div style={{maring:"50px"}}>Sodexon ruokalista ei ole saatavilla</div> : <Spinner animation="border" role="status" variant="dark" />}
          </Col>
        }
      </Row>
      <footer>
        {data.meta && data.meta.ref_title}
      </footer>
    </Container> 
  )
}

export default Menu