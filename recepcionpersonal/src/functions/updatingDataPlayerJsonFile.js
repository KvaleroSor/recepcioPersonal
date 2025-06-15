const updatingDataPlayerJsonFile = async (repartidor) => {
    const  fechaRegistrada = new Date();

    const obj_repartidor = {
        id: repartidor.id,
        nombre: repartidor.nombre,
        fecha: `${fechaRegistrada.toLocaleTimeString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}`,
    };

    fetch(`http://localhost:3000/repartidores/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj_repartidor),
    })
        .then(async (response) => {
            // Hacer esta función async para poder usar await response.text()
            if (!response.ok) {
                const errorText = await response.text(); // Obtener el texto del error del servidor
                throw new Error(
                    `HTTP error! status: ${response.status}, message: ${errorText}`
                );
            }
            // Si la respuesta es OK pero está vacía (ej. un POST exitoso que devuelve 201 Created sin cuerpo)
            // response.json() fallaría. Comprobamos el content-type o si hay contenido.
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            } else {
                return {}; // O null, o un objeto que indique éxito sin datos
            }
        })
        .then((data) => console.log(`Actualizado --> ${data}`))
        .catch((error) => console.error(`Error --> ${error}`));
};

export default updatingDataPlayerJsonFile;
