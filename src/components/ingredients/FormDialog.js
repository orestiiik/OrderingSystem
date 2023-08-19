import {Button, Checkbox, FormControlLabel, Grid, TextField, Typography} from '@mui/material'
import {Controller, useForm} from 'react-hook-form'
import FormDialog from '../table/FormDialog'
import React, {useEffect} from 'react'
import {useMutation} from '@apollo/client'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {useRouter} from 'next/router'
import {requiredField} from '../../config/validationMessages'
import {CREATE_INGREDIENT, UPDATE_INGREDIENT} from '../../gql/igredients'

const schema = yup.object().shape({
    name: yup.string().required(requiredField('Názov')),
})

const IngredientFormDialog = ({setOpen, open, defaultValues, setDefaultValues}) => {
    const router = useRouter()
    const {control, handleSubmit, reset, formState: {errors, touchedFields}} = useForm({
        resolver: yupResolver(schema),
    })

    const [createIngredient] = useMutation(CREATE_INGREDIENT)
    const [updateIngredient] = useMutation(UPDATE_INGREDIENT)
    const onSubmit = async (data) => {
        const {name, canBeExtra, extraPrice} = data

        const formattedPrice = parseFloat(extraPrice)


        try {
            if (defaultValues) {
                await updateIngredient({
                    variables: {
                        ingredient: {
                            id: defaultValues.id,
                            name,
                            extraPrice: formattedPrice,
                            canBeExtra,
                        },
                    },
                })
            } else {
                await createIngredient({
                    variables: {
                        ingredient: {
                            name,
                            extraPrice: formattedPrice,
                            canBeExtra,
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
                {errors.name && <Typography
                    color={'error'}
                    pt={.3}
                >{errors.name.message}</Typography>}
            </Grid>
            <Grid
                item
                xs={6}
                pb={2}
            >
                <Controller
                    name={'canBeExtra'}
                    control={control}
                    defaultValue={defaultValues ? defaultValues.canBeExtra : false}
                    render={({field: {onChange, value}}) => (<FormControlLabel
                        control={<Checkbox
                            checked={value}
                            onChange={onChange}
                            color={'success'}
                        />}
                        label="Môže byť extra"
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
                    name={'extraPrice'}
                    control={control}
                    defaultValue={defaultValues ? defaultValues.extraPrice : null}
                    render={({field: {onChange, value}}) => (<TextField
                        onChange={onChange}
                        value={value}
                        fullWidth
                        type={'number'}
                        label={'Extra cena'}
                    />)}
                />
                {errors.extraPrice && <Typography
                    color={'error'}
                    pt={.3}
                >{errors.extraPrice.message}</Typography>}
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

export default IngredientFormDialog