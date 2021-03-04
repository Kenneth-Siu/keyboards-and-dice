export function asyncTry(tryCallback, catchCallback) {
    setTimeout(async () => {
        try {
            await tryCallback();
        } catch (err) {
            console.log(err);
            if (catchCallback) {
                await catchCallback();
            }
        }
    }, 2000);
    // (async () => {
    //     try {
    //         await tryCallback();
    //     } catch (err) {
    //         console.log(err);
    //         if (catchCallback) {
    //             await catchCallback();
    //         }
    //     }
    // })();
}
