// URL SUTVARKYMAS

const queryParameters = window.location.search
const urlParameters = new URLSearchParams(queryParameters)
const userid = urlParameters.get('user_id')

console.log(userid)

fetch('https://jsonplaceholder.typicode.com/users/' + userid)
    .then(res => res.json())
    .then(data => {

        // Teksto priskyrimas prie atitinkamu elementu pavaizdavimui ekrane

        document.querySelector('#full-name').textContent = data.name
        document.querySelector('#user-name').textContent = data.username
        document.querySelector('#email').textContent = data.email
        document.querySelector('#email').href = `mailto:${data.email}`
        document.querySelector('#street').textContent = data.address.street
        document.querySelector('#house-number').textContent = data.address.suite
        document.querySelector('#city').textContent = data.address.city
        document.querySelector('#post-code').textContent = data.address.zipcode
        document.querySelector('#address-link').href = `https://www.google.com/maps/search/?api=1&query=${data.address.geo.lat}%2C${data.address.geo.lng}`
        document.querySelector('#phone-number').textContent = data.phone
        document.querySelector('#phone-number').href =  'Tel: ' + data.phone
        document.querySelector('#website-link').textContent = data.website
        document.querySelector('#website-link').href = 'https://' + data.website
        document.querySelector('#company-name').textContent = data.company.name

        // Vartotojo postu issitraukimas

            fetch('https://jsonplaceholder.typicode.com/users/' + userid + '/posts')
                .then(res => res.json())
                .then(posts => posts.map(post => {
                    if(post.userId == data.id)
                    {
                        const createPostWrapper = document.createElement('div')
                        createPostWrapper.classList.add('post-wrapper')
                        createPostWrapper.innerHTML = `<a href="" class="post-link"><h3 class="post-title">${post.title}</h3><p class="post-body">${post.body}</p></a>`
                        document.querySelector('#posts').append(createPostWrapper)
                    }
                }))

        // Vartotojo albumu issitraukimas

                fetch('https://jsonplaceholder.typicode.com/users/'+userid+'/albums')
                    .then(res => res.json())
                    .then(albums => albums.map(album => {
                        const createAlbumWrapper = document.createElement('div')
                        createAlbumWrapper.classList.add('album-wrapper')
                        createAlbumWrapper.innerHTML = `<a href="/album.html?album_id=${album.id}" class="album-link"><h3 class="album-title">${album.title}</h3></a>`
                        document.querySelector('#photo-albums').append(createAlbumWrapper)
                    }))

    })

