const URL_FIREBASE ='https://js-tania-default-rtdb.firebaseio.com/';
const search = window.location.search;
const url = new URLSearchParams(search);
const ID_PERSONA = url.get('id');

const avatar = document.querySelector("#avatarInput");
const nombre = document.querySelector("#nombreInput");
const apellido = document.querySelector("#apellidoInput");
const fechaNacimiento = document.querySelector("#fechaNacimientoInput");
const genero = document.querySelector('input[name="gender"]:checked');
const paises = document.querySelector("#paises");
const descripcion = document.querySelector('#descripcionInput');
const buttonEdit = document.querySelector('#add-person');


const updatePersona = async() => {
    const persona = {
        avatar: 's',
        nombre: 's',
        apellido: 's',
        fechaNacimiento: 's',
        genero: 'ss',
        paises: 's',
        descripcion: 's',
    };

    const url = URL_FIREBASE + ID_PERSONA + '.json';
    const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(persona)
    });
    if(response.status === 200){
        window.location.href = 'hhttp://127.0.0.1:5500/form.html/'
    }
};

buttonEdit.addEventListener('click', () => {
    updatePersona()
});


const getInfoById = async() => {
    const url = URL_FIREBASE + ID_PERSONA + '.json';
    const info = await fetch(url);
    const parsed = await info.json();
    console.log(parsed)
    avatar.value = parsed.avatar;
    nombre.value = parsed.nombre;
    apellido.value = parsed.apellido;
    fechaNacimiento.value = parsed.fechaNacimiento;
    genero.value = parsed.genero;
    paises.value = parsed.paises;
    descripcion.value = parsed.descripcion;
};

getInfoById()