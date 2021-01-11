module.exports = (request, response) => {
  console.log(request.session.registrationErrors + 'REGISTRATION ERRORS')
  response.render('register', {
    errors: request.session.registrationErrors,
    errors: request.flash('registrationErrors'),
    data: request.flash('data')[0]
  })
}