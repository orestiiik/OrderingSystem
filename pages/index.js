import {Box, Grid, Typography} from '@mui/material'
import {withAuthentication} from '../src/user/auth'
import {createApolloClient} from '../src/config/apolloClient'
import {GET_TOTAL_TODAY_SALES} from '../src/gql/sales'
import BgCard from '../src/components/baseCard/BgCard'
import {IconCashBanknote, IconFiles, IconShoppingCart} from '@tabler/icons-react'
import SalesChart from '../src/components/chart/SalesChart'

export default function Index(props) {
    return (
        <Grid
            container
            spacing={0}
        >
            <Grid
                item
                xs={12}
                sm={6}
                lg={4}
            >
                <BgCard title={'Dnešné objednávky'}>
                    <Box
                        sx={{
                            background: '#02C9D6',
                            borderRadius: 5,
                            px: 3,
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconShoppingCart
                            size={40}
                            color={'white'}
                        />
                        <Typography
                            fontSize={50}
                            color={'white'}
                        >
                            {props.todaySales}
                        </Typography>
                    </Box>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                lg={4}
            >
                <BgCard title={'Dnešný obrat'}>
                    <Box
                        sx={{
                            background: '#02C9D6',
                            borderRadius: 5,
                            px: 3,
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconCashBanknote
                            size={40}
                            color={'white'}
                        />
                        <Typography
                            fontSize={50}
                            color={'white'}
                        >
                            {props.todayTotal}&nbsp;€
                        </Typography>
                    </Box>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                lg={4}
            >
                <BgCard title={'Dnes predaných'}>
                    <Box
                        sx={{
                            background: '#02C9D6',
                            borderRadius: 5,
                            px: 3,
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconFiles
                            size={40}
                            color={'white'}
                        />
                        <Typography
                            fontSize={50}
                            color={'white'}
                        >
                            {props.todayQuantity} ks
                        </Typography>
                    </Box>
                </BgCard>
            </Grid>
            <Grid
                item
                xs={12}
            >
                <BgCard title={'História predajov'}>
                    <SalesChart values={props.totalSales} />
                </BgCard>
            </Grid>
        </Grid>
    )
}

export const getServerSideProps = withAuthentication(async ({token}) => {
    const {data} = await createApolloClient(token ?? '').query({
        query: GET_TOTAL_TODAY_SALES,
    })

    return {
        props: {
            todaySales: data.getTodaySalesTotal,
            todayQuantity: data.getTotalSoldQuantity,
            todayTotal: data.getTodayPriceTotal,
            totalSales: data.getLastSales,
        },
    }
})
