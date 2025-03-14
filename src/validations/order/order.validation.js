import Joi from "joi";

export const validateOrder = async (req, res, next) => {
  const orderSchema = Joi.object().keys({
    scheduledTime: Joi.date().iso().required(),
    address: Joi.object(),
    carPlate: Joi.string().required(),
    names: Joi.string().min(3).max(255).required(),
    phoneNumber: Joi.string().min(10).max(13).required(),
    serviceType: Joi.string().required(),
    price: Joi.number().integer().required(),
    time: Joi.string().required(),
    carModel: Joi.string().required(),
  });

  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ""),
    });
  }
  next();
};
