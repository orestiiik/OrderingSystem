import {Box, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {createApolloClient} from '../../src/config/apolloClient'
import BgCard from '../../src/components/baseCard/BgCard'
import React, {useState} from 'react'
import StyledTableCell from '../../src/components/table/TableCell'
import {DELETE_CATEGORY, GET_CATEGORIES} from '../../src/gql/category'
import CreateNewButton from '../../src/components/table/CreateNewButton'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import ActionButtons from '../../src/components/table/ActionButtons'
import CategoryFormDialog from '../../src/components/category/FormDialog'
import {withAuthentication} from '../../src/user/auth'

export default function Index(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [defaultValues, setDefaultValues] = useState(undefined)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)

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
                <BgCard title="Kategórie">
                    <Typography>
                        Vytvorte si vlastné kategórie jedál, aby ste mohli prehľadne ponúkať rôzne jedlá vo vašej
                        reštaurácii. Táto funkcia vám umožňuje prispôsobiť ponuku podľa vašich potrieb a zákazníkov.
                        Jednoducho vytvorte nové kategórie a priraďte do nich jedlá, ktoré chcete ponúkať. Týmto
                        spôsobom zabezpečíte prehľadnosť a jednoduchú objednávku pre vás aj vašich zákazníkov.
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
                                <StyledTableCell text={'Stav'} />
                                <StyledTableCell
                                    text={'Akcie'}
                                    width={200}
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.categories?.map((category) => (
                                <TableRow key={category.data.name}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {category.data.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Chip
                                                sx={{
                                                    pl: '4px',
                                                    pr: '4px',
                                                    backgroundColor: category.data.active ? 'green' : 'gray',
                                                    fontWeight: 600,
                                                    color: '#fff',
                                                }}
                                                size="medium"
                                                label={category.data.active ? 'Aktívne' : 'Koncept'}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <ActionButtons
                                            onDelete={async () => {
                                                try {
                                                    await deleteCategory({
                                                        variables: {
                                                            id: category.id,
                                                        },
                                                    })
                                                    router.reload()
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                            onEdit={() => {
                                                setDefaultValues({id: category.id, ...category.data})
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
            <CategoryFormDialog
                setOpen={setOpen}
                open={open}
                defaultValues={defaultValues}
                setDefaultValues={setDefaultValues}
            />
        </Grid>
    )
}

export const getServerSideProps = withAuthentication(async ({token}) => {
    const {data} = await createApolloClient(token ?? '').query({
        query: GET_CATEGORIES,
    })

    return {
        props: {
            categories: data.getCategories,
        },
    }
})
