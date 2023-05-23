import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import FormDialog from '../table/FormDialog'
import React, {useEffect} from 'react'
import * as yup from 'yup'
import {requiredField} from '../../config/validationMessages'
import {useRouter} from 'next/router'
import {yupResolver} from '@hookform/resolvers/yup'
import {useMutation} from '@apollo/client'
import {CREATE_CATEGORY, UPDATE_CATEGORY} from '../../gql/category'

const schema = yup.object().shape({
    name: yup.string().required(requiredField('Názov')),
})

const CategoryFormDialog = ({setOpen, open, defaultValues, setDefaultValues}) => {
    const router = useRouter()
    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const [createCategory] = useMutation(CREATE_CATEGORY)
    const [updateCategory] = useMutation(UPDATE_CATEGORY)
    const onSubmit = async (data) => {
        try {
            if (defaultValues) {
                await updateCategory({
                    variables: {
                        category: {
                            id: defaultValues.id,
                            data: {
                                name: data.name,
                                active: data.active,
                            },
                        },
                    },
                })
            } else {
                await createCategory({
                    variables: {
                        newCategory: {
                            name: data.name,
                            active: data.active,
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
                        {defaultValues ? ('Upraviť kategóriu - ' + defaultValues.name) : 'Vytvoriť novú kategóriu'}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    pb={2}
                >
                    <Controller
                        name={'name'}
                        control={control}
                        defaultValue={defaultValues ? defaultValues.name : null}
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                fullWidth
                                label={'Názov'}
                            />
                        )}
                    />
                    {errors.name && <Typography
                        color={'error'}
                        pt={.3}
                    >{errors.name.message}</Typography>}
                </Grid>
                <Grid
                    item
                    xs={12}
                    pb={2}
                >
                    <Controller
                        name={'active'}
                        control={control}
                        defaultValue={defaultValues ? defaultValues.active : true}
                        render={({field: {onChange, value}}) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={value}
                                        onChange={onChange}
                                        color={'success'}
                                    />}
                                label="Aktívne"
                            />
                        )}
                    />
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

export default CategoryFormDialog