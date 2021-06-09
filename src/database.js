const mongoose = require('mongoose');

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
        console.info('Connected to database');
    }
    catch(err) {
        console.info("MongoDB connection error, shutting down...");
        console.info(err.name, err.message);
        process.exit();
    }
}