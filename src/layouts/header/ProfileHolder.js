import React, {useContext, useEffect} from 'react'
import {Box, Button, Link, Typography} from '@mui/material'
import {deleteCookie, getCookie} from 'cookies-next'
import {useRouter} from 'next/router'
import {IconUser} from '@tabler/icons-react'
import {useQuery} from '@apollo/client'
import {GET_USER_FROM_TOKEN} from '../../gql/user'
import UserContext from '../../context/UserContext'

const ProfileHolder = (props) => {
    const router = useRouter()
    const {user, setUser} = useContext(UserContext)

    const {loading, data} = useQuery(GET_USER_FROM_TOKEN, {
        variables: {
            token: getCookie('userToken'),
        },
    })

    useEffect(() => {
        if (!loading) {
            setUser(data?.getUserFromToken.user)
        }
    }, [data])

    return (!loading && user) ? (
        <>
            <Box
                display="flex"
                alignItems="center"
            >
                <IconUser />
                <Box
                    sx={{
                        display: {
                            xs: 'flex',
                        },
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        color="textSecondary"
                        variant="h5"
                        fontWeight="600"
                        sx={{ml: 1}}
                    >
                        {user.data.firstName}
                    </Typography>
                    <Typography
                        color="textMuted"
                        variant="h5"
                        fontWeight="300"
                        sx={{ml: 1}}
                    >
                        {user.data.lastName.slice(0,2)}.
                    </Typography>
                    <Box
                        p={1}
                        ml={2}
                    >
                        <Link
                            to="/login"
                            onClick={() => {
                                router.push('/login')
                                deleteCookie('userToken')
                            }}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    fontWeight: 600,
                                }}
                            >
                                Odhlásiť sa
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    ) : null
}

export default ProfileHolder
