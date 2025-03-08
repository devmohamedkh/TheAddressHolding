import {parse} from "cookie";
import { cookies } from "next/headers";

export const setCookies = async (authCookies: string[] | undefined) => {
    if (authCookies && authCookies.length > 0) {
        const  Cookies = await cookies()
        authCookies.forEach(cookie => {
            const parsedCookie = parse(cookie)
            const [cookieName, cookieValue] = Object.entries(parsedCookie)[0]

            Cookies.set({
                name: cookieName,
                value: cookieValue || '',
                httpOnly: true,
                path: parsedCookie.path,
                expires: parsedCookie.expires ? new Date(parsedCookie.expires) : undefined,
                 //secure: true,
            })
        })
    }
}
