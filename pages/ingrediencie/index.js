import {Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {createApolloClient} from '../../src/config/apolloClient'
import BgCard from '../../src/components/baseCard/BgCard'
import React, {useState} from 'react'
import StyledTableCell from '../../src/components/table/TableCell'
import CreateNewButton from '../../src/components/table/CreateNewButton'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import ActionButtons from '../../src/components/table/ActionButtons'
import {withAuthentication} from '../../src/user/auth'
import {DELETE_INGREDIENT, GET_INGREDIENTS} from '../../src/gql/igredients'
import IngredientFormDialog from '../../src/components/ingredients/FormDialog'

export default function Index(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [defaultValues, setDefaultValues] = useState(undefined)
    const [deleteItem] = useMutation(DELETE_INGREDIENT)

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
                <BgCard title="Ingrediencie">
                    <Typography>
                        Jednoducho vytvorte ingrediencie ktoré si vie zákazník pridať extra do objednávky alebo vy z
                        toho vyskladajte jedlo vo Vašej ponuke.
                    </Typography>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
                lg={12}
            >
                <BgCard>
                    <CreateNewButton
                        onClick={() => {
                            setDefaultValues(undefined)
                            setOpen(true)
                        }}
                    />
                    <Table
                        sx={{
                            mt: 1,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell text={'Názov'} />
                                <StyledTableCell text={'Môže byť extra'} />
                                <StyledTableCell text={'Extra cena'} />
                                <StyledTableCell
                                    text={'Akcie'}
                                    width={200}
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.ingredients.map(item =>
                                <TableRow key={item.name}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.canBeExtra ? 'Áno' : 'Nie'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {item.canBeExtra ? item.extraPrice + ' €' : '-'}
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
                                                setDefaultValues(item)
                                                setOpen(true)
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>,
                            )}
                        </TableBody>
                    </Table>
                </BgCard>
            </Grid>
            <IngredientFormDialog
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
        query: GET_INGREDIENTS,
    })

    return {
        props: {
            ingredients: data.getIngredients,
        },
    }
})
