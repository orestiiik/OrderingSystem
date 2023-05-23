import {Autocomplete, Button, Grid, TextField, Typography} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import FormDialog from '../table/FormDialog'
import React, {useEffect} from 'react'
import * as yup from 'yup'
import {requiredField} from '../../config/validationMessages'
import {useRouter} from 'next/router'
import {yupResolver} from '@hookform/resolvers/yup'
import {useMutation} from '@apollo/client'
import {CREATE_USER, UPDATE_USER} from '../../gql/user'

const UserFormDialog = ({setOpen, open, defaultValues, setDefaultValues}) => {
    const router = useRouter()

    const schema = yup.object().shape({
        lastName: yup.string().required(requiredField('Priezvisko')),
        username: yup.string().required(requiredField('Použivateľské meno')),
        firstName: yup.string().required(requiredField('Meno')),
        password: defaultValues ? yup.string().notRequired() : yup.string().required(requiredField('Heslo')),
    })

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const [createUser] = useMutation(CREATE_USER)
    const [updateUser] = useMutation(UPDATE_USER)
    const onSubmit = async (data) => {
        const {
            username,
            firstName,
            lastName,
            roles,
            password,
        } = data
        try {
            if (defaultValues) {
                await updateUser({
                    variables: {
                        user: {
                            id: defaultValues.id,
                            username,
                            firstName,
                            lastName,
                            roles,
                            password,
                        },
                    },
                })
            } else {
                await createUser({
                    variables: {
                        newUser: {
                            username,
                            firstName,
                            lastName,
                            roles,
                            password,
                        },
                    },
                })
            }
            setOpen(false)
            router.reload()
        } catch (e) {
            console.log(e)
        } finally {
            setDefaultValues(undefined)
        }
    }

    useEffect(() => {
        if (open) {
            reset()
        }
    }, [open])

    return (
        <FormDialog
            open={open}
            handleClose={() => {
                reset()
                setOpen(false)
            }}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
        >
            <Grid
                container
                sx={{
                    px: 1, pb: 1,
                }}
            >
                <Grid
                    item
                    xs={12}
                >
                    <Typography
                        fontSize={26}
                        sx={{
                            color: '#262626',
                        }}
                        fontWeight={600}
                        pb={2}
                    >
                        {defaultValues ? ('Upraviť') : 'Vytvoriť'}
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
                        defaultValue={defaultValues ? defaultValues.username : null}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label={'Použivateľské meno'}
                            />
                        )}
                    />
                    {errors.username && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.username.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={6}
                    pb={2}
                >
                    <Controller
                        name={'firstName'}
                        control={control}
                        defaultValue={defaultValues ? defaultValues.firstName : null}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label={'Meno'}
                            />
                        )}
                    />
                    {errors.firstName && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.firstName.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={6}
                    pl={2}
                    pb={2}
                >
                    <Controller
                        name={'lastName'}
                        control={control}
                        defaultValue={defaultValues ? defaultValues.lastName : null}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label={'Priezvisko'}
                            />
                        )}
                    />
                    {errors.lastName && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.lastName.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={12}
                    pb={2}
                >
                    <Controller
                        name={'password'}
                        control={control}
                        defaultValue={null}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                type={'password'}
                                fullWidth
                                label={'Heslo'}
                            />
                        )}
                    />
                    {errors.password && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.password.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={12}
                    pb={2}
                >
                    <Controller
                        name={'roles'}
                        control={control}
                        defaultValue={defaultValues ? defaultValues.roles : undefined}
                        render={({field: {onChange, value}}) => (
                            <Autocomplete
                                multiple
                                options={['admin', 'worker', 'supervisor']}
                                onChange={(e, data) => onChange(data)}
                                value={value}
                                fullWidth
                                renderInput={(params) => <TextField {...params} label={'Role'} />}
                            />)}
                    />
                    {errors.roles && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.roles.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={12}
                    pb={1}
                >
                    <Button
                        variant="contained"
                        color="success"
                        type={'submit'}
                        sx={{
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        {defaultValues ? 'Upraviť' : 'Pridať'}
                    </Button>
                </Grid>
            </Grid>
        </FormDialog>
    )
}

export default UserFormDialog