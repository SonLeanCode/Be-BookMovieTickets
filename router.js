module.exports =  function(app){
    // user
    app.use('/api', require('./src/api/routes/users.routes'));
    // movie
    app.use('/api',require('./src/api/routes/movie.routes'))
    // genre
    app.use('/api',require('./src/api/routes/genre.routes'))
    // region
    app.use('/api',require('./src/api/routes/region.routes'))
    //movie_genre
    app.use('/api',require('./src/api/routes/moviegenre.routes'))
    //cinema
    app.use('/api',require('./src/api/routes/cinema.routes'))
    //actor
    app.use('/api',require('./src/api/routes/actor.routes'))
    //movie_actor
    app.use('/api',require('./src/api/routes/movie_actors'))
}