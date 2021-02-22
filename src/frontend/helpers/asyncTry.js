export function asyncTry(tryCallback, catchCallback) {
    (async () => {
        try {
            await tryCallback();
        } catch (err) {
            await catchCallback();
            console.log(err);
        }
    })();
}