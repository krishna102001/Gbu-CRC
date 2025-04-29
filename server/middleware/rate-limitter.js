import { rateLimit } from "express-rate-limit";
const rateLimiter = (num) => {
  const limiter = rateLimit({
    windowMs: 1000 * 60 * 5, // how long should we remember the request
    limit: num, // how many request it client can make
    message: "Too many request, try again after " + num + " minutes!!",
    standardHeaders: "draft-8",
    legacyHeaders: false,
  });
  return limiter;
};

export default rateLimiter;
