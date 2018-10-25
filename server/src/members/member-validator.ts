import * as Joi from "joi";

export const createModel = Joi.object().keys({
  id: Joi.string().required(),
  email: Joi.string().required(),
  password :Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().optional(),
  contact: Joi.string().required(),
  address: Joi.object().optional().keys({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip: Joi.string().optional()
  }),
  authorized: Joi.array().optional(),
  customers: Joi.array().optional(),
  kycDetails: Joi.object().optional().keys({
    status: Joi.string().optional(),
    documentRequired: Joi.array().optional()
  })
});

export const updateModel = Joi.object().keys({
  id: Joi.string().required(),
  email: Joi.string().required(),
  password :Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  contact: Joi.string().required(),
  dob: Joi.date().optional(),
  address: Joi.object().optional().keys({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    state: Joi.string().optional(),
    country: Joi.string().optional(),
    zip: Joi.string().optional()
  }),
  authorized: Joi.array().optional(),
  customers: Joi.array().optional(),
  kycDetails: Joi.object().optional().keys({
    status: Joi.string().optional(),
    documentRequired: Joi.array().optional()
  })
});
