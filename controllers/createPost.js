module.exports = (request, response) => {
  if(request.session.userId) {
  
    return response.render('create')
  } else {
    response.redirect('/auth/login')
  }
 
}