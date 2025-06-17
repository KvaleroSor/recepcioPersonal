import { idState } from "../obj/idState";

const udatingDataComercialJsonFile = async (values) => {
    const comercial = values;
    const fechaRegistrada = new Date();

    const obj_comercial = {
        id: idState.idComercial,
        nombre: comercial.nombre,
        empresa: comercial.empresa,
        personaImasd: comercial.personaImasd,
        fecha: fechaRegistrada.toLocaleTimeString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    };
    try {
        const response = await fetch(`http://localhost:3000/comerciales/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj_comercial),
        });

        // Hacer esta función async para poder usar await response.text()
        if (!response.ok) {
            const errorText = await response.text(); // Obtener el texto del error del servidor
            throw new Error(
                `HTTP error! status: ${response.status}, message: ${errorText}`
            );
        }

        const data = await response.json();
        console.log(`Comercial actualizado --> ${JSON.stringify(data)}`);
        return data;
    } catch (error) {
        console.error(`Error --> ${error}`);
    }
};

export default udatingDataComercialJsonFile;
