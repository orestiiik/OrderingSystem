import {useContext} from 'react'
import UserContext from '../context/UserContext'

export default function useUser(userData) {
    const {user, setUser} = useContext(UserContext)

    if (userData && (!user || (user && user.data.username !== userData.data.username))) {
        setUser(userData)
        return user
    } else {
        return user
    }

}