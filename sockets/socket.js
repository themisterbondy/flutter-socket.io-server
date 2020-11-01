const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand(new Band('Quemm'));
bands.addBand(new Band('U2'));
bands.addBand(new Band('Emine'));
bands.addBand(new Band('Metalica'));

console.log(bands);


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);

        io.emit('mensaje', { admin: 'Nuevo mensaje' });

    });

    client.on('emitir-mensaje', (payload) => {
        console.log(payload);
        client.broadcast.emit('nuevo-mesaje', payload);
    });

    client.on('vote-band', (payload) => {
        console.log(payload);
        //client.broadcast.emit('nuevo-mesaje', payload);
        bands.voteBand(payload.id);

        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log(payload);
        var newBand = new Band(payload.name)
        bands.addBand(newBand);

        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


});
