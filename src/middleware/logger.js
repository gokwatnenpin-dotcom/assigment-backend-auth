const logger = (req, res, next) => {
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timestamp = `${hours}:${minutes}:${seconds}`;

    console.log(`${method} ${originalUrl} - ${statusCode} - ${timestamp}`);
  });

  next();
};

module.exports = logger;
