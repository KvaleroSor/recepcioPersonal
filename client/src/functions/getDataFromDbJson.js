const getDataFromDbJson = () => {
    return fetch("http://localhost:3000/comerciales")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(
                `Error al obtener los datos de comerciales --> ${error}`
            );
            return [];
        });
};

export default getDataFromDbJson;
