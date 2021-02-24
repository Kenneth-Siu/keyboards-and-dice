export async function get(url) {
    return await makeFetch(url, "GET", null, true);
}

export async function put(url, body, expectJsonResponse) {
    return await makeFetch(url, "PUT", body, expectJsonResponse);
}

export async function post(url, body, expectJsonResponse) {
    return await makeFetch(url, "POST", body, expectJsonResponse);
}

export async function makeFetch(url, method, body, expectJsonResponse) {
    const options = {
        method: method || "GET",
    };
    if (body) {
        options.headers = {
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw "Response not ok";
    }
    if (expectJsonResponse) {
        return await response.json();
    }
    return;
}
