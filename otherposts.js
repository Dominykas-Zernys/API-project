// URL SUTVARKYMAS

const queryParameters = window.location.search
const urlParameters = new URLSearchParams(queryParameters)
const userid = urlParameters.get('user_id')

// POSTU SUKURIMAS

fetch('https://jsonplaceholder.typicode.com/users/' + userid + '/posts')
    .then(res => res.json())
    .then(posts => {
        console.log(posts)
        posts.map(post => {
            const createPostWrapper = document.createElement('div')
            createPostWrapper.classList.add('post-wrapper')
            createPostWrapper.innerHTML =   `<a class="post-link" href="post.html?post_id=${post.id}">
                                                <div class="post-title-wrapper"><h3 class="post-title">${post.title}</h3><h4 class="post-id">${post.id}</h4></div>
                                                <p class="post-body">${post.body}</p>
                                            </a>`
            document.querySelector('#wrapper').append(createPostWrapper)                                 
        })
    
    // USERNAME PRIDEJIMAS PRIE PAGE HEADERIO
    
        fetch('https://jsonplaceholder.typicode.com/users/' + userid)
            .then(res => res.json())
            .then(user => {
        console.log(user)
            document.querySelector('#main-header').innerHTML += `<a href = "user.html?user_id=${user.id}">${user.name}</a>`})
})
