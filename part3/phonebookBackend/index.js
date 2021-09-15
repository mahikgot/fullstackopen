const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const getRandomInt = (max) =>
    Math.floor(Math.random() * max)

const isValid = (req) => {
    body = req.body

    if (persons.find(person => person.name === body.name))
        return {validity: false, error: 'name must be unique'}
    if (body.name === undefined || body.number === undefined)
        return {validity: false, error: 'body must have name and number'}
    return {validity: true, error: ''}
}

let persons = [
    {
        'id': 1,
        'name': 'mark',
        'number': 123
    },
    {
        'id': 2,
        'name': 'badong',
        'number': 122
    }
]

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
    const toSendFirst = `<p>Phonebook has info for ${persons.length} people<p>`
    let today = new Date(Date())
    const toSendSecond = `<p>${today}</p>`
    res.send(toSendFirst + toSendSecond)
})


app.get('/api/persons', (req, res) =>
    res.json(persons)
)

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(person => person.id === Number(id))

    if (person === undefined) {
        res.status(404).end()
    }
    else
        res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    res.status(204).end()
})
app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.map(person =>
        person.id === id
            ? {...person, number: req.body.number}
            : person
    )
    const person = persons.find(person => person.id === id)
    res.json(person)
})


app.post('/api/persons', (req, res) => {
    const id = getRandomInt(10000)
    const isOk = isValid(req)
    if (isOk.validity) {
        const person = {
            id: id,
            name: req.body.name,
            number: req.body.number
        }
        persons = persons.concat(person)
        res.json(person)
    }
    else
        res.status(400).json({error: isOk.error})
})


const PORT = process.env.PORT || 3001
app.listen(PORT)
