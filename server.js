const express = require('express');
const app     = express();
const PORT    = 2080;

//middleware
app.use(express.static('public'));



//listener
app.listen(PORT, ()=> {
  console.log('listenin bruh');
})
