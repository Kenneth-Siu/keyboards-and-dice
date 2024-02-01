export function asyncTry(tryCallback, catchCallback) {
    (async () => {
        try {
            await tryCallback();
        } catch (err) {
            console.log(err);
            if (catchCallback) {
                await catchCallback();
            }
        }
    })();
}
