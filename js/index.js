const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects-v2";

// Para conseguir los datos de una API utilizamos el metodo fetch. El fetch nos permite descargar dichos datos.
// El fetch nos devuelve una promesa, y como tal la debemos resolver. Para resolver una promesa utilizamos (async await o then). Utilizaremos async await.
// Para transformar el response a json, utilizamos el metodo .json() el cual se lo asignamos (lo guardamos en) a la constante data. Esto nos devuelve una promesa la cual tenemos que resolver (await). Ahora si data va a ser el resultado de la API.
async function fetchProjects() {
    // FETCH
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};

// Como nos piden los proyectos mas recientes debemos ordenar el array, para eso utilizamos el metodo sort y lo asignamos a la constante sortedProjects.
async function loadProjects() {
    const projects = await fetchProjects();
    const sortedProjects = projects.sort(function(projectA, projectB) {
        if (projectA.uuid < projectB.uuid) {
            return -1;
        }
        if (projectA.uuid < projectB.uuid) {
            return 1;
        }
        return 0;
    });
    
    // Para tomar los tres primeros elementos del array utilizamos el metodo .slice() y lo asignamos a la constante recentProjects.
    const recentProjects = sortedProjects.slice(0, 3);

    // b)Para poder renderizar los proyectos mas recientes recorreremos el array recentProjects, pues en caso de que haya menos de tres arrays nuestra pagina no será inestable (solo renderizará la cantidad de proyectos que haya). Para recorrer el array utilizaremos el metodo .forEach().
    // a)Previo a esto debemos seleccionar el elemento que contiene a los tres proyectos y los asignamos a la constante divProyects. 

    // a)
    const divOfProjects = document.getElementById("proyectsID")

    // b)
    recentProjects.forEach(function(project) {
        const divProject = `
            <article class="projects-article">
                <img
                src="${project.image}"
                alt="project section image ${project.uuid}"
                />
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                <a class="learn-more" href="/projects.html?uuid=${project.uuid}">Learn more</a>
            </article>
        `
        divOfProjects.innerHTML += divProject;
    })
}

// EVENTS
// El evento load nos indica que la pagina a sido totalemente cargada. Por lo tanto aqui dentro es un buen sitio para acceder a APIs porque esta cargado el contenido estatico y ahora cargamos el contenido dinamico.
window.addEventListener("load", function () {
    loadProjects();
});




