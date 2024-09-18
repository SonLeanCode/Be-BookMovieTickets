const express = require('express');
module.exports =  function(app){
    app.use('/api', require('./src/routes/users.routes'));
}