const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'anyVision'

// Create a new MongoClient
const client = new MongoClient(url)

const indernals = {
    db: null,
}

const connect = client.connect(function (err) {
    assert.equal(null, err)
    console.log('Connected successfully to server')

    indernals.db = client.db(dbName)
})

const close = async () => {
    client.close()
}

const getCollectionOperations = (collection) => {
    const find = (query) => {
        return indernals.db
            .collection(collection)
            .find(query)
            .toArray()
    }

    const findOne = (query) => {
        return indernals.db
            .collection(collection)
            .findOne(query)
    }

    const updateOne = (query, payload) => {
        return indernals.db
            .collection(collection)
            .updateOne(query, { $set: payload })
    }

    const insertOne = (document) => {
        return indernals.db
            .collection(collection)
            .insertOne(document)
    }
    return {
        find,
        findOne,
        insertOne,
        updateOne,
    }
}

module.exports = {
    connect,
    getCollectionOperations,
    close,
}

