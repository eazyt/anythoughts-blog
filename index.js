require('dotenv').config();
// console.log(process.env) 
const { engine } = require('express-edge')
const express = require('express')
const edge = require('edge.js')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')
const createPostController = require('./controllers/createPost')
const homepageControllers = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logoutUser')
const app = express()
const mongoose = require('mongoose')
PORT = process.env.PORT || 4000
MONGO_URL = process.env.DB_URI

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
      console.log(`MongoDb successfully connected`)
    })
    .catch((e) => {
      console.log(`Could not connect to MongoDB`, e)
    })

app.use(connectFlash())

const mongoStore = connectMongo(session)
app.use(session({
  secret: process.env.EXPRESS_SESSION_KEY,
  resave: false,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  }),
  saveUninitialized: true,
  cookie: { secure: false }
}))



app.use(fileUpload())

app.use(express.static('public'))

app.use(engine)
app.set('views', `${__dirname}/views`)
app.use('*', (request, response, next) => {
  edge.global('auth', request.session.userId)
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))

const storePostMiddleware = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectifAthenticated = require('./middleware/redirectfAuthenticated')


app.get('/', homepageControllers)


app.get('/auth/logout', auth, logoutController)

app.get('/post/new', auth, createPostController)
app.get('/post/:id', getPostController)


app.post('/post/store', auth, storePostMiddleware, storePostController)

app.get('/auth/login', redirectifAthenticated, loginController)

app.post('/users/login', redirectifAthenticated, loginUserController)

app.get('/auth/register', redirectifAthenticated, createUserController)

app.post('/users/register', redirectifAthenticated, storeUserController)

app.use((request, response) => response.render('not-found'))


app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})