import Joi from "joi";

const userValidation = (data) => {
  const userSchme = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
  });
  return userSchme.validate(data);
};

export default userValidation;
