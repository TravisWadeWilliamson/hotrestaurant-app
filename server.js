const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const tables = [];
const waitList = [];

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/reservations', function (request, response) {
    response.sendFile(path.join(__dirname, 'index2.html'));
})
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/:file'), function(request, response) {
    const file = request.params.file;
    response.sendFile(path.join(__dirname, file))
}
app.get('/api/tables', function(request, response) {
    return response.json(tables)
})

app.get('/api/waitlist', function(request, response) {
    return response.json(waitList)
})


app.post('/api/reservations', function(request, response) {
    let reservationStatus;
    if (tables.length < 5) {
        tables.push(request.body);
        reservationStatus = 'Reserved';
    } else {
        waitList.push(request.body);
        reservationStatus = 'Waitlisted';
    }
    response.json(reservationStatus);
})

app.listen(PORT, function() {
    console.log('\x1b[32m','App listening on PORT ' + PORT);
})