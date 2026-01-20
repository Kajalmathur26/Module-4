let requestCounts = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15;

const rateLimiterMiddleware = (req, res, next) => {
    const ip = req.ip;

    if (!requestCounts[ip]) requestCounts[ip] = [];

    const currentTime = Date.now();
    requestCounts[ip] = requestCounts[ip].filter(time => currentTime - time < WINDOW_SIZE);

    if (requestCounts[ip].length >= MAX_REQUESTS) {
        return res.status(429).json({ error: "Too many requests, please try again later" });
    }

    requestCounts[ip].push(currentTime);
    next();
};

module.exports = rateLimiterMiddleware;
