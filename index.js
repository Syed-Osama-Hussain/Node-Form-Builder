const express = require('express');
const app =  express();
const cors = require('cors')
const mongoose = require('mongoose');
const user = require('./routes/user')
const auth = require('./routes/auth');
const config = require('./config.json')

const url = process.env.DATABASEURL || config.databaseURL
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true,'useCreateIndex': true});
  
app.use(express.json());
app.use(cors())

app.use("/user",user);
app.use("/auth",auth);

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", function() {
    console.log(`Listening on Port ${port}`);
});