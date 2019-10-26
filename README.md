# Hokage.js
Make API calls look good. A javascript library to encapsulate API calls.

## Installing
Using npm:
```
$ npm install hokage
```

## Usage
**Step 1:** Initialize
```
let hokage = new Hokage('https://jsonplaceholder.typicode.com')
```

**Step 2:** Add a method to the hokage instance
```
hokage.addMethod({
    name: 'listPosts',
    method: 'GET',
    path: '/posts',
})
```

**Step 3:** Make the API call
```
hokage.listPosts().then(resp => {
    console.log(resp)
}).catch(err => {
    console.log('err', err)
})
```

## Example
```
const Hokage = require('hokage')

async function main () {
    // STEP 1: Initialize
    let hokage = new Hokage('https://jsonplaceholder.typicode.com')

    // STEP 2: Name your API calls
    hokage.addMethod({
        name: 'listPosts',
        method: 'GET', // Default method is GET
        path: '/posts',
    })

    hokage.addMethod({
        name: 'createPost',
        method: 'POST',
        path: '/posts',
    })

    // STEP 3: Make API calls
    hokage.listPosts().then(resp => {
        console.log(resp) // use resp.body if you need only the body
    }).catch(err => {
        console.log('err', err)
    })

    // Using async/await
    const newPost = await hokage.createPost({
        title: 'foo',
        body: 'bar',
        userId: 1
    })
    console.log(newPost.body)
}
main()
```

## API
**new Hokage(baseUrl)**
```
let hokage = new Hokage('https://yourdoamin.tld')
```

**addMethod(opts)**
```
hokage.addMethod({
    name: String, // Name of the method to attach. (!Required)
    method: String, // HTTP method. (Default: 'GET')
    path: String, // URL endpoint. (!Required)
    headers: Object, // Headers to append to the request. (Optional)
})
```

**hokage.setHeaders(headers)**
```
hokage.setHeaders({
    'Authorization': 'Bearer token', // The headers will be added to the subsequent requests
})
```

**hokage.resetHeaders()**
```
hokage.resetHeaders() // Resets the headers object to default
```

## Note
I built this for my personal use, if you feel like any feature/improvement is required, then kindly let me know. Find me on twitter [@prasannamestha](https://twitter.com/prasannamestha)

## Contributing
Pull requests are welcome.
