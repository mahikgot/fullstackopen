const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/note')

const isValid = async (req, meth) => {
    const body = req.body
    const result = await Person.find({name: body.name})

    if (meth === 'post') {
        if (result.length > 0)
            return {validity: false, name: 'name must be unique'}
    }

    if ((body.name === undefined || body.name === '') || (body.number === undefined || body.number === ''))
        return {validity: false, name: 'body must have name and number'}

    return {validity: true, name: ''}
}

morgan.token('body', (req, res) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return ' '
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res, next) => {
    const toSendFirst = `<p>Phonebook has info for ${Person.countDocuments({})} people<p>`
    const toSendSecond = `<p>${Date()}</p>`
    res.send(toSendFirst + toSendSecond)
})

app.get('/api/persons', (req, res, next) =>
    Person.find({})
        .then(result => res.json(result))
        .catch(error => next(error))
)

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.find({_id: id})
        .then(result => {
            if (result[0] === undefined) {
                res.status(404).end()
            }
            else
                res.json(result[0])
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Person.deleteOne({_id: id})
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', async (req, res, next) => {
    const isOk = await isValid(req, 'put')
    const id = req.params.id
    if (isOk.validity)
        Person.findOneAndReplace({_id: id}, req.body, {new: true})
            .then(result => res.json(result))
            .catch(error => next(error))
    else
        next(isOk)
})

app.post('/api/persons', async (req, res, next) => {
    const isOk = await isValid(req, 'post')
    if (isOk.validity) {
        const person = new Person({
            name: req.body.name,
            number: req.body.number
        })
        person.save()
            .then(result => res.json(result))
    }
    else
        next(isOk)
})

const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError')
        res.status(400).send({error: err.message})
    else if ((err.name === 'name must be unique') || (err.name === 'body must have name and number'))
        res.status(400).send({error: err.name})
    next(err)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT)
