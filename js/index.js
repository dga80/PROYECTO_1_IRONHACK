const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects-v2";

// Para conseguir los datos de una API utilizamos el metodo fetch. El fetch nos permite descargar dichos datos.
// El fetch nos devuelve una promesa, por lo tanto la debemos resolver, para eso utilizamos (async await o then). Utilizaremos async await.
// Para transformar el response a json, utilizamos el metodo .json() el cual asignamos a la constante data. esto nos devuelve una promesa la cual tenemos que resolver (await). Ahora si data va a ser el resultado de la API.
// Como nos piden los proyectos mas recientes debemos ordenar el array, para eso utilizamos el metodo sort y lo asignamos a la constante sortedProjects.
// Para tomar los tres primeros elementos del array utilizamos el metodo .slice() y lo asignamos a la constante recentProjects.
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

    // Para poder renderizar los proyectos mas recientes recorreremos el array recentProjects, pues en caso de que haya menos de tres arrays nuestra pagina no será inestable (solo renderizará la cantidad de proyectos que haya). Para recorrer el array utilizaremos el metodo .forEach().
    // Previo a esto debemos seleccionar el elemento que contiene a los tres proyectos y los asignamos a la constante divProyects. 

    const divProyects = document.querySelector(".projects")

    recentProjects.forEach(function(project) {
        const div = `
            <article class="projects-article">
                <img
                src="${project.image}"
                alt="project section image ${project.uuid}"
                />
                <h4>${project.name}</h4>
                <p>${project.content}</p>
                <a class="learn-more" href="../projects.html?uuid=${project.uuid}">Learn more</a>
            </article>
        `
        divProyects.innerHTML += div;
    })
}

// El evento load nos indica que la pagina a sido totalemente cargada. Por lo tanto aqui dentro es un buen sitio para acceder a APIs porque esta cargado el contenido estatico y ahora cargamos el contenido dinamico.
window.addEventListener("load", function () {
    fetchProjects();
});




