window.package.receive("fromMain", (data) => {
    console.log(`Received ${data} from main process`);
});

// Send a message to the main process
window.package.send("toMain", "some data");