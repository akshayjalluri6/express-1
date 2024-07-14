import express from 'express'

const app = express()

const port = 3000
app.use(express.json())

let moviesList = []
let nextId = 1

app.post('/movie', (req, res) => {
    const {title, rating, budget, year} = req.body
    const movie = {
        id: nextId++,
        title,
        rating,
        budget,
        year
    }
    moviesList.push(movie)
    res.status(201).send(movie)
})

app.get('/movies', (req, res) => {
    res.status(200).send(moviesList)
})

//get movie
app.get('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = moviesList.find(m => m.id === parseInt(id))

    if(!movie){
        return res.status(404).send("Movie Not Found")
    }
    
    res.status(200).send(movie)
})

//update movie
app.put('/movies/:id', (req, res) => {
    const {id} = req.params
    const movie = moviesList.find(m => m.id === parseInt(id))

    if(!movie){
        return res.status(404).send("Movie Not Found")
    }
    
    const {title, rating, budget, year} = req.body
    movie.title = title
    movie.rating = rating
    movie.budget = budget
    movie.year = year
    res.status(200).send(movie)
})

//Delete movie

app.delete('/movies/:id', (req, res) => {
    const {id} = req.params
    const index = moviesList.findIndex(m => m.id === parseInt(id))
    if(index === -1){
        return res.status(404).send("Movie Not Found")
    }
    moviesList.splice(index, 1)
    res.status(202).send("Deleted Successfully")

})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    res.send('Hi This is a test!')
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})