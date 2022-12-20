import colors from 'colors';
import Tarea from './tarea.js'
// _listado:
//     {'uuid-12345-45667-878': { id:12, desc: 'asasd', completadoEn:'4567633'} },
//     {'uuid-12345-45667-878': { id:12, desc: 'asasd', completadoEn:'4567633'} },
//     {'uuid-12345-45667-878': { id:12, desc: 'asasd', completadoEn:'4567633'} }


class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr (){
        const listado = [];

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];

            listado.push(tarea)
        });

        return listado;

    }

    cargarTareasFromArray (tareas = []){
        for(const tarea of tareas){
            this._listado[tarea.id] = tarea;
        }
    }

    crearTarea(desc){
        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        const tareas = this.listadoArr;

        console.log();

        for(let i =0; i < tareas.length; i++){
            console.log(`${(i+1).toString().green + '.'.green } ${ tareas[i].desc } :: ${ tareas[i].completadoEn !== null ? 'Completado'.green : 'Pendiente'.red } `);
        }
    }

    listarTareasPendientesCompletadas(completada = true){
        const tareas = this.listadoArr;

        console.log();

        if(completada){
            tareas.filter(tarea => tarea.completadoEn !== null ).forEach((tarea, i) =>{
                console.log(`${(i+1).toString().green + '.'.green } ${ tarea.desc } :: ${ 'Completado en ' + tarea.completadoEn.green } `);
            });
        }else{
            tareas.filter(tarea => tarea.completadoEn === null ).forEach((tarea, i) =>{
                console.log(`${(i+1).toString().green + '.'.green } ${ tarea.desc } :: ${ 'Pendiente'.red } `);
            });
        }
    }

    borrarTarea(id){
        delete this._listado[id];
    }

    toggleTareasCheckList (ids = []){

        ids.forEach(id =>{
            const tarea = this._listado[id];

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toDateString();
            }

        });

        this.listadoArr.forEach( tarea =>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }
}

export default Tareas;