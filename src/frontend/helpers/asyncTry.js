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

// export function asyncTry(tryCallback, catchCallback) {
//     (async () => {
//         try {
//             setTimeout(() => {
//                 tryCallback();
//             }, 2000);
//         } catch (err) {
//             console.log(err);
//             if (catchCallback) {
//                 await catchCallback();
//             }
//         }
//     })();
// }
