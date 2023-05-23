import {Autocomplete, Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import FormDialog from '../table/FormDialog'
import React, {useEffect, useMemo} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {GET_CATEGORIES} from '../../gql/category'
import {statesWithoutActive} from '../../config/states'
import {CREATE_ITEM, UPDATE_ITEM} from '../../gql/items'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useRouter} from 'next/router'
import {requiredField} from '../../config/validationMessages'

const schema = yup.object().shape({
    name: yup.string().required(requiredField('Názov')),
    weight: yup.string().required(requiredField()),
    category: yup.object().required(requiredField('Kategória')),
    price: yup.string().required(requiredField('Cena')),
    // state: yup.object().required(requiredField('Stav')),
})

const ItemFormDialog = ({setOpen, open, defaultValues, setDefaultValues}) => {
    const {loading, data} = useQuery(GET_CATEGORIES)
    const router = useRouter()

    const options = useMemo(() => {
        if (data?.getCategories) {
            return data?.getCategories.map(category => {
                return ({id: category.id, label: category.data.name})
            })
        }
        return []
    }, [data])

    const {control, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })
    const [createItem] = useMutation(CREATE_ITEM)
    const [updateItem] = useMutation(UPDATE_ITEM)
    const onSubmit = async (data) => {
        const {name, weight, liquid, category: {id: category}, price, state} = data

        const formattedWeight = parseFloat(weight)
        const formattedPrice = parseFloat(price)

        try {
            if (defaultValues) {
                await updateItem({
                    variables: {
                        item: {
                            id: defaultValues.id,
                            data: {
                                name,
                                weight: formattedWeight,
                                liquid,
                                category,
                                price: formattedPrice,
                                state: state?.value,
                            },
                        },
                    },
                })
            } else {
                await createItem({
                    variables: {
                        newItem: {
                            name,
                            weight: formattedWeight,
                            liquid,
                            category,
                            price: formattedPrice,
                            state: state?.value,
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

    return (<FormDialog
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
                    {defaultValues ? ('Upraviť') : 'Vytvoriť novú položku'}
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
                    render={({field: {onChange, value}}) => (<TextField
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={'Názov'}
                    />)}
                />
                {errors.name && <Typography color={'error'} pt={.3}>{errors.name.message}</Typography>}
            </Grid>
            <Grid
                item
                xs={12}
                pb={2}
            >
                <Controller
                    name={'category'}
                    control={control}
                    defaultValue={defaultValues ? options.find(item => item.id === defaultValues.category.id) : undefined}
                    render={({field: {onChange, value}}) => (
                        <Autocomplete
                            loading={loading}
                            options={loading ? [] : options}
                            onChange={(e, data) => onChange(data)}
                            value={value}
                            fullWidth
                            renderInput={(params) => <TextField {...params} label={'Kategória'} />}
                        />)}
                />
                {errors.category && <Typography color={'error'} pt={.3}>{errors.category.message}</Typography>}
            </Grid>
            <Grid
                item
                xs={6}
                pb={2}
            >
                <Controller
                    name={'weight'}
                    control={control}
                    defaultValue={defaultValues ? defaultValues.weight : null}
                    render={({field: {onChange, value}}) => (<TextField
                        onChange={onChange}
                        value={value}
                        fullWidth
                        type={'number'}
                        label={'g/ml'}
                    />)}
                />
                {errors.weight && <Typography color={'error'} pt={.3}>{errors.weight.message}</Typography>}
            </Grid>
            <Grid
                item
                xs={6}
                pb={2}
                pl={2}
            >
                <Controller
                    name={'state'}
                    control={control}
                    defaultValue={defaultValues ? (statesWithoutActive.find(item => item.value === defaultValues.state)) : undefined}
                    render={({field: {onChange, value}}) => (<Autocomplete
                        options={statesWithoutActive}
                        onChange={(e, data) => onChange(data)}
                        value={value}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label={'Stav'} />}
                    />)}
                />
                {errors.state && <Typography color={'error'} pt={.3}>{errors.state.message}</Typography>}
            </Grid>
            <Grid
                item
                xs={6}
                pb={2}
            >
                <Controller
                    name={'liquid'}
                    control={control}
                    defaultValue={defaultValues ? defaultValues.liquid : false}
                    render={({field: {onChange, value}}) => (<FormControlLabel
                        control={<Checkbox
                            checked={value}
                            onChange={onChange}
                            color={'success'}
                        />}
                        label="Tekutina"
                    />)}
                />
            </Grid>
            <Grid
                item
                xs={6}
                pb={2}
                pl={2}
            >
                <Controller
                    name={'price'}
                    control={control}
                    defaultValue={defaultValues ? defaultValues.price : null}
                    render={({field: {onChange, value}}) => (<TextField
                        onChange={onChange}
                        value={value}
                        fullWidth
                        type={'number'}
                        label={'Cena'}
                    />)}
                />
                {errors.price && <Typography color={'error'} pt={.3}>{errors.price.message}</Typography>}
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
                        fontWeight: 600, fontSize: 16,
                    }}
                >
                    {defaultValues ? 'Upraviť' : 'Pridať'}
                </Button>
            </Grid>
        </Grid>
    </FormDialog>)
}

export default ItemFormDialog