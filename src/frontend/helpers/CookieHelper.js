export function set(cookieName, data) {
    const date = new Date();
    date.setTime(date.getTime() + 14 * 24 * 60 * 60 * 1000); // Two weeks
    document.cookie = `${cookieName}=${JSON.stringify(data)}; path=/; expires=${date.toUTCString()}`;
}

export function get(cookieName, defaultData) {
    const storedJson = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
    if (!storedJson) {
        return defaultData;
    }
    return JSON.parse(storedJson.split("=")[1]);
}
