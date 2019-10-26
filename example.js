const Hokage = require('./index')

async function main () {
    let hokage = new Hokage('https://jsonplaceholder.typicode.com')

    hokage.addMethod({
        name: 'createPost',
        method: 'POST',
        path: '/posts',
    })

    hokage.addMethod({
        name: 'listPosts',
        method: 'GET', // Default method is GET
        path: '/posts',
    })

    hokage.listPosts().then(resp => {
        console.log(resp) // use resp.body if you need only the body
    }).catch(err => {
        console.log('err', err)
    })

    const newPost = await hokage.createPost({
        title: 'foo',
        body: 'bar',
        userId: 1
    })
    console.log('===')
    console.log(newPost.body)
}

main()
