import React from 'react'
import { Row, Col } from 'react-bootstrap'

const MealRow = ({data}) => {
  const meals_en = data.en.MenusForDays[0].SetMenus
  const meals_fi = data.fi.MenusForDays[0].SetMenus

  const renderMenu = (menu, uppercase) => {
    return (
      <Row>
        {menu.map(entry => {
          return (
            <Col xs={4} key={entry}>
            {menu.indexOf(entry)=== 0 ? '' : ' / '}{uppercase ? entry.split('(')[0].toUpperCase() : entry.split('(')[0]}
            </Col>
          )
        })}
      </Row>
    )
  }

  const renderDiets = (menu) => {
    return (
      <Row>
        {menu.map(entry => {
          return (
            <Col xs={4} key={entry} className="d-flex justify-content-end">
            {entry.split('(')[1].replace(')','').toUpperCase()}
            </Col>
          )
        })}
      </Row>
    )
  }
  const createSpacer = (spacer) => {
    const spacerCols = []
    while(spacer){
      spacerCols.push(spacer)
      spacer--;
    }
    return spacerCols.map(s=><Col xs={1} key={spacerCols.indexOf(s)}></Col>)
  }

  return (
    <>
      {
        !!data &&
        meals_fi.map( menu => {
          const fi_components = menu.Components
          let spacer = meals_fi.indexOf(menu)
          console.log(spacer)
          const en_components = meals_en[meals_fi.indexOf(menu)].Components
          return (
            <React.Fragment key={meals_fi.indexOf(menu)}>
              <Row key={meals_fi.indexOf(menu)}>
{/*                 {createSpacer(spacer)}
 */}                <Col>
                {renderMenu(fi_components, true)}
                {renderMenu(en_components, false)}
                {renderDiets(fi_components)}
                </Col>
                
              </Row>
              <hr  />
            </React.Fragment>
          )
          })
        }
      </>
  )
}

export default MealRow
