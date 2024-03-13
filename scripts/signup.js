window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const formulario = document.forms[0];
    const nombre = document.querySelector('#inputNombre');
    const apellido = document.querySelector('#inputApellido');
    const email = document.querySelector('#inputEmail');
    const password = document.querySelector('#inputPassword');
    const url = 'https://todo-api.ctd.academy/v1';

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    formulario.addEventListener('submit', function (event) {
      event.preventDefault();  
      mostrarSpinner();
    
    
    const payload = {
        firstName: nombre.value,
        lastName: apellido.value,
        email: email.value,
        password: password.value
    }
    const settings={
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
            'Content-Type':'application/json'
        }
    }

        realizarRegister(settings);
        formulario.reset();

    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {

        fetch(`${url}/users`, settings)
        .then(response =>{
            if(response.ok != true){
                alert('logueate de ésta');
            }
                return response.json();
            
        })
        .then(data =>{
                console.log(data);
                if(data.jwt){
            
                    localStorage.setItem('jwt',JSON.stringify(data.jwt));
                    ocultarSpinner();
                    location.replace('./mis-tareas.html');
                }
            
        }).catch(err=>{
            console.log(err);
            ocultarSpinner();
        })
        };
});




    




