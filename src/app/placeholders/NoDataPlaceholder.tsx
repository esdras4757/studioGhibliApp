import React from 'react'
import { Row } from 'react-bootstrap'

interface noDataPlaceholderProps {
  width ?: number;
  height ?: number;
  text ?: string;
  title ?: string;
  img ?: string;
  fs ?: number
}

const NoDataPlaceholder = (props: noDataPlaceholderProps) => {
  const { width, height, text, title, img, fs } = props

  return (
    <Row className="justify-content-center align-content-cente text-whiter">
      <div className="col-12 row justify-content-center text-center">
        {' '}
        <img src={img ?? 'images/boxEmpty.png'} style={{ width: width ?? '120px', height: height ?? 'auto' }} alt="" />
      </div>
      <div
        className="text-center text-white w-auto"
        style={{
          padding: 8,
          borderRadius: 7,
          backgroundColor: 'rgb(16 72 121 / 60%)',
          fontSize: fs ?? 15
        }}
      >

       <div className='text-white' style={{ fontWeight: 'bold', fontSize: fs ? fs + 2 : 17 }}>¡{title ?? 'Ups'}! </div>
        {text ?? 'No data found to display here.'}
      </div>
    </Row>
  )
}

export default NoDataPlaceholder
