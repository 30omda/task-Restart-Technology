export function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}
export function removeItem(key) {
    localStorage.removeItem(key);
}
export function clear() {
    for (let key in localStorage) {
        if (key !== "selectedLanguage" && key !== "i18nextLng") {
            localStorage.removeItem(key);
        }
    }
}
