const http = require("http");
const spawn = require("child_process").spawn;
const port = 8000;

let isOnline = false;
let startedFromRasp = false;
let checked = false;

const online = (req, res) => {
    isOnline = true;
    if(!checked) 
        startedFromRasp = true;
    res.writeHead(200);
    res.end();
};

const server = http.createServer(online);
server.listen(port, () => {
    console.log(`${port}`);
})

check();

async function check() {
    while(true) {
        await wait();
        check = true;
        console.log("hi");
        if(!isOnline && startedFromRasp) {
            console.log("Shutdown!");
            const child = spawn("powershell.exe", ["c:\\shutdown.ps1"])
            child.stdout.on("data",(data) => {});
            child.stderr.on("data",(data) => {});
            child.on("exit",() => {
                process.exit(1);
            });
            child.stdin.end();
        }
        isOnline = false;
    }
}

async function wait() {
    return new Promise((res) => {
        setTimeout(res, 60000);
    })
}