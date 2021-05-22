const quote = require('../util/quote')
const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: 'COTAÇÕES',
        author: 'Diego Miguel'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        title: 'AJUDA',
        author: 'Diego Miguel'
    })
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'SOBRE',
        author: 'Diego Miguel'
    })
})

router.get('/quotes', (req, res) => {
    
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

router.get('/help/*', (req, res) => {
    
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe página depois de /help',
        author: 'Diego Miguel'
    })
})

router.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        errorMessage : 'Página não encontrada',
        author: 'Diego Miguel'
    })
})

module.exports = router