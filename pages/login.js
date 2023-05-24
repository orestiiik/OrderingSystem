import {Box, Button, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import {LOGIN_USER} from '../src/gql/user'
import {Controller, useForm} from 'react-hook-form'
import * as React from 'react'
import {useContext} from 'react'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import {setCookie} from 'cookies-next'
import UserContext from '../src/context/UserContext'

export default function Index(props) {
    const {handleSubmit, control} = useForm()
    const router = useRouter()
    const [loginUser, {data, loading, error}] = useMutation(LOGIN_USER)
    const {setUser} = useContext(UserContext)
    const onSubmit = async (data) => {
        try {
            const userWithToken = await loginUser({
                variables: {
                    username: data.username,
                    password: data.password,
                },
            })
            const {data: {loginUser: {token, user}}} = userWithToken
            setUser(user)
            if (token) {
                setCookie(
                    'userToken',
                    token,
                    {
                        path: '/',
                    },
                )
                router.push('/')
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Grid
            container
            spacing={0}
            sx={{
                minHeight: '100vh',
                maxHeight: '100vh',
                height: '100vh',
                overflow: 'hidden',
            }}
        >
            <Grid
                item
                xs={12}
                lg={5}
                height={{
                    xs: '100vh',
                    lg: 'auto',
                }}
                sx={{
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    backgroundImage: 'linear-gradient(to right, #F5F7FA, #B8C6DB)',
                }}
            >
                <Box
                    width={{
                        xs: '80%',
                        md: '70%',
                        xl: '50%',
                    }}
                    sx={{
                        mx: 'auto',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid
                            container
                            sx={{
                                px: 4, py: 2,
                                borderRadius: 5,
                                boxShadow: 3,
                                background: 'white',
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <Typography
                                    fontSize={26}
                                    color="secondary"
                                    fontWeight={600}
                                    pb={2}
                                >
                                    Prihlásenie
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                pb={2}
                            >
                                <Controller
                                    name={'username'}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            label={'Použivateľské meno'}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                pb={2}
                            >
                                <Controller
                                    name={'password'}
                                    control={control}
                                    render={({field: {onChange, value}}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            type={'password'}

                                            label={'Heslo'}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                pb={1}
                            >
                                {loading
                                    ? <CircularProgress />
                                    :
                                    <>
                                        {error &&
                                            <Typography color={'red'}>
                                                Zlé prihlasovacie údaje
                                            </Typography>
                                        }
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type={'submit'}
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: 18,
                                            }}
                                        >
                                            Prihlásiť sa
                                        </Button>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                lg={7}
            >
                <img
                    src={'/images/bg.jpg'}
                    style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '100vh',
                        objectFit: 'cover',
                    }}
                />
            </Grid>
        </Grid>
    )
}