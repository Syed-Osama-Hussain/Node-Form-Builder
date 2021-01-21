const express = require("express");
const router = express.Router();
const { Form, validateForm } = require('../models/Form');
const { Field, validateField } = require('../models/Field');
const auth = require('../middleware/auth')


router.get("/", auth, async (req,res) => {
    const forms = await Form.find({user: req.user._id}).populate("fields").exec();
    res.send(forms);
});


router.post("/", auth , async (req,res) => {
    let fields = []
    for(let field of req.body.fields){
        const { error: fieldError} = validateField(field)
        if (fieldError) return res.status(400).send(fieldError.details[0].message);    
    }
    if(req.body.fields)
        fields = await Field.insertMany(req.body.fields)
    
    let fieldIds = []
    for(let field of fields){
        fieldIds.push(String(field._id))
    }

    const { error } = validateForm({title: req.body.title,fields: fieldIds,user:String(req.user._id)});
    if (error) return res.status(400).send(error.details[0].message);

    const form = await Form.create({title: req.body.title,fields: fieldIds,user:String(req.user._id)})

    if(!form) return res.status(400).send("Form not found");
    return res.send(form)
    
});


router.get("/:id",auth,async (req,res) => {
    const forms = await Form.findById(req.params.id).populate("fields").exec();

    if(forms.user != String(req.user._id)) return res.status(403).send("Access denied");

    if(!forms) return res.status(400).send("Form not found");

    res.send(forms);
});


module.exports = router;