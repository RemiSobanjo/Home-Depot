const joi = require("joi");
const STATUSCODE = require("../utils/StatusCodes");
const { formatResult} = require("../utils/formatResult");

exports.authValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
        // googleToken: joi.string(),
        // facebookToken: joi.string()
    });

    const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const result = formatResult(schema.validate(req.body));

    if(result.error){
        return res.status(STATUSCODE.BAD_REQUEST).json({
            error: {
                message: result.message,
            },
        });
    }
    next();
};


//Code for singup