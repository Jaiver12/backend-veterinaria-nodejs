module.exports =  {
	mascotas: [
				{
					tipo: "Perro",
					nombre: "Dukesa",
					dueno: "Yolimar"
				},
				{
					tipo: "Gato",
					nombre: "Jefesita",
					dueno: "Jose"
				},
				{
					tipo: "Perro",
					nombre: "Rudolf",
					dueno: "Jaiver"
				},
				{
					tipo: "Gato",
					nombre: "Jefesita",
					dueno: "Jose"
				}
			],

	veterinarias: [
				{
					nombre: "jose",
					apellido: "manuel",
					dni: "123551",
					pais: "Venezuela"
				},
				{
					nombre: "jorge",
					apellido: "peres",
					dni: "346346346",
					pais: "peru"
				}
			],

	duenos: [
		{
			nombre: "yoli",
			apellido: "manuel",
			dni: "123551",
			pais: "Venezuela"
		},
		{
			nombre: "pedro",
			apellido: "peres",
			dni: "346346346",
			pais: "peru"
		}
	],

	consultas: [
		{
			mascota: 0,
			veterinaria: 0,
			historia: 'esta es la historia',
			diagnostico: 'esta es el diagnostico',
			fechaCreacion: new Date(),
			fechaEdicion: new Date()
		}
	],
}