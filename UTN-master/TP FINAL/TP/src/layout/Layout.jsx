import React from 'react'
import { Box } from '@mui/material'
import Header from '../components/Header'

function Layout({ children }) {
  return (
    <Box sx={{ 
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        margin: 0,
     }} >
        <Header />
     <Box sx={ { flex: 1, width: '100%', maxWidth: '1200px', textAlign: 'center' } }>
     { children }
     </Box>
    </Box>
  )
}

export default Layout