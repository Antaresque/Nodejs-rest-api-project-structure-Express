const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).send({
            status: 'success',
            data: {}
        });

    } catch (error) {
        next(error);
    }
};

exports.updateOne = Model => async (req, res, next) => {
    try {
        console.log(req.body);
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).send({
            status: 'success',
            data: doc
        });

    } catch (error) {s
        next(error);
    }
};

exports.createOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);

        res.status(201).send({
            status: 'success',
            data: doc
        });

    } catch (error) {
        next(error);
    }
};

exports.getOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);

        if(!doc) {
            return next(new AppError(404, 'fail', 'No document found with that id'), req, res, next);
        }

        res.status(200).send({
            status: 'success',
            data: doc
        });
    } catch (error) {
        next(error);
    }
};

exports.getAll = (Model, totalCount = false) => async (req, res, next) => {
    try {
        const features = new APIFeatures(Model.find(), req.query)
            .sort()
            .paginate();
        const doc = await features.query;

        if(!doc)
            return next(new AppError(404, 'fail', 'No document found with that rating'), req, res, next);
        
        let result = {
            status: 'success',
            data: doc
        };

        if(totalCount){
            result.totalCount = await Model.countDocuments();
        }

        res.status(200).send(result);

    } catch (error) {
        next(error);
    }
};

exports.getWhere = (Model, where = [], totalCount = false) => async (req, res, next) => {
    try {
        let options = {};
        let quit = false;

        where.forEach(keyName => {
            if(!req.query.hasOwnProperty(keyName))
                quit = true;
            else
                options[keyName] = req.query[keyName];
        });

        if(quit)
            return next();

        //console.log(options);

        const features = new APIFeatures(Model.find().where(options), req.query)
            .sort()
            .paginate();

        const doc = await features.query;

        if(!doc) {
            return next(new AppError(404, 'fail', 'No document found with that rating'), req, res, next);
        }

        let result = {
            status: 'success',
            data: doc
        };

        if(totalCount){
            result.totalCount = await Model.countDocuments();
        }

        res.status(200).send(result);

    } catch(error) {
        next(error);
    }
}