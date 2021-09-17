const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/note')

const isValid = async (req) => {
    const body = req.body
    const result = await Person.find({name: body.name})

    if (result.length > 0)
        return valid = {validity: false, error: 'name must be unique'}

    if (body.name === (undefined || '') || body.number === (undefined || '') )
        return valid = {validity: false, error: 'body must have name and number'}
    return valid = {validity: true, error: ''}
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

app.get('/info', (req, res) => {
    const toSendFirst = `<p>Phonebook has info for ${Person.countDocuments({})} people<p>`
    const toSendSecond = `<p>${Date()}</p>`
    res.send(toSendFirst + toSendSecond)
})

app.get('/api/persons', (req, res) =>
    Person.find({})
        .then(result => res.json(result))
)

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.find({_id: id})
        .then(result => {
            console.log(result)
            if (result[0] === undefined) {
                res.status(404).end()
            }
            else
                res.json(result[0])
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.deleteOne({_id: id})
        .then(() => {
            res.status(204).end()
        })
})

app.put('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findOneAndReplace({_id: id}, req.body, {new: true})
        .then(result => res.json(result))
})

app.post('/api/persons', async (req, res) => {
    const isOk = await isValid(req)
    if (isOk.validity) {
        const person = new Person({
            name: req.body.name,
            number: req.body.number
        })
        person.save()
            .then(result => res.json(result))
    }
    else {
        console.log('boboka')
        res.status(400).json({error: isOk.error})
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
