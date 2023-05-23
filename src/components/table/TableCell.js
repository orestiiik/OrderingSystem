import React from 'react'
import {TableCell, Typography} from '@mui/material'

const StyledTableCell = ({text, width}) => {
    return (
        <TableCell
            sx={{
                width,
            }}
        >
            <Typography
                color="#333333"
                fontWeight={600}
                fontSize={18}
            >
                {text}
            </Typography>
        </TableCell>
    )
}

export default StyledTableCell
