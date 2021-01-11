const Post = require('../database/models/Post')
module.exports = async (request, response) => {
  const posts = await Post.find({}).populate('author')

console.log(posts.title + 'THIS IS POST TITLE')
console.log(JSON.stringify(request.session) + 'THIS IS REQ.SESSION')

    response.render('index', {
    // response.render('sidebar', {
    posts: posts
  })
}