const express = require('express')
const { getCollectionOperations } = require('../utils/db')
const { ObjectId } =require('mongodb')
const router = express.Router()

const operations = getCollectionOperations('topSearch')

router.get('/', async (req, res) => {
    const response = await operations.find()
    res.send( response.sort(function (a, b) {
        return b.searchNumber - a.searchNumber
    }).slice(0, 10))
})

router.post('/', async (req, res, next) => {
    const search = req.body
    let response

    const responseFind = await operations
        .findOne({context: search.context})
    if (responseFind) {
        response = await operations
        .updateOne({_id: ObjectId(responseFind._id)}, {searchNumber: responseFind.searchNumber+1})
    } else {
        response = await operations.insertOne({context: search.context, searchNumber: 1})
    }
    
    res.send(response)
})

module.exports = router
