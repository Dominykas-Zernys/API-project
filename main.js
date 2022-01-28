fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => 
        {data.map(post => {

        // VIENO POST'O SUKURIMAS

        let createPostWrapper = document.createElement('div')
        createPostWrapper.classList.add(`post-wrapper-${post.id}`)
        createPostWrapper.classList.add(`post-wrapper`)
        createPostWrapper.classList.add(`wrapper`)
        createPostWrapper.innerHTML =     
            `<h3 class="post-title">${post.title.toUpperCase()}</h3>
            <p class="post-content">${post.body}</p>
            <div class="post-author-wrapper"><a href="user.html?user_id=${post.userId}" class="post-author author-no-${post.userId}"></a></div>
            <div class="comment-button-wrapper"><button class="comment-button">Show Comments</button></div>`
        document.getElementById('wrapper').append(createPostWrapper)
        }
    )

    // USERNAME SUKURIMAS IR PRIDEJIMAS

    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => {
        data.map(user => {
            document.querySelectorAll(`.author-no-${user.id}`).forEach(authorElement => authorElement.textContent = user.name)
        })})

    // KOMENTARU SUKURIMAS IR PRIDEJIMAS


    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(res => res.json())
        .then(data => {if (data.length > 0){
        data.forEach(comment => {
        const createCommentWrapper = document.createElement('div')
        createCommentWrapper.classList.add(`comment-wrapper`)
        createCommentWrapper.innerHTML = `
        <h4 class="comment-title">${comment.name}</h4>
        <p class="comment-content">${comment.body}</p>
        <div class="comment-email-wrapper"><a href="" class="comment-email">${comment.email}</a></div>` 
        
        document.querySelectorAll(`.post-wrapper-${comment.postId}`).forEach(wrapper => wrapper.append(createCommentWrapper))
        
    })}})
    })

    // ALBUMU PRIDEJIMAS 

    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(res => res.json())
        .then(albums => albums.map(album=>{
        const createAlbumWrapper =  document.createElement('div')
        createAlbumWrapper.classList.add('album-wrapper')
        createAlbumWrapper.innerHTML = `
        <h3 class="album-title-${album.userId}"></h3>
        <div><a href="/album.html?album_id=${album.id}"><h3>${album.title}</h3></a></div>
        <div><img></div>
        `
        document.querySelector('#albums-wrapper').append(createAlbumWrapper)

            fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
                .then(res => res.json())
                .then(authors => document.querySelectorAll(`.album-title-${album.userId}`).forEach(albumTitle => albumTitle.textContent = authors.name))
    }))
