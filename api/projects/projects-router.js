// Write your "projects" router here!
const express = require("express");
const router = express.Router();

const Projects = require('./projects-model');

const { 
    validateId, 
    validateProject, 
    validateCompleted } = require('./projects-middleware');

 

router.get('/', (req, res, next) => {
    Projects.get()
    .then(projects => {
       res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(next)
})

router.put('/:id', validateId,  validateProject, validateCompleted, (req, res, next) => {
    Projects.update(req.params.id, req.body)
    .then(updatedProject => {
        res.status(200).json(updatedProject)
    })
    .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(destroyed => {
        res.status(200).json(destroyed)
    })
    .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(next)
})


module.exports = router;