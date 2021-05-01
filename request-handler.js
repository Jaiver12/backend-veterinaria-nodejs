const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');

module.exports = (req, res) => {
	// 1. obtener url desde el objeto request
	const urlActual = req.url;
	const urlParseada = url.parse(urlActual, true);
	// 2. obtener la ruta
	const ruta = urlParseada.pathname;
	// 3. limpiar ruta
	const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
	// 3.1 obtener el metodo desde el request
	const metodo = req.method.toLowerCase();
	// dar permisos de CORS
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OBTIONS, GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "*");

	if(metodo == 'options')
	{
		res.writeHead(200);
		res.end();
		return;
	}

	//3.2 obtener el query del request
	const { query = {} } = urlParseada;
	// 3.3 obtener los header del request
	const { headers = {} } = req;
	// 3.4 obtener peyload en el caso de aver uno
	const decoder = new StringDecoder('utf-8');
	let buffer = '';
	req.on('data', (data) => {
		buffer += decoder.write(data);
	});

	req.on('end', () => {
		buffer += decoder.end();

		if(headers["content-type"] === 'application/json') {
			buffer = JSON.parse(buffer);
		}
		// Revisar si tiene subrutas
		if(rutaLimpia.indexOf("/") > -1) {
			var [rutaPrincipal, indice] = rutaLimpia.split("/");
		}
		// 3.5 ordenar la data del request
		const data = {
			indice,
			ruta: rutaPrincipal || rutaLimpia,
			query,
			metodo,
			headers,
			payload: buffer,
		};
		console.log({ data });
		// 3.6 elegir el manejador dependiendo de la ruta
		let handler;
		if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]) {
			handler = enrutador[data.ruta][metodo];
		} else {
			handler = enrutador.noEncontrado;
		}
		// 4. ejecutar el handler
		if(typeof handler === 'function') {
			handler(data, (statusCode = 200, mensaje) => {
				const respuesta = JSON.stringify(mensaje);
				res.setHeader("Content-Type", "application/json");
				res.writeHead(statusCode);
				// Linea en donde estamos respondiendo a la aplicacion del cliente
				res.end(respuesta);
			})
		}
	});
};