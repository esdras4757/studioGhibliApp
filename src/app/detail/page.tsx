'use client'
import Header from "../Components/Header";
import { Suspense, useState } from "react";
import styled from "styled-components";
import DetailMovie from "../Components/DetailMovie";

export default function Home() {
  return (
    <Container className="primary-glow  " >
      <Header/>
      <Suspense>
      <DetailMovie />
      </Suspense>
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
