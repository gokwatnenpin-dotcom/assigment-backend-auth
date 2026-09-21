const createRateLimiter = (options = {}) => {
  const windowMs = options.windowMs || 15 * 60 * 1000;
  const max = options.max || 100;
  const message = options.message || 'Too many requests, please try again later.';
  const hits = new Map();

  const interval = setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of hits.entries()) {
      if (now > record.resetTime) {
        hits.delete(ip);
      }
    }
  }, windowMs);
  interval.unref();

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const record = hits.get(ip);

    if (!record || now > record.resetTime) {
      hits.set(ip, { count: 1, resetTime: now + windowMs });
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', max - 1);
      return next();
    }

    record.count += 1;
    const remaining = Math.max(0, max - record.count);
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', remaining);

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        message,
        retryAfter: `${retryAfterSeconds} seconds`
      });
    }

    next();
  };
};

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});

const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Too many authentication attempts, please try again later.'
});

module.exports = {
  createRateLimiter,
  apiLimiter,
  authLimiter
};
