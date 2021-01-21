const mongoose = require('mongoose');
const Joi = require('joi');

const Field = mongoose.model("Field",new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    label:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    required:{
        type: Boolean,
        required: true
    },
    placeholder:{
        type: String,
        default: ""
    },
    type:{
        type: String,
        required: true
    },
    value:{
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
}))


function validateField(field) {
  const schema = Joi.object({
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    label: Joi.string()
      .min(5)
      .max(255)
      .required(),
    required: Joi.boolean()
      .required(),
    placeholder: Joi.string().allow(null, '')
      .optional(),
    type: Joi.string()
      .required(),
    value: Joi.alternatives()
      .try(Joi.string(), Joi.bool(), Joi.array())
      .required()
  });

  return schema.validate(field); 
}
exports.Field = Field;
exports.validateField = validateField;