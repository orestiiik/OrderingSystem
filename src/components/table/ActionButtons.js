import React from 'react'
import {Box} from '@mui/material'
import {IconEdit, IconTrash} from '@tabler/icons-react'

const ActionButtons = ({onDelete, onEdit}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
            }}
        >
            <IconEdit
                color={'#FB9678'}
                style={{
                    cursor: 'pointer',
                }}
                onClick={onEdit}
            />
            <IconTrash
                color={'#FF1D07'}
                style={{
                    cursor: 'pointer',
                }}
                onClick={onDelete}
            />
        </Box>
    )
}

export default ActionButtons
