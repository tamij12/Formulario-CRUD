const URL_FIREBASE = 'https://js-tania-default-rtdb.firebaseio.com/';
// const listPerson = [];
const container = document.querySelector('#list-person');


const deletePersona = async(id) => {
  console.log(id)
  const url = URL_FIREBASE + id + '.json'
  const deleted = await fetch(url, {
      method: 'DELETE'
  });
  if(deleted.status === 200) {
      getInfo();
  };
};

const personaCreate = (persona, index) => {
  const buttonDelete = document.createElement("button");
  buttonDelete.className = "btn btn-outline-danger";
  buttonDelete.textContent = "Delete";
  buttonDelete.dataset.persona = persona.id;

  buttonDelete.addEventListener("click", (event) => {
    const elementToRemove = event.target.dataset.persona;
    deletePersona(elementToRemove);
    // listPerson.splice(Number(elementToRemove), 1);
      // cleanList();
    // showPersona(listPerson);
  });

  const buttonEdit = document.createElement("button");
  buttonEdit.className = "btn btn-outline-success";
  buttonEdit.textContent = "Edit";
  buttonEdit.dataset.persona = persona.id;

  buttonEdit.addEventListener("click", (event) => {
    const elementToEdit = event.target.dataset.persona;
    window.location.href = 'http://127.0.0.1:5500/update/edit.html/?id=' + elementToEdit;
  });


  const h5Title = document.createElement("h5");
  h5Title.className = "card-title";
  h5Title.textContent = persona.nombre;

  const pApellido = document.createElement("p");
  pApellido.className = "card-text";
  pApellido.textContent = persona.apellido;

  const pFechaNacimiento = document.createElement("p");
  pFechaNacimiento.className = "card-text";
  pFechaNacimiento.textContent = persona.fechaNacimiento;

  const pGenero = document.createElement("p");
  pGenero.className = "card-text";
  pGenero.textContent = persona.genero;

  const pPais = document.createElement("p");
  pPais.className = "card-text";
  pPais.textContent = persona.pais;

  const pDescripcion = document.createElement("p");
  pDescripcion.className = "card-text";
  pDescripcion.textContent = persona.descripcion;

  const imgAvatar = document.createElement("img");
  imgAvatar.className = "card-img-top";
  imgAvatar.src = persona.avatar;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const card = document.createElement("div");
  card.className = "card";
  card.style = "18rem";

  const li = document.createElement('li');


  cardBody.appendChild(h5Title);
  cardBody.appendChild(pApellido);
  cardBody.appendChild(pFechaNacimiento);
  cardBody.appendChild(pGenero);
  cardBody.appendChild(pPais);
  cardBody.appendChild(pDescripcion);
  cardBody.appendChild(buttonDelete);
  cardBody.appendChild(buttonEdit);

  card.appendChild(imgAvatar);
  card.appendChild(cardBody);

  li.appendChild(card);
  container.appendChild(li);
};

const showPersona = (infoPersonaList) => {
    console.log(infoPersonaList);
  infoPersonaList.forEach((persona, index) => {
    personaCreate(persona, index);
  });
};

const cleanList = () => {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
        //padre.removeChild(child)
    };
};

const parserResponseFireBase = (response) => {
  const parsedResponse = []
      for(const key in response ){
          const element = {
              id: key,
              avatar: response[key].avatar,
              nombre: response[key].nombre,
              apellido: response[key].apellido,
              fechaNacimiento: response[key].fechaNacimiento,
              genero: response[key].genero,
              pais: response[key].pais,
              descripcion: response[key].descripcion
          };
          parsedResponse.push(element)
      };
  return parsedResponse;
};

const getInfo = async() => {
  try {
      // codigo que se ejecutara por default
      const url = URL_FIREBASE + '.json'
      const response = await fetch(url);
      console.log(response)
      if(response.status !== 201){
          const parsed = await response.json();
          const responseParsered = parserResponseFireBase(parsed);
          cleanList()
          showPersona(responseParsered);
      }
      
      // throw new Error('este es un eror en el try')
  } catch (error) {
      // codigo a ejecutarse cuando hay un error
      console.error(error, 'xxxx')
  }
};
getInfo();


const createPersona = async(persona) => {
  console.log('hola')
  const url = URL_FIREBASE + '.json'
  const create = await fetch(url, { 
      method:'POST',
      body: JSON.stringify(persona)
  });
  if(create.status === 200){
      getInfo()
  }
};

const buttonSubmit = document.querySelector("button");
buttonSubmit.addEventListener("click", (event) => {
  const avatar = document.querySelector("#avatarInput");
  const nombre = document.querySelector("#nombreInput");
  const apellido = document.querySelector("#apellidoInput");
  const fechaNacimiento = document.querySelector("#fechaNacimientoInput");
  const genero = document.querySelector('input[name="gender"]:checked');
  const paises = document.querySelector("#paises");
  const descripcion = document.querySelector('#descripcionInput');

  const newPerson = {
    avatar: avatar.value,
    nombre: nombre.value,
    apellido: apellido.value,
    fechaNacimiento: fechaNacimiento.value,
    genero: genero.value,
    pais: paises.options[paises.selectedIndex].value,
    descripcion : descripcion.value,
  };


  // listPerson.push(newPerson);
  createPersona(newPerson);
  // listPerson.push(newPerson);
  // cleanList();
  // showPersona(listPerson);
  event.preventDefault();
});

