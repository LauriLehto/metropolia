import React from 'react'
import { Row, Col } from 'react-bootstrap'

const MealRow = ({data}) => {
  console.log(data)
  const meals_en = data.en.MenusForDays[0].SetMenus
  const meals_fi = data.fi.MenusForDays[0].SetMenus

  return (
    <>
      {
        data && Object.keys(data).length !== 0 &&
        meals_fi.map( menu => {
          console.log(meals_fi.indexOf(menu))
          const fi_components = menu.Components
          const en_components = meals_en[meals_fi.indexOf(menu)].Components
          return Object.keys(fi_components).length !== 0 && 
            (
              <>
                { fi_components.map(c => {
                  const index = fi_components.indexOf(c)
                  const mealDataFi = c.split('(')
                  const mealDataEn = en_components[index].split('(')
                  return (
                    <>
                      <Row xs={7} className="d-flex justify-content-center" key={mealDataFi[0]}>
                        <Col xs={7}>
                          <Row className="d-flex justify-content-start" >{mealDataFi[0].toUpperCase()}</Row>
                          <Row className="d-flex justify-content-end">{mealDataEn[0]}</Row>
                        </Col>
                        <Col xs={3} className="d-flex justify-content-end">
                          <Row>{mealDataFi[1].replace(')','')}</Row>
                        </Col>
                      </Row>
                    </>
                  )
                })}
                <hr  />
              </>
            )
          })
        }
      </>
  )
}

export default MealRow
