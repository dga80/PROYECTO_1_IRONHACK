const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects-v2";

// Para conseguir los datos utilizamos el metodo fetch. El fetch nos permite descargar esos datos.
// El fetch nos devuelve una promesa, por lo tanto la debemos resolver para eso utilizamos (async await o then). Utilizaremos async await.
// Para transformar el response a json, utilizamos el metodo .json() el cual asignamos a la constante data. esto nos devuelve una promesa la cual tenemos que resolver (await). Ahora si data va a ser el resultado de la API.
// Como nos piden los proyectos mas recientes debemos ordenar el array, para eso utilizamos sort.
// Para tomar los tres primeros elementos del array utilizamos el metodo .slice().
async function fetchProjects() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const projects = data;
    const sortedProjects = projects.sort(function(a, b) {
        if (a.uuid < b.uuid) {
            return -1;
        }
        if (a.uuid < b.uuid) {
            return 1;
        }
        return 0;
    });
    const recentProjects = sortedProjects.slice(0, 3);
    console.log(recentProjects);
}

// El evento load nos indica que la pagina a sido totalemente cargada. Por lo tanto aqui dentro es un buen sitio para acceder a APIs porque esta cargado el contenido estatico y ahora cargamos el contenido dinamico.
window.addEventListener("load", function () {
    fetchProjects();
});




