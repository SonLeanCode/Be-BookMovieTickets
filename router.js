const express = require('express');
module.exports =  function(app){
    // user
    app.use('/api', require('./src/routes/users.routes'));
    // movieStickets
    app.use('/api',require('./src/routes/movie.routes'))
    // genre
    app.use('/api',require('./src/routes/genre.routes'))
    // region
    app.use('/api',require('./src/routes/region.routes'))
}