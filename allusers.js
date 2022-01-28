//USERIU PAVAIZDAVIMAS EKRANE

fetch('https://jsonplaceholder.typicode.com/users/')
    .then(res=>res.json())
    .then(users => {
        users.map(user=>{
            fetch('https://jsonplaceholder.typicode.com/users/' + user.id + '/posts')
                .then(res=>res.json())
                .then(posts => {
                    const postCount = posts.length
                    const createUserWrapper = document.createElement('div')
                    createUserWrapper.classList.add('user-wrapper')

                    const createUserLink = document.createElement('a')
                    createUserLink.classList.add('user-link')
                    createUserLink.href = '/user.html?user_id=' + user.id
                    createUserLink.innerHTML = `<h2>${user.name} (${postCount})</h2>`
                    createUserWrapper.append(createUserLink)
                    document.querySelector('#wrapper').append(createUserWrapper)
                    
        })
    })})