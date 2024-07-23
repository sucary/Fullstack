

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

const mostBlogs = blogs => {
    const authorMap = new Map()

    blogs.map(blog => {
        const author = blog.author
        if (authorMap.has(author)) {
            authorMap.set(author, authorMap.get(author) + 1)
        } else {
            authorMap.set(author, 1)
        }
    })

    let maxBlogs = 0
    let maxAuthor = ''

    authorMap.forEach((blogCount, author) => {
        if (blogCount > maxBlogs) {
            maxBlogs = blogCount
            maxAuthor = author
        }
    })

    return {
        author: maxAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = blogs => {
    const authorMap = new Map()

    blogs.map(blog => {
        const author = blog.author
        const likes = blog.likes
        if (authorMap.has(author)) {
            authorMap.set(author, authorMap.get(author) + likes)
        } else {
            authorMap.set(author, likes)
        }
    })

    let maxLikes = 0
    let maxAuthor = ''

    authorMap.forEach((likeCount, author) => {
        if (likeCount > maxLikes) {
            maxLikes = likeCount
            maxAuthor = author
        }
    })

    return {
        author: maxAuthor,
        likes: maxLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}