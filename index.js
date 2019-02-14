// import your node modules
require('dotenv').config();

const server = require('./data/server')

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${4000}***\n`);
});
