import React from 'react'
import { Row } from 'react-bootstrap'

interface ErrorPlaceHolderProps {
  width ?: number;
  height ?: number;
  text ?: string;
  title ?: string;
  img ?: string;
  fs ?: number
}

const ErrorPlaceHolder = (props: ErrorPlaceHolderProps) => {
  const { width, height, text, title, img, fs } = props

  return (
    <Row className="justify-content-center align-content-cente text-whiter">
      <div className="col-12 row justify-content-center text-center">
        {' '}
        <img src={img ?? 'images/sunkenShip2.png'} style={{ width: width ?? '110px', height: height ?? 'auto' }} alt="" />
      </div>
      <div
        className="text-center w-auto text-white"
        style={{
          padding: 8,
          borderRadius: 7,
          backgroundColor: 'rgb(173 118 118 / 60%)',
          fontSize: fs ?? 15
        }}
      >

       <div className='text-white' style={{ fontWeight: 'bold', fontSize: fs ? fs + 2 : 17 }}>¡{title ?? 'Oh no'}! </div>
        {text ?? 'Something went wrong, try again.'}
      </div>
    </Row>
  )
}

export default ErrorPlaceHolder
