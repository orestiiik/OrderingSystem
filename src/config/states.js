import {Chip, Box} from '@mui/material'
import React from 'react'

export const statesWithoutActive = [
    {
        label: 'Koncept',
        value: 'concept',
        color: 'gray',
    },
    {
        label: 'Akcia',
        value: 'sale',
        color: '#ff9933',
    },
]

export const states = [
    {
        label: 'Aktívne',
        color: 'green',
        value: 'active',
    },
    ...statesWithoutActive,
]

export const StateChip = ({state}) => (
    state === 'concept'
        ? <Chip
            sx={{
                pl: '4px',
                pr: '4px',
                backgroundColor: states.find(item => item.value === state).color,
                fontWeight: 600,
                color: '#fff',
            }}
            size="medium"
            label={states.find(item => item.value === state).label}
        />
        : (state
                ? <Box
                    sx={{
                        display: 'flex',
                        gap: 1,
                    }}
                >
                    <Chip
                        sx={{
                            pl: '4px',
                            pr: '4px',
                            backgroundColor: states.find(item => item.value === 'active').color,
                            fontWeight: 600,
                            color: '#fff',
                        }}
                        size="medium"
                        label={states.find(item => item.value === 'active').label}
                    />
                    <Chip
                        sx={{
                            pl: '4px',
                            pr: '4px',
                            backgroundColor: states.find(item => item.value === state).color,
                            fontWeight: 600,
                            color: '#fff',
                        }}
                        size="medium"
                        label={states.find(item => item.value === state).label}
                    />
                </Box>
                : <Chip
                    sx={{
                        pl: '4px',
                        pr: '4px',
                        backgroundColor: states.find(item => item.value === 'active').color,
                        fontWeight: 600,
                        color: '#fff',
                    }}
                    size="medium"
                    label={states.find(item => item.value === 'active').label}
                />
        )
)