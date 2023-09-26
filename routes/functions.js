function taskStatusValidation(taskStatus){

    const status = ['por fazer', 'em progresso', 'concluida']

    if(status.includes(taskStatus)){
        console.log("Status cadastrado");
        return true;
    } 
    else {
        console.log("Status não cadastrado");
        return false;
    }
}

function dueDateValidation(dueDate){

    dueDate = Date.parse(dueDate)

    if(dueDate > Date.now()){
        console.log('Data válida')
        return true
    }
    else{
        console.log('Data inválida')
        return false
    }
}

function dataValidation({name, description, dueDate}){

    let data = {
        name: name,
        description: description,
        dueDate: dueDate
    }

    if(!dueDateValidation(data.dueDate)){
        return false
    }

    for(field in data){
        if(data[field] === undefined || data[field].length <= 0){
            console.log(field + " é inválido.")
            return false
        }
        console.log(field+data[field].length)
    }

    console.log("todos os dados são válidos")
    return true
}

module.exports = {
    taskStatusValidation,
    dueDateValidation,
    dataValidation
 }