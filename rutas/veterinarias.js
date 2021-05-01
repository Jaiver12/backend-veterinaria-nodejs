module.exports = function veterinariasHandler(veterinarias) {
	return {
				get: (data, callback) => {
					if(data.indice){
						if(veterinarias[data.indice]) {
							return callback(200, veterinarias[data.indice]);
						}
						return callback(404, {mensaje: `Veterinari@ con el indice ${data.indice} no encontrada`});
					}
					callback(200, veterinarias);
				},

				post: (data, callback) => {
					veterinarias.push(data.payload);
					callback(201, data.payload);
				},

				put: (data, callback) => {
					if(data.indice){
						if(veterinarias[data.indice]) {
							veterinarias[data.indice] = data.payload;
							return callback(200, veterinarias[data.indice]);
						}
						return callback(404, {mensaje: `Veterinari@ con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				},

				delete: (data, callback) => {
					if(data.indice){
						if(veterinarias[data.indice]) {
							veterinarias = veterinarias.filter( (_veterinaria, indice) => indice != data.indice);
							return callback(204, {mensaje: 'Elemento Eliminado'});
						}
						return callback(404, {mensaje: `Veterinari@ con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				}
			}
}