const { get } = require('./actions-model')

function validateId(req, res, next){
    get(req.params.id)
    .then(action => {
        if(action){
            req.action = action
            next()  
        }else{
            res.status(404).json({
                message: 'action not found'
            })
        }
    })
    .catch(next);
}

function validateAction(req, res, next){
    if(!req.body.notes || 
       !req.body.description || 
       !req.body.project_id){
           res.status(400).json({
               message: 'notes, description and id are required'
           })
       }else{
           next()
       }
}

function validateCompleted(req, res, next){
    if(req.body.completed !== true &&
       req.body.completed !== false){
            res.status(400).json({
               message: 'you must decide, completed or not!'
           })
       }else{
           next()
       }
}

module.exports = {
    validateId,
    validateAction,
    validateCompleted
}