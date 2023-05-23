import React from 'react'
import {Box, Typography} from '@mui/material'
import {IconPlus} from '@tabler/icons-react'

const CreateNewButton = ({onClick}) => {
    return (
        <Box
            sx={{
                cursor: 'pointer',
                ml: 'auto',
                border: '1px solid green',
                borderRadius: 3,
                display: 'flex',
                width: 'fit-content',
                height: 'fit-content',
                px: 1.5,
                py: .7,
                gap: 1,
                alignItems: 'center',
                transition: '.5s',
                color: 'green',
                '&:hover': {
                    background: '#ccffcc',
                    color: '#4d4d4d',
                },
            }}
            onClick={onClick}
        >
            <IconPlus size={20} />
            <Typography fontWeight={600}>
                PRIDAŤ
            </Typography>
        </Box>
    )
}

export default CreateNewButton
