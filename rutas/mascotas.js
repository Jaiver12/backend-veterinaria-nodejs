module.exports = function mascotasHandler({mascotas, duenos}) {
	return {
				get: (data, callback) => {
					if(data.indice){
						if(mascotas[data.indice]) {
							return callback(200, mascotas[data.indice]);
						}
						return callback(404, {mensaje: `Mascota con el indice ${data.indice} no encontrada`});
					}
					const consultaRelacion = mascotas.map((mascota)=>(
						{...mascota,
							dueno:{ ...duenos[mascota.dueno], id:mascota.dueno}
						}
					));
					callback(200, consultaRelacion);
				},

				post: (data, callback) => {
					mascotas.push(data.payload);
					callback(201, data.payload);
				},

				put: (data, callback) => {
					if(data.indice){
						if(mascotas[data.indice]) {
							mascotas[data.indice] = data.payload;
							return callback(200, mascotas[data.indice]);
						}
						return callback(404, {mensaje: `Mascota con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				},

				delete: (data, callback) => {
					if(data.indice){
						if(mascotas[data.indice]) {
							mascotas = mascotas.filter( (_mascota, indice) => indice != data.indice);
							return callback(204, {mensaje: 'Elemento Eliminado'});
						}
						return callback(404, {mensaje: `Mascota con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				}
			}
}