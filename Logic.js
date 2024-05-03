async function getdata(url) {
    //Funcion para consultar la API
      try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
      } catch (error) {
        console.error(`fallo la consulta a la api: ${error}`);
      }
  }

  function VerificacionEnter(evento){//Funcion que permite hacer busquedad con enter
    if(evento.keyCode === 13){
      buscar();
    }
  }
  async function buscar(){//Funcion que evalua si la busquedad esta correcta y la ejecuta
    const entrada = document.getElementById("in1");
    const error = document.querySelector(".containerError"); 
    if (entrada.value.trim() === "") {
        console.log(error);
        entrada.value = "";
        error.style.display = "block";
    }
    else{
        const url = "https://pokeapi.co/api/v2/pokemon/"+entrada.value;
        try{
          const respuesta = await getdata(url);
          if(respuesta == null){
            entrada.value = "";
            error.style.display = "block";
          }
          else{
            entrada.value = "";
            InfoPokemon(respuesta);
          }
        }
        catch(error){
          console.error(`fallo la consulta a la api: ${error}`);
        }
      }
  }
  let NombrePokemon;
  let respuesta2;
  let respuesta3;

  function InfoPokemon(respuesta){
    NombrePokemon = "";
    respuesta2 = "";
    respuesta3 = "";
    const DisplayEvolucionar = document.querySelector(".containerEvolution");
    DisplayEvolucionar.style.display = "none";
    const error = document.querySelector(".containerError");
    error.style.display = "none";

    const informacion = document.querySelector(".containerInfo");
    informacion.style.display = "flex";

    const Nombre = document.querySelector(".pokemonName");
    Nombre.textContent = respuesta.species.name;
    console.log(Nombre.textContent)

    const imagen = document.querySelector(".pokemonImg");
    imagen.src = respuesta.sprites.front_default;

    const tipo = document.querySelector(".pokemonType");
    for(let NombreTipo of respuesta.types){
        tipo.textContent += NombreTipo.type.name;
        if (NombreTipo !== respuesta.types[respuesta.types.length - 1]) {
            tipo.textContent += ', ';
        }
    }
    const habilidades = document.querySelector(".pokemonAbilities");
    for(let NombreHabilidad of respuesta.abilities){
        habilidades.textContent += NombreHabilidad.ability.name;
        if (NombreHabilidad !== respuesta.abilities[respuesta.abilities.length - 1]) {
            habilidades.textContent += ', ';
        }
    }
    Descripcion(respuesta.species.url, Nombre.textContent);
  }
  async function Descripcion(url, nombre){
    respuesta2 = "";
    respuesta3 = "";
    try{
        respuesta2 = await getdata(url);
        const Detalles = document.querySelector(".pokemonDescrition");
        Detalles.textContent = respuesta2.flavor_text_entries[26].flavor_text;
        
        Evolucion(respuesta2.evolution_chain.url, nombre)
    }
    catch(error){
        console.error(`fallo la consulta a la api: ${error}`);
    }

  }
  async function Evolucion(url, nombre){
    respuesta2 = "";
    respuesta3 = "";
    let NombreEvolucion = "";
    try{
        respuesta3 = await getdata(url);
        console.log(respuesta3.chain.evolves_to);
        if(respuesta3.chain.evolves_to.length == 1){

        }
    }
    catch(error){
        console.error(`fallo la consulta a la api: ${error}`);
    }

  }