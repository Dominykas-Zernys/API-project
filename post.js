// URL SUTVARKYMAS

const queryParameters = window.location.search
const urlParameters = new URLSearchParams(queryParameters)
const postid = urlParameters.get('post_id')

// POSTO SUKURIMAS

fetch('https://jsonplaceholder.typicode.com/posts/' + postid)
    .then(res=>res.json())
    .then(post=>{
        document.querySelector('#post-title').textContent = post.title
        document.querySelector('#post-body').textContent = post.body
        
        //POSTO AUTORIAUS PRISKYRIMAS

        fetch('https://jsonplaceholder.typicode.com/users/' + post.userId)
            .then(res=>res.json())
            .then(user=>{document.querySelector('#post-author').textContent = user.username + ' (' + user.name + ')'})

        document.querySelector('#author-link').href = '/user.html?user_id=' + post.userId

        // POSTO KOMENTARU PRIDEJIMAS

        fetch('https://jsonplaceholder.typicode.com/posts/' + postid + '/comments')
            .then(res=>res.json())
            .then(comments=>{comments.map(comment => {console.log(comment)
                const createOneComment = document.createElement('div')
                createOneComment.classList.add('comment-wrapper')
                createOneComment.innerHTML = `
                <h4 class="comment-title">${comment.name}</h4>
                <p class="comment-content">${comment.body}</p>
                <div class="comment-email-wrapper"><a href="" class="comment-email">${comment.email}</a></div>`
                document.querySelector('#post-comments').append(createOneComment)
            })})

        // NUKREIPIMAS I KITUS USERIO POSTUS

        document.querySelector('#other-posts-link').href = 'otherposts.html?user_id=' + post.userId

    })