const express = require('express')
const methodOverride = require('method-override') // lib para express receber todos os verbos HTTP além do GET e POST
const bodyParser = require('body-parser') // FAZ COM QUE O EXPRESS ENTENDA A REQUISIÇÃO QUANDO FOR JSON OU QUERY STRING, POR PADRÃO O EXPRESS SO RECEBE REQUISIÇÕES COMO TEXTO PURO
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const app = express()

app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM
app.use(methodOverride('_method')) // QUERY STRING /RECURSO?_METHOD=PUT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//MIDDLEWARES
app.use((request, response, next) => {
  if (request.url === '/favicon.ico') {
    response.writeHead(200, { 'Content-Type': 'image/x-icon' })
    response.end('')
  } else {
    next()
  }
})
app.use(passport.initialize())
passport.use(
  new BasicStrategy((username, password, done) => {
    if (username.valueOf() === 'rebels' && password.valueOf() === '1138') {
      return done(null, true)
    } else {
      return done(null, false)
    }
  })
)
app.use('/', require('./routes'))

//ERROS HANDLING
app.use((request, response, next) => {
  var err = new Error('Not found')
  err.status = 404
  next(err)
})
app.use((err, request, response, next) => {
  console.log(err.stack)
  response.status(err.status || 500).json({ err: err.message })
})

module.exports = app
