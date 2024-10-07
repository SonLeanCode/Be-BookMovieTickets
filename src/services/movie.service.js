const MovieSticketsModel = require('../models/MovieModel')
const PAGINATION = require('../constants/panigateConstants')
//@Get service
const getAllMovieService = async ({ nameMovie, actor, producer },req) => {
    let query = {}; //search
    
    try {
        // panigate
        const options = PAGINATION.options(req,{
            sort: { createdAt: -1 }
           })  
           const querys = PAGINATION.query(req,query);
        // search like
        if (nameMovie && nameMovie.trim() !== '') {
            query.nameMovie = { $regex: '.*' + nameMovie + '.*', $options: 'i' };
        }
        if (actor && actor.trim() !== '') {
            query.actor = { $regex: '.*' + actor + '.*', $options: 'i' };
        }
        if (producer && producer.trim() !== '') {
            query.producer = { $regex:'.*'+ producer + '.*', $options: 'i' };
        }

        // Tìm kiếm phim theo query
        const movies = await MovieSticketsModel.paginate(querys,options);

        return movies;
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to get movie');
    }
};



//@Get:id
const getIdMovieService = async (_id) => {
    try {
        const getIdMove = await MovieSticketsModel.findOne({ _id })
        if (!getIdMove) {
            console.error('Id not found in model', error)
        }
        return getIdMove
    } catch (error) {
        throw new Error('Unable to get id movie')
    }

}
//@Post service
const postMovieService = async (data) => {

    if (!data) {
        throw new Error('Invalid data');
    }
    try {
        const module = new MovieSticketsModel({
            image: data.image,
            nameMovie: data.nameMovie,
            description: data.description,
            director: data.director,
            price: data.price,
            actor: data.actor,
            producer: data.producer,
            rating: data.rating,
            duration: data.duration,
            title: data.title,
            release_date: data.release_date
        })
        const dataMovie = await module.save();


        return dataMovie
    } catch (error) {
        console.error('Error in Sevice', error)
        throw new Error('Unble to post movie')
    }
}
//@Patch 
const patchMovieService = async (_id, data) => {
    console.log(_id, data);

    if (!_id) {
        throw new Error('Not found id')
    }
    try {
        const updateID = await MovieSticketsModel.findByIdAndUpdate(_id, {
            // check bằng undefined để kiểm tra  dữ liệu trước khi  cập nhật  k  xác định hoạc undefined thì  nó sẽ đặt thành là null
            // làm mất dữ liệu trong trường    => nói chung check undefind để tránh  dữ liệu là null 
            image: data.image !== undefined ? data.image : undefined,
            nameMovie: data.nameMovie !== undefined ? data.nameMovie : undefined,
            description: data.description !== undefined ? data.description : undefined,
            director: data.director !== undefined ? data.director : undefined,
            price: data.price !== undefined ? data.price : undefined,
            actor: data.actor !== undefined ? data.actor : undefined,
            producer: data.producer !== undefined ? data.producer : undefined,
            rating: data.rating !== undefined ? data.rating : undefined,
            duration: data.duration !== undefined ? data.duration : undefined,
            title: data.title !== undefined ? data.title : undefined,
            release_date: data.release_date !== undefined ? data.release_date : undefined
        }, { new: true }) // new :true trả về kết quả dc sau khi cập nhật nên kh cần dùng tới save 

        return updateID
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to update movie');
    }
}
//@Delete 
const deleteMovieService = async (_id) => {
    if (!_id) {
        throw new Error('Movie ID is required');
    }
    try {
        const delMovie = await MovieSticketsModel.findByIdAndDelete(_id)
        if (!delMovie) {
            throw new Error('Movie not found');
        }
    } catch (error) {
        console.error('Error in Service', error);
        throw new Error('Unable to delete movie');
    }
}
module.exports = {
    getAllMovieService,
    postMovieService,
    getIdMovieService,
    patchMovieService,
    deleteMovieService

}