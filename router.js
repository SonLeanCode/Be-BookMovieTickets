const express = require('express');
module.exports =  function(app){
    app.use('/api', require('./routes/users.routes'));
}