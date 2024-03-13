window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const formulario = document.forms[0];
    const email = document.querySelector("#inputEmail");
    const password = document.querySelector("#inputPassword");
    const url = 'https://todo-api.ctd.academy/v1';
    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); 
            mostrarSpinner();
        
        const payload = {
            email: email.value,
            password:password.value
        };

        const settings ={
            method:'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type':'application/json'
            }
        };
        realizarLogin(settings);
        formulario.reset();

    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings) {
        console.log('lanzamos la consulta a la api');

        fetch(`${url}/users/login`, settings)
        .then(response =>{
            console.log(response);
            if(response.ok != true){
                alert('algunos de los datos son incorrectos')
            }
            return response.json();
        })
        .then(data=>{
            console.log('promesa cumplida');
            console.log(data);
            if(data.jwt){
                localStorage.setItem('jwt',JSON.stringify(data.jwt));
                ocultarSpinner();
                location.replace("./mis-tareas.html")
            
            }
        }).catch(err => {
            console.log("Promesa rechazada:");
            console.log(err);
            ocultarSpinner();
        })
    };
    
});


