
const User = require('../database/models/User')
module.exports = (request, response, next) => {
// fetch user from database
  User.findById(request.session.userId, (error, user) => {
    if(error || !user) {
      return response.redirect('/')
    }
    next()
  })

}