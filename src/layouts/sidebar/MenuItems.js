import {
    IconHome,
    IconFileStack,
    IconMeat,
    IconCheckupList,
    IconUsers,
    IconShield,
    IconUsersGroup, IconClock,
} from '@tabler/icons-react'

const IconStyle = {
    color: 'black',
}

export const Menuitems = [
    {
        title: 'Prehľad',
        icon: <IconHome
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/',
    },
    {
        title: 'Objednávky',
        icon: <IconCheckupList
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/objednavky',
    },
    {
        title: 'História objednávok',
        icon: <IconClock
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/historia',
    },
    {
        title: 'Kategórie',
        icon: <IconFileStack
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/kategorie',
    },
    {
        title: 'Ponuka',
        icon: <IconMeat
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/ponuka',
    },
]
export const AdminMenuItems = [
    {
        title: 'Používatelia',
        icon: <IconUsers
            style={IconStyle}
            size={26}
            strokeWidth={1.5}
        />,
        href: '/pouzivatelia',
    },
]

