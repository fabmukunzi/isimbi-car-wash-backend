import Joi from 'joi';

const validateReports = async (req, res, next) => {
  const reportsSchema = Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().integer().required(),
    category: Joi.string().required(),
    quantity: Joi.number().integer().required(),
    report_date: Joi.string().required(),
    delivery_cost: Joi.number().integer().required(),
  });

  const { error } = reportsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};
const validateIncome = async (req, res, next) => {
  const reportsSchema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    report_date: Joi.string().required(),
    amount:Joi.number().integer().required(),
  });

  const { error } = reportsSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
  next();
};

export {validateReports,validateIncome};
