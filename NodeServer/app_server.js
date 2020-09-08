const express = require('express');
const path = require('path');

const app = express();
const apiPort = 9000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
 });
app.listen(apiPort, () => console.log(`App server running on port ${apiPort}`));
