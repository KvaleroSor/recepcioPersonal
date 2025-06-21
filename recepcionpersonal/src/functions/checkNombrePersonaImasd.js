import personalImasd from "../obj/dataPersonalImasd";
import stringSimilarity from "string-similarity";

const checkNombrePersonaImasd = (nombreIntroducido) => {
    console.log(`[1] Función recibe: '${nombreIntroducido}'`);

    // Paso 1: Normalizar. Convertimos la entrada y la lista a minúsculas y sin espacios.
    const nombreNormalizado = nombreIntroducido.toLowerCase().trim();
    const nombresPersonalNormalizados = personalImasd.map((p) => p.nombre.toLowerCase().trim());
    console.log(`[2] Buscando '${nombreNormalizado}' en la lista:`, nombresPersonalNormalizados);

    // Paso 2: Buscar la coincidencia usando los datos ya limpios.
    const matches = stringSimilarity.findBestMatch(
        nombreNormalizado,
        nombresPersonalNormalizados
    );
    console.log("[3] Resultado de la búsqueda:", matches);

    // Paso 3: Usar el ÍNDICE para encontrar a la persona en la lista ORIGINAL.
    // Este es el paso clave que evita todos los errores de comparación.
    const personaEncontrada = personalImasd[matches.bestMatchIndex];
    console.log("[4] Persona encontrada con el índice:", personaEncontrada);

    // Paso 4: Devolver el número de teléfono, o null si no se encontró nada.
    if (!personaEncontrada) {
        console.error(`ERROR: No se encontró coincidencia para '${nombreIntroducido}'`);
        return null;
    }
    console.log(`Teléfono de la persona encontrada --> ${personaEncontrada.telefono}`);

    return personaEncontrada.telefono;
};

export default checkNombrePersonaImasd;
