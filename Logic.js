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

  function InfoPokemon(respuesta){
    console.log(respuesta);
    const informacion = document.querySelector(".containerInfo");
    informacion.style.display = "flex";

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
  }