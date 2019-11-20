const express = require('express');
const router = express.Router();
// Database
const db = require('../db.js');


const getAllResearchers = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM researchers`
    let results = await db.any(selectQuery);
    res.status(200).json({
        status: 'success',
        message: 'retrieved all researchers',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'no researchers to be found',
            payload: null
        })
    }
}

const getSingleResearcher = async (req, res) => {
    try{
    let selectQuery = `SELECT * FROM researchers WHERE id = $1`
    let results = await db.any(selectQuery, parseInt(req.params.id));
    res.status(200).json({
        status: 'success',
        message: 'retrieved single researchers',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Researcher to be found',
            payload: null
        })
    }
}

const addNewResearcher = async (req, res) => {
    try{
    let insertQuery = `
    INSERT INTO researchers(name, job_title) VALUES($1, $2) `
    let results = await db.none(insertQuery, [req.body.name, req.body.job_title]);
    res.status(201).json({
        status: 'success',
        message: 'added new researcher'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Researcher was not added',
            payload: null
        })
    }
}

const updateResearcher = async (req, res) => {
    try{
    let updateQuery = `
    UPDATE researchers SET name = $1, job_title = $2 WHERE id = $3`
    let results = await db.any(updateQuery, [req.body.name, req.body.job_title, parseInt(req.params.id)]);
    res.status(201).json({
        status: 'success',
        message: 'updated researcher',
        payload: results
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Researcher was not updated',
            payload: null
        })
    }
}

const deleteResearcher = async (req, res) => {
    try{
    let deleteQuery = `
    DELETE FROM researchers WHERE id = $1`
    let results = await db.none(deleteQuery, parseInt(req.params.id));
    res.status(201).json({
        status: 'success',
        message: 'Deleted researcher'
    })
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: 'Researcher was not deleted',
            payload: null
        })
    }
}


router.get('/', getAllResearchers);
router.get('/:id', getSingleResearcher);
router.post('/', addNewResearcher);
router.patch('/:id', updateResearcher);
router.delete('/:id', deleteResearcher);

module.exports = router;