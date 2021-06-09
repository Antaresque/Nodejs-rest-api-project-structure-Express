const mongoose = require('mongoose');
const logger = require('./logger');

exports.SIGErrorHandler = server => {
    process.on('SIGINT', async () => {
        logger.info('Got SIGINT. Graceful shutdown', new Date().toISOString());
        try {
            await mongoose.disconnect();
            logger.info('Closed database connection!');
            await server.close();
            process.exit();
        } 
        catch(error) {
            logger.info(error.message);
            process.exit(1);
        }
    });
        
    process.on('SIGTERM', async () => {
        logger.info('Got SIGTERM. Graceful shutdown', new Date().toISOString());
        try {
            await mongoose.disconnect();
            logger.info('Closed database connection!');
            await server.close();
            process.exit();
        } 
        catch(error) {
            logger.info(error.message);
            process.exit(1);
        }
    });  
}

exports.processErrorHandler = () => {
    process.on('uncaughtException', err => {
        logger.error('UNCAUGHT EXCEPTION - shutting down...');
        logger.error(`${err.name}: ${err.message}`);
        
        if(process.env.NODE_ENVIRONMENT == "development")
            logger.info(err);

        process.exit(1);
    });
    
    process.on('unhandledRejection', async err => {
        logger.error('UNHANDLED REJECTION - shutdown');
        logger.error(`${err.name}: ${err.message}`);
        process.exit(1);
    });
}
