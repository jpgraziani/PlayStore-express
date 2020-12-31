//create basic server with express and morgan
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

//-------------------------------------------------------------------------
//get the playlist
const playlists = require('./playlist-data.js');
//-------------------------------------------------------------------------

app.get('/apps', (req, res) => {
  const genresList = [
    'Action',
    'Puzzle',
    'Strategy',
    'Casual',
    'Arcade',
    'Card'
  ];
  let data = playlists;
  const { sort, genres } = req.query;
//-------------------------------------------------------------------------
//sort by rating or app
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('Sorry must be one of rating or app');
    }
  }

  if (sort === 'app') {
    data.sort((a, b) => {
      return a['App'].toLowerCase() > b['App'].toLowerCase()
        ? 1
        : a['App'].toLowerCase() < b['App'].toLowerCase()
        ? -1
        : 0;
    });
  } else if (sort === 'rating') {
    data.sort((a, b) => {
      return a['Rating'] - b['Rating'];
    });
  }

//-------------------------------------------------------------------------
//sort by genres

if (genres) {
  if (genresList.includes(genres)) {
    data = data.filter(element => {
      return element.Genres.toLowerCase() === genres.toLowerCase();
    });
  } else {
    res.status(404).send('You must supply a valid genre');
  }
}

//-------------------------------------------------------------------------
data.forEach(element => {
  // console.log(element.Rating);
  console.log(element.App);
});

res.json(data)
});


//---------------------------------
app.listen(8000, () => {
  console.log('Server started on PORT 8000')
});

