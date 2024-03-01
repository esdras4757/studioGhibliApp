'use client'

import styled from "styled-components";
import DetailMovie from "./DetailMovie";


export default function DetailOffline() {
  return (
    <Container className="primary-glow  " >
      <DetailMovie/>
    </Container>
  );
}


const Container = styled.div `

color: ${({ theme }) => theme.palette.text.primary};
h4{
  color: #1c8ebb;

}
background-color: ${({ theme }) => theme.palette.background.default};
padding: 0px 20px;
max-height: 100vh;
overflow: hidden;
.MuiTabs-flexContainer{
  justify-content: center;
}`
