import colors from 'colors';
import inquirer from 'inquirer';


const preguntas = [{
    type:'list',
    name:'opcion',
    message:'Seleccione una opcion',
    choices:[
        {
        value:1,
        name:`${'1.'.green} Crear Tarea`
    },
    {
        value:2,
        name:`${'2.'.green} Listar Tarea`
    },
    {
        value:3,
        name:`${'3.'.green} Listar Tareas Completadas`
    },
    {
        value:4,
        name:`${'4.'.green} Listar Tareas Pendientes`
    },
    {
        value:5,
        name:`${'5.'.green} Completar Tarea(s)`
    },
    {
        value:6,
        name:`${'6.'.green} Borrar Tarea`
    },
    {
        value:0,
        name:`${'0.'.green} Salir`
    }
]
}];


export const inquirerMenu = async () =>{
    console.log('============================'.green);
    console.log('    Seleccione una opcion   '.white);
    console.log('============================\n'.green);
    
    const {opcion} = await inquirer.prompt(preguntas)
    
    return opcion;
};

export const pausa = async () =>{
    const preguntaPausa = [{
        type:'input',
        name:'opcionPausa',
        message:`Presione ${'ENTER'.green} para continuar`,
    }];

    console.log('\n');
    const { opcionPausa } = await inquirer.prompt(preguntaPausa)

};

export const leerInput = async (message) =>{
    const question = [{
        type:'input',
        name:'desc',
        message,
        validate(value) {
            if(value.length === 0){
                return "Ingrese un valor por favor"                ;
            }

            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question)
    return desc;
};

export const listadoTareasBorrar = async (tareas = []) =>{
    
    const choices =  tareas.map((tarea, i) =>{
        
        const idx = i+1;
        return {
            value:tarea.id,
            name:`${ (idx+'.').toString().green} ${tarea.desc}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0. '.green + 'Cancelar'
    });

    const preguntas = [{
        type:'list',
        name:'opcion',
        message:'Seleccione una tarea a borrar',
        choices
    }];

    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

export const confirmar = async (message) =>{

    const question =[
        {
            type:'confirm',
            name:'ok',
            message:message.red
        }
    ]
    
    console.log();
    const { ok } = await inquirer.prompt(question);
    return ok;
}

export const mostrarListadoCheckList = async (tareas = []) =>{
    
    const choices =  tareas.map((tarea, i) =>{
        
        const idx = i+1;
        return {
            value:tarea.id,
            name:`${ (idx+'.').toString().green} ${tarea.desc}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const preguntas = [{
        type:'checkbox',
        name:'ids',
        message:'Seleccione',
        choices
    }];

    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}