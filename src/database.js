const mongoose = require('mongoose');
const logger = require('./utils/logger');

module.exports = async () => {
    const database = process.env.DATABASE
        .replace('<password>', process.env.DATABASE_PASSWORD)
        .replace('<database_name>', process.env.DATABASE_NAME);

    // Connect the database
    try {
        await mongoose.connect(database, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        });

        //require('../mock').loadData();
        logger.info('Connected to database');
    }
    catch(err) {
        logger.info("MongoDB connection error, shutting down...");
        logger.info(err.name, err.message);
        process.exit();
    }
}