const { get } = require('./projects-model')

function validateId(req, res, next) {
    const { id } = req.params
    get(id)
    .then(project => {
        if(project){
            req.project = project
            next()
        }else{
            res.status(404).json({
                message: 'project not found'
            })
        }
    })
    .catch(next)
}

function validateProject(req, res, next) {
    if(req.body.name && req.body.description){
        next()
    }else{
        res.status(400).json({
            message: 'name and description are required'
        })
    }
}

function validateCompleted(req, res, next) {
    if(req.body.completed !== true && 
       req.body.completed !== false) {
            res.status(400).json({ 
                message: 'you must decide, completed or not!' });
    } else {
        next();
    }
}


module.exports = {
    validateId,
    validateProject,
    validateCompleted
}