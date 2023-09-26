const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

function adicionarObjeto(objeto, chave, objetoAdicionado){
    objeto[chave] = objetoAdicionado
}

let bd = {}

app.get('/tasks', (req, res) => {

    let limit =  parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : 3

    let offset = Number(req.query.offset) || 0

    console.log(limit)

    let newBD = {}

    let lastTask;

    for(task in bd){
        lastTask = task
    }

    lastTask = parseInt(lastTask)

    if(limit > lastTask){
        limit = lastTask
    }


    if(offset >= lastTask){
        offset = lastTask - limit
    }

    let i = 1

    while(true){
        console.log(limit)
        if (limit <= 0){
            break
        }
        if (i > lastTask){
            break
        }
        if(bd.hasOwnProperty(i + offset)){
            //console.log("i:"+i+" limit: "+limit+" offset:"+offset)
            adicionarObjeto(newBD, i, bd[i + offset])
            limit--
        }
        i++
    }



    //console.log(req)
    console.log(newBD)
    res.send(newBD) 
} )

app.get('/tasks/:id', (req, res) => {
    let id = req.params.id

    if(bd.hasOwnProperty(id)){
        res.send(bd[id])
    }else{
        res.status(404).send()
    }
})

app.post('/tasks', (req, res) => {

    let newTaskName = req.body.name
    let newTaskDescription = req.body.description
    let lastID;

    if(newTaskName.length > 0 || newTaskDescription.length > 0 ){
        res.status(400).send()
        return 400
    }


    let objectTask = {
        'name': newTaskName,
        'description': newTaskDescription,
        'createDate': Date.now(),
        'timestamp': Date.now()
    }

    for(id in bd){
        lastID = id
    }

    lastID = Number(lastID) + 1

    adicionarObjeto(bd, lastID, objectTask)

    res.status(201).json(bd[lastID])
})

app.delete('/tasks/:id', (req, res) => {

    let id = req.params.id

    if(bd.hasOwnProperty(id)){
        delete bd[id]
        res.status(204).send()
    }
    else{
        res.status(404).send()
    }

})

app.put('/tasks/:id', (req, res) => {

    let id = req.params.id

    if(newTaskName.length > 0 || newTaskDescription.length > 0 ){
        res.status(400).send()
        return 400
    }

    if(bd.hasOwnProperty(id)){
        let newName = req.body.name
        let newDescription = req.body.description

        bd[id].name = newName;
        bd[id].description = newDescription
        bd[id].timestamp = Date.now()
        
        res.status(200).json(bd[id])
    }
    else{
        res.status(404).send()
    }
})

app.listen(port, () =>{
    console.log("Servidor inicializado")
})



