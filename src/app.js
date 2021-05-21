const path = require('path')
const express = require('express')
const hbs = require('hbs')
const quote = require('./util/quote')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'COTAÇÕES',
        author: 'Diego Miguel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'AJUDA',
        author: 'Diego Miguel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'SOBRE',
        author: 'Diego Miguel'
    })
})

app.get('/quotes', (req, res) => {
    
    if(!req.query.stockCode){
        return res.status(400).json({
            error : {
                mensage: 'O ativo deve ser informado como query parameter',
                code : 400
            }
        })
    }

    const symbol = req.query.stockCode.toUpperCase()

    quote(symbol, (err, body) => {
        if(err){
                    
            return res.status(err.code).json({error : {
                mensage: err.mensage,
                code : err.code
            }})
        }
        res.status(200).json(body)
    })

})

app.get('/help/*', (req, res) => {
    
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe página depois de /help',
        author: 'Diego Miguel'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Página não encontrada',
        author: 'Diego Miguel'
    })
})

// Checking application environment (dev/prod)
const port = process.env.PORT ||3000

app.listen(port, () => {
    console.log(`Server up!`)
})