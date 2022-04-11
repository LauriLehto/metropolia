import React from 'react'
import Image from 'next/image'

import { Navbar } from 'react-bootstrap'
import { Time } from './Time'

const TopBar = () => {

  return (
    <Navbar 
      bg="white justify-content-between" 
      style={{paddingTop:"3%"}}
      >
      <Navbar.Brand>
        <Image
          src="/metropolia.svg"
          width="150"
          height="50"
          className="d-inline-block align-top"
          alt="Metropolia"
        />
      </Navbar.Brand>
      <Time />
    </Navbar>
  )
}

export default TopBar