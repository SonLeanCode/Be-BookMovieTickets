const express = require('express');
module.exports =  function(app){
    // user
    app.use('/api', require('./src/routes/users.routes'));
    // movieStickets
    app.use('/api',require('./src/routes/movieStickets.routes'))
}