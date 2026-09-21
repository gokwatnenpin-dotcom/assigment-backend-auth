const config = require('./config');
const app = require('./app');

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.env}`);
});
