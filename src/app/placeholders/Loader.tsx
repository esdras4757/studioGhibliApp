import React from 'react'
import { Row } from 'react-bootstrap'

const Loader = () => {
  return (
    <Row style={{width:200}} className='justify-content-center align-content-center h-full'>
      <img  src="images/totoroLoader.gif" alt="" />
    </Row>
  )
}

export default Loader
