const express = require('express');
module.exports =  function(app){
    // user
    app.use('/api', require('./src/routes/users.routes'));
    // movie
    app.use('/api',require('./src/routes/movie.routes'))
    // genre
    app.use('/api',require('./src/routes/genre.routes'))
    // region
    app.use('/api',require('./src/routes/region.routes'))
    //movie_genre
    app.use('/api',require('./src/routes/moviegenre.routes'))
}