// Write your "actions" router here!
const router = require('express').Router()

const Actions = require('./actions-model')
const {
     validateId, 
     validateAction, 
     validateCompleted } = require('./actions-middlware')


router.get('/', (req, res, next) => {
    Actions.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', validateId,  (req, res, next) => {
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/:id',validateId, validateAction, validateCompleted, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(destroy => {
        res.status(200).json(destroy)
    })
    .catch(next)
})

module.exports = router;