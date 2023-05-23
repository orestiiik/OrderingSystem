import {Box, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {createApolloClient} from '../../src/config/apolloClient'
import BgCard from '../../src/components/baseCard/BgCard'
import React, {useState} from 'react'
import StyledTableCell from '../../src/components/table/TableCell'
import {DELETE_CATEGORY} from '../../src/gql/category'
import CreateNewButton from '../../src/components/table/CreateNewButton'
import {useMutation} from '@apollo/client'
import {useRouter} from 'next/router'
import ActionButtons from '../../src/components/table/ActionButtons'
import {withAuthentication} from '../../src/user/auth'
import {GET_USERS} from '../../src/gql/user'
import UserFormDialog from '../../src/components/users/FormDialog'

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
                <BgCard title="Používatelia">
                    <Typography>
                        Vytvorte a spravujte používateľov a ich role ktoré určujú ich práva v aplikácií.
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
                                <StyledTableCell text={'Použivateľske meno'} />
                                <StyledTableCell text={'Meno'} />
                                <StyledTableCell text={'Role'} />
                                <StyledTableCell
                                    text={'Akcie'}
                                    width={200}
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users?.map((user) => (
                                <TableRow key={user.data.username}>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {user.data.username}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                            }}
                                        >
                                            {user.data.firstName}
                                            &nbsp;
                                            {user.data.lastName}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                fontSize: '16px',
                                                fontWeight: '500',
                                                display: 'flex',
                                                gap: .5,
                                            }}
                                        >
                                            {user.data.roles?.map(item =>
                                                item === 'admin'
                                                    ? <>Admin &nbsp;</>
                                                    : (
                                                        item === 'supervisor'
                                                            ? <>Kontrolór&nbsp;</>
                                                            : (
                                                                item === 'worker'
                                                                    ? <>Pracovník&nbsp;</>
                                                                    : ''
                                                            )
                                                    ),
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <ActionButtons
                                            onDelete={async () => {
                                                try {
                                                    await deleteCategory({
                                                        variables: {
                                                            id: user.id,
                                                        },
                                                    })
                                                    router.reload()
                                                } catch (e) {
                                                    console.log(e)
                                                }
                                            }}
                                            onEdit={() => {
                                                setDefaultValues({id: user.id, ...user.data})
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
            <UserFormDialog
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
        query: GET_USERS,
    })

    return {
        props: {
            users: data.getUsers,
        },
    }
})
