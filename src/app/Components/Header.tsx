import { BottomNavigation, BottomNavigationAction, Box, Button, Switch, useTheme } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch } from 'react-redux'
import { changeTheme } from '../redux/types'
import { isNil } from 'lodash'
import localforage from 'localforage'
type mainProps = {
  offlineMode?: boolean
  setOfflineMode?: Dispatch<SetStateAction<boolean>>
}



const Header = (props: mainProps) => {
  const { offlineMode, setOfflineMode } = props
  const dispatch = useDispatch()
  const theme = useTheme()

  return (
    <>
      <div className='d-flex w-100 p-0 p-md-2 mt-4 mt-md-0 justify-content-between align-content-center align-items-center'>
        <div className='col-auto'>
          {
            theme.palette.mode == 'dark' ?
            <img width={110} className='me-1 pointer' src="./images/ghibliLogoWhite.svg" alt="" />:
            <img width={110} className='me-1 pointer' src="./images/ghibliLogo.svg" alt="" />
          }
        </div>
        <div className='d-flex col-auto justify-content-end align-items-center'>
          {isNil(offlineMode) === false && <div className='me-0 me-md-4 fs-7'>
          Offline Mode<Switch checked={offlineMode} onChange={e => setOfflineMode ? setOfflineMode(e.target.checked) : ''} />
          </div>
          }
          <div className='me-0 me-md-4'>
            <i
              onClick={(e) => {
                dispatch({ type: 'changeTheme', payload: theme.palette.mode == 'light' ? 'dark' : 'light' })
                localStorage.setItem('theme', theme.palette.mode == 'dark' ? 'light' : 'dark')
              }}
              className={`fas pointer fa-${theme.palette.mode == 'dark' ? 'sun' : 'moon'} fs-4`} />
          </div>
        </div>
      </div>


    </>

  )
}



export default Header
