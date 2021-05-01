const http = require('http');
const requestHandler = require('./request-handler');

const server = http.createServer(requestHandler);

server.listen(5000, () => {
	console.log('Servidor Conectado en el puerto http://localhost:5000');
});