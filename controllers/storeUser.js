const User = require('../database/models/User')

module.exports = (request, response) => {
  User.create(request.body, (error, user) => {
    if(error) {
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
      // console.log(Object.keys(error.errors).map(key => error.errors[key].message))
      request.flash('registrationErrors', registrationErrors)
      request.flash('data', request.body)

      return response.redirect('/auth/register')
    }
    response.redirect('/')
  })
}
