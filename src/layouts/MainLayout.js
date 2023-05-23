import React, {useState} from 'react'
import {Box} from '@mui/material'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar'
import {useRouter} from 'next/router'

const MainLayout = ({children}) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const router = useRouter()

    return (
        <Box
            sx={{
                minHeight: '100vh',
                overflow: 'hidden',
                width: '100vw',
            }}
        >
            {router.pathname === '/login' ?
                <Box
                    sx={{
                        minHeight: 'calc(100vh)',
                        backgroundColor: '#fafbfb',
                        width: {
                            xs: '100vw',
                        },
                    }}
                >
                    {children}
                </Box>
                :
                <>
                    <Header
                        isSidebarOpen={isSidebarOpen}
                        toggleMobileSidebar={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
                    />
                    <Sidebar
                        isSidebarOpen={isSidebarOpen}
                        isMobileSidebarOpen={isMobileSidebarOpen}
                        onSidebarClose={() => setMobileSidebarOpen(false)}
                    />
                    <Box
                        sx={{
                            minHeight: 'calc(100vh)',
                            backgroundColor: '#fafbfb',
                            ml: {
                                xs: 0,
                                lg: '280px !important',
                            },
                            width: {
                                xs: '100vw',
                                lg: 'calc(100vw - 280px)!important',
                            },
                            pt: 8,
                        }}
                    >
                        {children}
                    </Box>
                </>
            }
        </Box>
    )
}

export default MainLayout
