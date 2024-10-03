const http = require("http");
const wol = require("wol");
const options = {
    host: "192.168.1.67",
    path: "/",
    port: "8000",
    method: "GET"
};
const WAKE_ADDRESS = "18:C0:4D:B7:2B:56";

async function send() {
    while(true) {
        console.log("send");
        
        const req = http.request(options, (res) => {});
        req.on('error', err => {
            console.log("failed!");
        })
        req.end();
        await wait();
    }
}

async function wait() {
    return new Promise((res) => {
        setTimeout(res, 30000)
    })
} 

wol.wake(WAKE_ADDRESS, (err, res) => {console.log(res);})
send();
