import {NextResponse} from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
export const middleware = async (req) => {
    const {cookies} = req
    const {pathname} = req.nextUrl
    if (
        pathname.startsWith('/_next') || // exclude Next.js internals
        pathname.startsWith('/api') || //  exclude all API routes
        pathname.startsWith('/static') || // exclude static files
        PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    )
        return NextResponse.next()

    const isAuthenticated = cookies.userToken

    if (!isAuthenticated && pathname !== '/login') {
        return NextResponse.redirect('/login')

    } else if (isAuthenticated) {
        if (pathname === '/login') {
            return NextResponse.redirect('/')
        }
        return NextResponse.next()
    }
}