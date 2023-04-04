//const iTunes_url = 'https://itunes.apple.com/search?term=indie&entity=song';
const btnSearch = document.querySelector('.btn');
const songList = document.querySelector('#songList');
const searchSong = document.querySelector('#searchSong');
const loader = document.querySelector('#loader');

const getData = (url, method = 'GET') => {
    return fetch(url, {
        method: method,
    })
        .then((response) => response.json())
        .then((data) => {
            show(data.results);
            loader.classList.add('loader-hidden');
        })
        .catch((error) => console.error(error));
};

const show = (data) => {
    if (data.length > 0) {
        let input = '';

        for (const element of data) {
            input += `<tr><td>${element.artistName}</td><td>${element.collectionName}</td><td><audio controls src="${element.previewUrl}"></audio></td></tr>`;
        }

        songList.innerHTML = input;
        return;
    }
    songList.innerHTML = `Nema rezultata`;
};

const showSongs = (e) => {
    e.preventDefault();

    if (!searchSong.value) {
        alert('You have to type a song or artist name');
        return;
    }

    const url = `https://itunes.apple.com/search?term=${searchSong.value}&entity=song`;

    getData(url);

    loader.classList.remove('loader-hidden');
};

const showSongsWithEnterKey = (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
        showSongs(e);
    }
};

btnSearch.addEventListener('click', showSongs);
searchSong.addEventListener('keyup', showSongsWithEnterKey);
