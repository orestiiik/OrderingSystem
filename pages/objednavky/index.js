import {Box, Divider, Grid, Typography} from '@mui/material'
import {createApolloClient} from '../../src/config/apolloClient'
import BgCard from '../../src/components/baseCard/BgCard'
import React, {useState} from 'react'
import {DELETE_CATEGORY} from '../../src/gql/category'
import {useMutation, useQuery} from '@apollo/client'
import {useRouter} from 'next/router'
import CategoryFormDialog from '../../src/components/category/FormDialog'
import {withAuthentication} from '../../src/user/auth'
import {GET_SALES, UPDATE_STATUS} from '../../src/gql/sales'
import {IconAddressBook, IconCheck, IconId, IconPhone, IconReceipt} from '@tabler/icons-react'

export default function Index(props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [defaultValues, setDefaultValues] = useState(undefined)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)
    const [updateStatus] = useMutation(UPDATE_STATUS)
    const {loading, error, data, refetch} = useQuery(GET_SALES, {
        pollInterval: 20000,
        variables: {
            active: true,
        },
    })

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
                <BgCard title="Objednávky">
                    <Typography>
                        Objednávky na jednom mieste, prehľadne a jednoducho
                    </Typography>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
                lg={12}
            >
                <BgCard>
                    <Grid
                        container
                        spacing={3}
                    >
                        {data?.getSales?.length !== 0
                            ? data?.getSales.map((sale) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        md={4}
                                        lg={3}
                                        key={sale.id}
                                        px={1}
                                    >
                                        <Box
                                            sx={{
                                                position: 'relative',
                                                boxShadow: 3,
                                                borderRadius: 3,
                                                px: 2,
                                                py: 1.5,
                                                width: '100%',
                                                height: '100%',
                                                minWidth: 250,
                                            }}
                                        >
                                            <Box
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'space-between'}
                                                width={'100%'}
                                                py={.5}
                                            >
                                                <IconReceipt size={20} />
                                                <Typography
                                                    fontWeight={600}
                                                    fontSize={22}
                                                >
                                                    {sale.data.price}&nbsp;€
                                                </Typography>
                                            </Box>
                                            <Divider variant={'fullWidth'} />
                                            <Typography
                                                fontWeight={600}
                                                pt={2}
                                                pb={1}
                                                fontSize={20}
                                            >
                                                Objednávka
                                            </Typography>
                                            <Box>
                                                {sale?.data?.order?.map(order => {
                                                        return (
                                                            <Box key={order.category.data.name}>
                                                                <Typography
                                                                    fontWeight={600}
                                                                    fontSize={18}
                                                                >
                                                                    {order.category.data.name}
                                                                </Typography>
                                                                <Divider variant={'fullWidth'} />
                                                                <Box sx={{pl: 2, py: .5}}>
                                                                    {order.items.map((item, index) => {
                                                                        return <Box
                                                                            key={index}
                                                                            display={'flex'}
                                                                            justifyContent={'space-between'}
                                                                            width={'100%'}
                                                                        >
                                                                            <Box>
                                                                                <Typography fontSize={16}>
                                                                                    {item.quantity}x&nbsp;
                                                                                    {item.name}
                                                                                </Typography>
                                                                            </Box>
                                                                            <Typography>
                                                                                {item.weight} {item.liquid ? ' ml' : ' g'}
                                                                            </Typography>
                                                                        </Box>
                                                                    })}
                                                                </Box>
                                                                <Divider variant={'fullWidth'} />
                                                                <Box py={1}>
                                                                    <Box
                                                                        display={'flex'}
                                                                        alignItems={'center'}
                                                                        gap={1}
                                                                        py={.2}
                                                                    >
                                                                        <IconAddressBook size={15} />
                                                                        <Typography>
                                                                            {sale.data.address.city},&nbsp;
                                                                            {sale.data.address.street}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box
                                                                        display={'flex'}
                                                                        alignItems={'center'}
                                                                        gap={1}
                                                                        py={.2}
                                                                    >
                                                                        <IconId size={15} />
                                                                        <Typography>
                                                                            {sale.data.person.fullName}
                                                                        </Typography>
                                                                    </Box>
                                                                    <Box
                                                                        display={'flex'}
                                                                        alignItems={'center'}
                                                                        gap={1}
                                                                        py={.2}
                                                                    >
                                                                        <IconPhone size={15} />
                                                                        <Typography>
                                                                            <b>
                                                                                {sale.data.person.telephone}
                                                                            </b>
                                                                        </Typography>
                                                                    </Box>
                                                                    {sale.data.address.note.length !== 0 &&
                                                                        <Typography pt={.5}>
                                                                            <b>Poznámka</b>
                                                                            <br />
                                                                            {sale.data.address.note}
                                                                        </Typography>
                                                                    }
                                                                </Box>
                                                            </Box>
                                                        )
                                                    },
                                                )
                                                }
                                            </Box>
                                            {!sale.data.done &&
                                                <>
                                                    <Box
                                                        sx={{
                                                            mb: '50px',
                                                        }}
                                                    />
                                                    <Box
                                                        position={'absolute'}
                                                        bottom={10}
                                                        right={10}
                                                        onClick={() => {
                                                            updateStatus({variables: {id: sale.id}})
                                                            refetch()
                                                        }}
                                                        sx={{
                                                            background: 'green',
                                                            borderRadius: '100%',
                                                            width: 40,
                                                            height: 40,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <IconCheck
                                                            size={30}
                                                            color={'white'}
                                                        />
                                                    </Box>
                                                </>
                                            }
                                        </Box>

                                    </Grid>
                                )
                            }) : <Typography p={2}>
                                Neboli nájdené žiadne objednávky
                            </Typography>
                        }
                    </Grid>
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
        query: GET_SALES,
        variables: {
            active: true,
        },
    })

    return {
        props: {
            sales: data.getSales,
        },
    }
})
