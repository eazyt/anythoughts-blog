module.exports = (request, response, next) => {
  if(!request.files.image || !request.body.title || !request.body.subtitle || !request.body.content){
    return response.redirect('/posts/new')
  }
  next()
}