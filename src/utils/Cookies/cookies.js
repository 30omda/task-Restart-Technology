import Cookies from "js-cookie";
export function setCookie(key, value) {
    Cookies.set(key, typeof value === "object" ? JSON.stringify(value) : value);
}
export function getCookie(key) {
    const value = Cookies.get(key);
    try {
        return JSON.parse(value);
    } catch {
        return value || null;
    }
}

export function removeCookie(key) {
    Cookies.remove(key);
}
