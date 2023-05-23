import React, {useContext} from 'react'
import NextLink from 'next/link'
import PropTypes from 'prop-types'
import {Box, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, useMediaQuery} from '@mui/material'
import {Menuitems, AdminMenuItems} from './MenuItems'
import {useRouter} from 'next/router'
import Logo from '../../../public/images/logo.png'
import Image from 'next/image'
import UserContext from '../../context/UserContext'

const Sidebar = ({isMobileSidebarOpen, onSidebarClose, isSidebarOpen}) => {
    const {user} = useContext(UserContext)
    const [open, setOpen] = React.useState(true)
    const router = useRouter()
    const location = router.pathname
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))

    const handleClick = (index) => {
        if (open === index) {
            setOpen(!open)
        } else {
            setOpen(index)
        }
    }


    const SidebarContent = (
        <Box
            p={2}
            height="100%"
            sx={{
                position: 'relative',
            }}
        >
            <Box>
                <List>
                    {Menuitems.map((item, index) => (
                        <List
                            component="li"
                            disablePadding
                            key={item.title}
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            <NextLink href={item.href}>
                                <ListItem
                                    onClick={() => handleClick(index)}
                                    sx={{
                                        mb: 1,
                                        ...(location === item.href && {
                                            border: '2px solid #FF0000',
                                            borderRadius: 3,
                                        }),
                                    }}
                                >
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText onClick={onSidebarClose}>
                                        {item.title}
                                    </ListItemText>
                                </ListItem>
                            </NextLink>
                        </List>
                    ))}
                    {user && user?.data?.roles?.includes('admin') &&
                        AdminMenuItems.map((item, index) => (
                            <List
                                component="li"
                                disablePadding
                                key={item.title}
                                sx={{
                                    cursor: 'pointer'
                                }}
                            >
                                <NextLink href={item.href}>
                                    <ListItem
                                        onClick={() => handleClick(index)}
                                        sx={{
                                            mb: 1,
                                            ...(location === item.href && {
                                                border: '2px solid #FF0000',
                                                borderRadius: 3,
                                            }),
                                        }}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText onClick={onSidebarClose}>
                                            {item.title}
                                        </ListItemText>
                                    </ListItem>
                                </NextLink>
                            </List>
                        ))
                    }
                </List>
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    px: 2,
                }}
            >
                <Link href="/">
                    <Image
                        src={Logo}
                        alt={'logo'}
                    />
                </Link>
            </Box>
        </Box>
    )
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                variant="persistent"
                PaperProps={{
                    sx: {
                        width: '265px',
                        border: '0 !important',
                        boxShadow: '0px 7px 30px 0px rgb(113 122 131 / 11%)',
                    },
                }}
            >
                {SidebarContent}
            </Drawer>
        )
    }
    return (
        <Drawer
            anchor="left"
            open={isMobileSidebarOpen}
            onClose={onSidebarClose}
            PaperProps={{
                sx: {
                    width: '265px',
                    border: '0 !important',
                },
            }}
            variant="temporary"
        >
            {SidebarContent}
        </Drawer>
    )
}

Sidebar.propTypes = {
    isMobileSidebarOpen: PropTypes.bool,
    onSidebarClose: PropTypes.func,
    isSidebarOpen: PropTypes.bool,
}

export default Sidebar
