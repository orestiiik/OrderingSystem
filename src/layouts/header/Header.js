import React from 'react'
import {AppBar, Box, IconButton, Toolbar, useMediaQuery} from '@mui/material'
import PropTypes from 'prop-types'
import ProfileHolder from './ProfileHolder'
import {IconMenu} from '@tabler/icons-react'

const Header = ({isSidebarOpen, toggleMobileSidebar}) => {
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
    return (
        <AppBar
            sx={{
                paddingLeft: isSidebarOpen && lgUp ? '265px' : '',
                background: 'transparent',
                position: 'absolute',
            }}
            elevation={0}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={toggleMobileSidebar}
                    sx={{
                        display: {
                            lg: 'none',
                            xs: 'flex',
                        },
                    }}
                >
                    <IconMenu
                        size={20}
                    />
                </IconButton>
                <Box flexGrow={1} />
                <ProfileHolder />
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    sx: PropTypes.object,
    customClass: PropTypes.string,
    position: PropTypes.string,
    toggleSidebar: PropTypes.func,
    toggleMobileSidebar: PropTypes.func,
}

export default Header
