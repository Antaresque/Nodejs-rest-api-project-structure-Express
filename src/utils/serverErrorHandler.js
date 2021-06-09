const mongoose = require('mongoose');

exports.SIGErrorHandler = server => {
    process.on('SIGINT', async () => {
        console.info('Got SIGINT. Graceful shutdown', new Date().toISOString());
        try {
            await mongoose.disconnect();
            console.info('Closed database connection!');
            await server.close();
            process.exit();
        } 
        catch(error) {
            console.info(error.message);
            process.exit(1);
        }
    });
        
    process.on('SIGTERM', async () => {
        console.log('Got SIGTERM. Graceful shutdown', new Date().toISOString());
        try {
            await mongoose.disconnect();
            console.info('Closed database connection!');
            await server.close();
            process.exit();
        } 
        catch(error) {
            console.info(error.message);
            process.exit(1);
        }
    });  
}

exports.processErrorHandler = () => {
    process.on('uncaughtException', err => {
        console.log('UNCAUGHT EXCEPTION - shutting down...');
        console.log(`${err.name}: ${err.message}`);
        
        if(process.env.NODE_ENVIRONMENT == "development")
            console.log(err);

        process.exit(1);
    });
    
    process.on('unhandledRejection', async err => {
        console.log('UNHANDLED REJECTION - shutdown');
        console.log(`${err.name}: ${err.message}`);
        process.exit(1);
    });
}
