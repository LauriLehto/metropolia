import React from 'react'
import Image from 'next/image'

import { Navbar } from 'react-bootstrap'
import { Time } from './Time'

const TopBar = () => {

  return (
    <Navbar 
      bg="white justify-content-between" 
      >
      <Navbar.Brand>
        <Image
          src="/metropolia.svg"
          width="450"
          height="150"
          className="d-inline-block align-top"
          alt="Metropolia"
        />
      </Navbar.Brand>
      <Time />
    </Navbar>
  )
}

export default TopBar