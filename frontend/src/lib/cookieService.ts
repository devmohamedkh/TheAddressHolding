import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
const  cookies = new Cookies();

class CookieService {
    private static instance: CookieService;


    public static getInstance(): CookieService {
        if (!CookieService.instance) {
            CookieService.instance = new CookieService();
        }
        return CookieService.instance;
    }

    

    public setUserData(token: string): void {
        const decodedToken = jwtDecode<{ userId: string }>(token);

        cookies.set("ud", decodedToken, {
            path: "/",
            secure: true,
            sameSite: true,
            maxAge: 30 * 24 * 60 * 60,
        });
    }

    public getUserData(): string | null {
        return cookies.get("ud");
    }

    public get(name: string): void {
        cookies.get(name);
    }
   
    public set(name: string, value: any, options?: any): void {
        cookies.set(name, value, options);
    }

    public remove(name: string, options?: any): void {
        cookies.remove(name, options);
    }


    public clearAll(): void {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach(cookieName => {
            cookies.remove(cookieName);
        });
    }
}

export default CookieService.getInstance()
