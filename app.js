import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { inquirerMenu, pausa, leerInput, listadoTareasBorrar,confirmar, mostrarListadoCheckList } from './helpers/inquirer.js';
import Tareas  from './models/tareas.js';

const main = async () =>{
    let opt;
    
    //Instacia de clase tareas 
    const tareas = new Tareas();

    const DB = leerDB();
    
    if(DB){
        tareas.cargarTareasFromArray(DB);
    }


    do{

        opt =  await inquirerMenu();

        switch(opt){
            case 1:
                //Inquirer que me muestra prompt para ingresar la descripcion de una tarea
                const desc = await leerInput("Ingresa una descripcion para la tarea");
                tareas.crearTarea(desc);
            break;
            case 2:
                tareas.listadoCompleto();
            break;
            case 3:
                tareas.listarTareasPendientesCompletadas(true);
            break;
            case 4:
                tareas.listarTareasPendientesCompletadas(false);
            break;
            case 5:
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleTareasCheckList(ids);
                //console.log(ids);
            break;
            case 6:
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id ==='0'){
                    break;
                }
                const ok = await confirmar('CONFIRME QUE DESEA BORRAR ESTA TAREA')
                if(ok){
                    tareas.borrarTarea(id);
                    console.log('TAREA BORRADA!'.green);
                }
            break;
        }
        //console.log({opt})

        guardarDB(tareas.listadoArr);
        await pausa();        

    }while(opt !== 0)
    

}

main();