// ALBUMU SUKURIMAS

fetch('https://jsonplaceholder.typicode.com/albums/')
    .then(res=>res.json())
    .then(albums=>albums.map(album=>{
        console.log(album)
        const createAlbumWrapper = document.createElement('div')
        createAlbumWrapper.classList.add('album-wrapper')

        const createAlbumLink = document.createElement('a')
        createAlbumLink.classList.add('album-link')
        createAlbumLink.href = 'album.html?album_id=' + album.id

        const createAlbumTitle = document.createElement('h3')
        createAlbumTitle.classList.add('album-title')
        createAlbumTitle.textContent = album.title
        const createAlbumAuthor = document.createElement('h4')
        createAlbumAuthor.classList.add('album-author')

        fetch('https://jsonplaceholder.typicode.com/users/' + album.userId)
            .then(res=>res.json())
            .then(user => createAlbumAuthor.textContent = user.name)


        const createAlbumImageWrapper = document.createElement('div')
        createAlbumImageWrapper.classList.add('album-thumbnail-wrapper')
        const createAlbumImage = document.createElement('img')
        createAlbumImage.classList.add('album-thumbnail')

        fetch('https://jsonplaceholder.typicode.com/albums/' + album.id + '/photos')
            .then(res=>res.json())
            .then(photos => {createAlbumTitle.innerHTML += `<span class = "photos-amount"> (${photos.length})</span>
            `
            createAlbumImage.src = photos[0].thumbnailUrl

        })

        createAlbumImage
        createAlbumImageWrapper.append(createAlbumImage)
        createAlbumLink.append(createAlbumTitle, createAlbumAuthor, createAlbumImageWrapper)
        createAlbumWrapper.append(createAlbumLink)
        document.querySelector('#albums-wrapper').append(createAlbumWrapper)
    }))
