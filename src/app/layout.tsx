import styled from 'styled-components'
import LayoutClient from './LayoutClient'
import './globals.css'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import StyledComponentsRegistry from './lib/registry'
import { LinearProgress } from '@mui/material';
import { appState } from './redux/types';
import { useSelector } from 'react-redux';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Studio Ghibli',
  description: 'Explora el fascinante universo de Studio Ghibli a través de nuestra web, donde encontrarás información detallada sobre cada personaje icónico de sus cautivadoras historias. Sumérgete en el encanto y la magia de tus películas favoritas mientras descubres datos interesantes y curiosidades sobre los entrañables personajes que dan vida a los mundos mágicos creados por Studio Ghibli.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <LayoutClient>
        <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </body>
      </LayoutClient>
    </html>
  )
}
