module.exports = function consultasHandler({consultas, mascotas, veterinarias}) {
	return {
				get: (data, callback) => {
					if(data.indice){
						if(consultas[data.indice]) {
							return callback(200, consultas[data.indice]);
						}
						return callback(404, {mensaje: `consultas con el indice ${data.indice} no encontrada`});
					}
					const consultaRelacion = consultas.map((consulta)=>(
						{...consulta,
							mascota: { ...mascotas[consulta.mascota], id:consulta.mascota},
							veterinaria:{ ...veterinarias[consulta.veterinaria], id:consulta.veterinaria}
						}
					));
					callback(200, consultaRelacion);
				},

				post: (data, callback) => {
					let nuevaConsulta = data.payload;
					nuevaConsulta.fechaCreacion = new Date();
					nuevaConsulta.fechaEdicion = null;
					consultas = [...consultas, nuevaConsulta ];
					callback(201, nuevaConsulta);
				},

				put: (data, callback) => {
					if(data.indice){
						if(consultas[data.indice]) {
							let { fechaCreacion } = consultas[data.indice];
							consultas[data.indice] = {...data.payload, fechaCreacion, fechaEdicion: new Date()};
							return callback(200, consultas[data.indice]);
						}
						return callback(404, {mensaje: `consultas con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				},

				delete: (data, callback) => {
					if(data.indice){
						if(consultas[data.indice]) {
							consultas = consultas.filter( (_consulta, indice) => indice != data.indice);
							return callback(204, {mensaje: 'Elemento Eliminado'});
						}
						return callback(404, {mensaje: `consultas con el indice ${data.indice} no encontrada`});
					}
					callback(400, {mensaje: 'indice no enviado'});
				}
			}
}