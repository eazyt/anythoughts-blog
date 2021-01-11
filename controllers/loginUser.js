const bcrypt = require('bcrypt')
const User = require('../database/models/User')


module.exports = (request, response) => {
  const { email, password } = request.body;

  // try to find user
  User.findOne({ email: email }, (error, user) => {
    console.log(user + 'THIS IS USER')
    console.log(error + 'THIS IS ERROR')
    if(user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if(same) {
          request.session.userId = user._id
          response.redirect('/')
          
        } else {
          response.redirect('/auth/login')
        }
      })
    } else {
      return response.redirect('/auth/login')
    }
  })
}