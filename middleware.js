
import { NextResponse } from 'next/server';


export function middleware() {
    const token = request.cookies.get("token")?.value;
    const user = request.cookies.get("user")?.value;
    const isEmployee = request.cookies.get("isEmployee")?.value;

    const isAuth = token && user && isEmployee === "true";
    const isLoginPage = request.nextUrl.pathname === "/login";

    if (!isAuth && !isLoginPage) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuth && isLoginPage) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard", "/products", "/settings", "/login"],
};
