import React from 'react'

import {Box, Card, CardContent, Typography} from '@mui/material'

const BgCard = (props) => {
    return (
        <Card>
            {props.title &&
                <Box
                    pt={2}
                    px={2}
                    pb={1}
                    display="flex"
                    alignItems="center"
                >
                    <Typography variant="h4">{props.title}</Typography>
                </Box>
            }
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}

export default BgCard
