module.exports = (request, response) => {
  request.session.destroy(() => {
    console.log('going home')
    response.redirect('/')
  })
}