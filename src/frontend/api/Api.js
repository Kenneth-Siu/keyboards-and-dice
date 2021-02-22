export async function get(url) {
    return await makeFetch(url, "GET");
}

export async function put(url) {
    return await makeFetch(url, "PUT");
}

export async function post(url) {
    return await makeFetch(url, "POST");
}

async function makeFetch(url, method) {
    const response = await fetch(url, { method: method || "GET" });
    if (!response.ok) {
        throw "Response not ok";
    }
    return await response.json();
}
