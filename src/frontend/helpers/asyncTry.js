export function asyncTry(tryCallback, catchCallback) {
    (async () => {
        try {
            await tryCallback();
        } catch (err) {
            catchCallback();
            console.log(err);
        }
    })();
}