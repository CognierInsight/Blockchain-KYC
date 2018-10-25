import * as Joi from "joi";

export const createModel = Joi.object().keys({
  id: Joi.string().required(),
  documentName: Joi.string().required(),
  documentImage: Joi.string().required(),
  status: Joi.string().required(),
  MemberObject: Joi.string().required(),
  categoryObject:Joi.string().required()
});

export const updateModel = Joi.object().keys({
  id: Joi.string().required(),
  documentName: Joi.string().required(),
  documentImage: Joi.string().required(),
  status: Joi.string().required(),
  MemberObject: Joi.string().required(),
  categoryObject:Joi.string().required()
  //memberIds: Joi.array().optional()
});
