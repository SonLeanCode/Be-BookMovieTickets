
const { getAllMovieService } = require('../service/movieStickets.service')
const { getIdMovieService } = require('../service/movieStickets.service')
const { postMovieService } = require('../service/movieStickets.service')
const { patchMovieService } = require('../service/movieStickets.service')
const { deleteMovieService } = require('../service/movieStickets.service')
// @Get  sản phẩm ra trang chủ 
const getAllMovie = async (req, res) => {
    try {
        // search like
        const { nameMovie, actor, producer } = req.query;
        //  nameMovie, actor, producer search like ||  còn req dùng để  panigate
        const movie = await getAllMovieService({ nameMovie, actor, producer }, req);
        if (!movie || movie.items.length === 0) {
            return res.status(400).json({ message: 'Not found get data' });
        }
        return res.status(200).json({ 
            success: true, 
            message: 'Get movie successfully', 
            movie 
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//@Get:id 
const getIdMovie = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'id not found' })
    }
    try {   
        const idMovie = await getIdMovieService(id)
        if (!idMovie) {
            res.status(400).json({ message: 'Not found get id data' })
        }
        res.status(200).json({ success: true, message: 'Get id movie successfully ', idMovie })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

//@Post 
const postMovie = async (req, res) => {

    const { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date } = req.body
    const postMovieData = { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date }

    // check  trường input 
    const missingFields = Object.keys(postMovieData).filter(field => !postMovieData[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${missingFields.join(', ')}` });
    }
    try {
        const movie = await postMovieService(postMovieData)
        res.status(200).json({ success: true, message: 'Post movie successfully', movie })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
//@Path 
const patchMovie = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'not found id patch' })
    }
    const { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date } = req.body
    const patchMovieData = { image, nameMovie, description, director, price, actor, producer, rating, duration, title, release_date }
    try {
        const movieUpdate = await patchMovieService(id, patchMovieData)
        res.status(200).json({ success: true, message: 'Path movie successfully', movieUpdate })
    } catch {
        res.status(400).json({ message: error.message })
    }
}
//@Delete 
const deleteMovie = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'not found id del' })
    }
    try {
        await deleteMovieService(id)
        res.status(200).json({ success: true, message: 'Movie deleted successfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }

}
module.exports = {
    getAllMovie,
    postMovie,
    getIdMovie,
    patchMovie,
    deleteMovie
}


