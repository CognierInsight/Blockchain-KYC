import * as Joi from "joi";

export const createModel = Joi.object().keys({
  id: Joi.string().required(),
  keyTypeObject: Joi.string().required(),
  startTime:Joi.date().timestamp().required(),
  endTime:Joi.date().timestamp().required(),
  hours: Joi.number().required(),
  views: Joi.number().required(),
  authorized: Joi.string().required(),
  status: Joi.boolean().required(),
  MemberObject: Joi.string().required(),
  documentObject: Joi.string().required()
//keyType: Joi.enum().required(),
// type: Joi.string().required()
});

export const updateModel = Joi.object().keys({
  id: Joi.string().required(),
  keyTypeObject: Joi.string().required(),
  startTime:Joi.date().timestamp().required(),
  hours: Joi.number().required(),
  endTime:Joi.date().timestamp().required(),
  views: Joi.number().required(),
  authorized: Joi.string().required(),
  status: Joi.boolean().required(),
  MemberObject: Joi.string().required(),
  documenObject: Joi.string().required()
});
