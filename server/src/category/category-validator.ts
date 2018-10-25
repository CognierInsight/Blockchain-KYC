import * as Joi from "joi";

export const createModel = Joi.object().keys({
  id: Joi.string().required(),
  categoryName: Joi.string().required(),
  description: Joi.string().required()
  //documentImage: Joi.string().required(),
  //revokeTime:Joi.string().required(),
  //memberId: Joi.string().required(),
  //id:Joi.string().required()
});

export const updateModel = Joi.object().keys({
  id: Joi.string().required(),
  categoryName: Joi.string().required(),
  description: Joi.string().required()
  //documentImage: Joi.string().required(),
  //revokeTime:Joi.string().required(),
  //memberId: Joi.string().required(),
  //id:Joi.string().required()
  //memberIds: Joi.array().optional()
});
/*
export const changeDriverModel = Joi.object().keys({
  docId: Joi.string().required()
});
*/
