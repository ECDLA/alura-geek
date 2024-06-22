const urlAPI = 'https://alura-geek-sand-mu.vercel.app/'

export async function conexionAPI(parametro = '') {    
    try
    {
        const conexion = await fetch(`${urlAPI}/${parametro}`);
        const conexionConvertida = await conexion.json();

        // Si conexion es falso entonces
        if (!conexion.ok) {
            
            // Agrega un error
            throw new Error(`HTTP ${conexion.status}`);
        }

        return conexionConvertida;
    }
    catch (error)
    {
        console.log(error);
    }  
}

export async function eliminarObjeto(id) {
    try {
        const url = await fetch(urlAPI + `/${id}`, {method:"DELETE"});
        
        if(!url.ok) {
            throw new Error(`HTTP ${url.status}`);
        }

        // console.log(`se elimino de la base de datos el id ${id}`);
    } catch (error) {
        console.log(error);
    }

}

export async function agregarObjeto(nombre, precio, urlImagen, id) {
    const conexion = await fetch(urlAPI, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            urlImagen: urlImagen,
            titulo: nombre,
            precio: precio,
            id: id
        })
    })
}