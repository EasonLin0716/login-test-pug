// include express, handlebars, body-parser
const express = require('express')
const app = express()
const port = 3000
const loginCheck = require('./login_check')
const bodyParser = require('body-parser')
const users = require('./users.json')
var cookieParser = require('cookie-parser');

// set pug as view engine
app.set('view engine', 'pug');
app.set('views', './views');

// setting cookie-parser
app.use(cookieParser());

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

// setting routes
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const account = req.body
  console.log(req.body)
  const result = loginCheck(account, users.results)
  if (result) {
    res.render('login', { result })
  } else {
    res.render('index', { result })
  }
})

// starts the express server and listening for connections.
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})