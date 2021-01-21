const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const Form = mongoose.model("Form",new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    fields:[{
        type: Schema.Types.ObjectId,
        ref: 'Field'
    }],
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}))


function validateForm(form) {
  const schema = Joi.object({
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    fields: Joi.array()
      .items(Joi.objectId())
      .optional(),
    user: Joi.objectId()
      .required()
  });

  return schema.validate(form); 
}
exports.Form = Form;
exports.validateForm = validateForm;