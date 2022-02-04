const Joi = require('joi');

module.exports.shopSchema = Joi.object({     // Validates data before it's even sent to Mongoose
    shop: Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        phone: Joi.string().required(),
        hours: Joi.string().required(),
        link: Joi.string().uri(),
        description: Joi.string(),
        image: Joi.string(),
        features: Joi.string()
    }).required()
});