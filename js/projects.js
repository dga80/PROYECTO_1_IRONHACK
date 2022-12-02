const API_URL = "https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects-v2";


async function fetchProjects() {
  // FETCH
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};


async function loadProjectPage(uuid) {
    const projects = await fetchProjects();
    
    const filteredProject = projects.filter(function(project){ 
        if (project.uuid === uuid){
            return true;
        }
        return false;
    }); 
    if (filteredProject.length === 0) {
      window.location.replace("./404.html");
    }
    const divProjectOpen = document.getElementById("projectOpenID")
    
    const divProject = `
    <h3 class = "project-title1">${filteredProject[0].name}</h3>
    <div class="text_container flex">
      <h5>${filteredProject[0].description}</h5>
      <p><b>Completed on</b> ${filteredProject[0].completed_on}</p>
    </div>
    <img
      src="${filteredProject[0].image}"
      alt="Project${filteredProject[0].uuid}-background-image"
    />
    <p>${filteredProject[0].content}</p>
    `
    divProjectOpen.innerHTML += divProject;
}

async function loadProjectsRandom(uuid) {
  const projects = await fetchProjects();
  const sortedProjectsRandom = projects.sort(function() {
      if (Math.random() > 0.5) {
        return -1;
      }
      return 1;
    });
    console.log(sortedProjectsRandom)
  
  const  filteredProjectsRandom = sortedProjectsRandom.filter(function(project){ 
    if (project.uuid !== uuid){
        return true;
    }
    return false;
}); 
  // Para tomar los tres primeros elementos del array utilizamos el metodo .slice() y lo asignamos a la constante recentProjects.
  const otherProjects = filteredProjectsRandom.slice(0, 3);

  // b)Para poder renderizar los proyectos mas recientes recorreremos el array recentProjects, pues en caso de que haya menos de tres arrays nuestra pagina no será inestable (solo renderizará la cantidad de proyectos que haya). Para recorrer el array utilizaremos el metodo .forEach().
  // a)Previo a esto debemos seleccionar el elemento que contiene a los tres proyectos y los asignamos a la constante divProyects. 

  // a)
  const divOtherProjects = document.getElementById("otherProyectsID")

  // b)
  otherProjects.forEach(function(project) {
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
      divOtherProjects.innerHTML += divProject;
  })
}

// Con URLSearchParams(this.window.location.search) accedemos a la barra de navegacion y lo asignamos a params.
// Con params.get("uuid") buscamos la parte en la URL luego de ? que contiene nombre uuid y otenemos dicho valor el cual asignamos a id. 
window.addEventListener("load", function () {
  const params = new URLSearchParams(this.window.location.search);
  const id = params.get("uuid");
  loadProjectPage(id);
  loadProjectsRandom(id);
});





