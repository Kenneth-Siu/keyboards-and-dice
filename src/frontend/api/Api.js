export async function get(url) {
    return await makeFetch(url, "GET", true);
}

export async function put(url, expectJsonResponse) {
    return await makeFetch(url, "PUT", expectJsonResponse);
}

export async function post(url, expectJsonResponse) {
    return await makeFetch(url, "POST", expectJsonResponse);
}

async function makeFetch(url, method, expectJsonResponse) {
    const response = await fetch(url, { method: method || "GET" });
    if (!response.ok) {
        throw "Response not ok";
    }
    if (expectJsonResponse) {
        return await response.json();
    }
    return;
}
