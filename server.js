const http = require('http');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const { processErrorHandler, SIGErrorHandler } = require('./src/utils/serverErrorHandler');

dotenv.config();
processErrorHandler();

process.env.PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "public.key"), 'utf-8');

const app = require('./src/app');       // express app
const db = require('./src/database');   // mongoose connection

db().then(() => {
    // Start the server
    const port = process.env.PORT || 4000;
    const server = http.createServer(app).listen(port);
    console.log(`Application active on port ${port}`);

    // handling sudden shutdown
    SIGErrorHandler(server);
});

