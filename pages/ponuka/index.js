import {
    Autocomplete,
    Box,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material'
import {createApolloClient} from '../../src/config/apolloClient'
import BgCard from '../../src/components/baseCard/BgCard'
import React, {useMemo, useState} from 'react'
import StyledTableCell from '../../src/components/table/TableCell'
import CreateNewButton from '../../src/components/table/CreateNewButton'
import {useMutation, useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import ActionButtons from '../../src/components/table/ActionButtons'
import {withAuthentication} from '../../src/user/auth'
import {DELETE_ITEM, GET_ITEMS} from '../../src/gql/items'
import ItemFormDialog from '../../src/components/items/FormDialog'
import {StateChip} from '../../src/config/states'
import {GET_CATEGORIES} from '../../src/gql/category'

export default function Index(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [defaultValues, setDefaultValues] = useState(undefined)
    const [deleteItem] = useMutation(DELETE_ITEM)
    const [category, setCategory] = useState(undefined)
    const {loading, data} = useQuery(GET_CATEGORIES)

    const options = useMemo(() => {
        if (data?.getCategories) {
            return data?.getCategories.map(category => {
                return ({id: category.id, label: category.data.name})
            })
        }
        return []
    }, [data])

    return (
        <Grid
            container
            spacing={0}
        >
            <Grid
                item
                xs={12}
                lg={12}
            >
                <BgCard title="Ponuka">
                    <Typography>
                        Jednoducho vytvorte nové jedlá a pridajte ich do relevantných kategórií. Týmto spôsobom
                        zabezpečíte prehľadnosť a jednoduché objednávanie pre vás aj vašich zákazníkov, ktorí budú mať
                        prístup k ponuke jedál prostredníctvom vášho webu alebo iných kanálov.
                    </Typography>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
                lg={12}
            >
                <BgCard>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            pb: .5,
                        }}
                    >
                        <Box>
                            <Autocomplete
                                loading={loading}
                                options={loading ? [] : options}
                                onChange={(e, data) => setCategory(data)}
                                value={category}
                                sx={{
                                    width: 200,
                                }}
                                renderInput={(params) => <TextField {...params} label={'Kategória'} />}
                            />
                        </Box>
                        <CreateNewButton
                            onClick={() => {
                                setDefaultValues(undefined)
                                setOpen(true)
                            }}
                        />
                    </Box>
                    <Table
                        sx={{
                            mt: 1,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell text={'Názov'} />
                                <StyledTableCell text={'Stav'} />
                                <StyledTableCell text={'Kategória'} />
                                <StyledTableCell text={'Váha/Objem'} />
                                <StyledTableCell text={'Cena'} />
                                <StyledTableCell
                                    text={'Akcie'}
                                    width={200}
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.items?.filter(item => category ? item.data.category.id === category.id : true).map((item) => (
                                <TableRow key={item.data.name}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.data.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            <StateChip state={item.data.state} />
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.data.category.data.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.data.weight}&nbsp;{item.data.liquid ? 'ml' : 'g'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.data.price} €
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <ActionButtons
                                            onDelete={async () => {
                                                try {
                                                    await deleteItem({
                                                        variables: {
                                                            id: item.id,
                                                        },
                                                    })
                                                    router.reload()
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                            onEdit={() => {
                                                setDefaultValues({id: item.id, ...item.data})
                                                setOpen(true)
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </BgCard>
            </Grid>
            <ItemFormDialog
                setDefaultValues={setDefaultValues}
                setOpen={setOpen}
                open={open}
                defaultValues={defaultValues}
            />
        </Grid>
    )
}

export const getServerSideProps = withAuthentication(async ({token}) => {
    const {data} = await createApolloClient(token ?? '').query({
        query: GET_ITEMS,
    })

    return {
        props: {
            items: data.getItems,
        },
    }
})
