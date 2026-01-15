const express = require("express");
const os = require("os");
const dns = require("dns");
const readDataFile = require("./read");

const app = express();
const PORT = 3000;

// Optional root route
app.get("/", (req, res) => {
    res.send("Welcome to Question-2 Express Server!");
});

// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working!");
});

// Read file route
app.get("/readfile", (req, res) => {
    const content = readDataFile();
    res.send(content);
});

// System details route
app.get("/systemdetails", (req, res) => {
    const systemDetails = {
        platform: os.platform(),
        totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
        cpuModel: os.cpus()[0].model,
        cpuCores: os.cpus().length
    };
    res.json(systemDetails);
});

// Get IP route
app.get("/getip", (req, res) => {
    const hostname = "masaischool.com";
    dns.lookup(hostname, { all: true }, (err, addresses) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ hostname, addresses });
    });
});

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
