# Node.js, Express and MongoDB Project Template
Basic project template for Express/MongoDB-based REST API, with JWT authorization

# How to use
* add .env variables in the file (db_name, password)
* /models: Mongoose schema and model for data, validating those data
* /controllers: entire API logic (parsing request, interacting with model, sending out response), baseController handles most CRUD operations
* /routes: Express routes which are guiding the request to correct controller function, import route file in main app script
