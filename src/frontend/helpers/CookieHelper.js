export function set(cookieName, data) {
    document.cookie = `${cookieName}=${JSON.stringify(data)}`;
}

export function get(cookieName, defaultData) {
    const storedJson = document.cookie.split("; ").find((row) => row.startsWith(`${cookieName}=`));
    if (!storedJson) {
        return defaultData;
    }
    return JSON.parse(storedJson.split("=")[1]);
}
