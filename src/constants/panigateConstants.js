const {PAGE_DEFAULT ,LIMIT_DEFAULT}  = require('../constants/defaultConstants')

module.exports = {
    options:(req)=>{
        const params = {
            page:req.query.page ? parseInt(req.query.page) : PAGE_DEFAULT,
            limit:req.query.limit ? parseInt(req.query.limit) : LIMIT_DEFAULT,
            customLabels: {
                totalDocs: 'total',
                docs: 'items'
            }
        };
        return params
    },
    query:(req, query ={}, array = [])=>{
       const params =  req.query;
       delete params.page;
       delete params.limit;
       if(array.length > 0){
        array.forEach((el)=>{
            const key = el;
            delete params[key]
        })
       }
       return { ...params, ...query };
    }
    
}