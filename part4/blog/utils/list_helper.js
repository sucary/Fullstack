

const dummy = () => {
    return 1
}

const totalLikes = blogs => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog = blogs => {
    return blogs.reduce((favorite, current) => {
        return current.likes > favorite.likes ? current : favorite
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}