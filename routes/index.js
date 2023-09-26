const express = require("express");
const {searchAllTasks, searchTaskById, searchTaskByStatus, deleteTask, updateTask, addTask} = require("./db")
//const { Task } = require("./models")
const {taskStatusValidation, dueDateValidation, dataValidation} = require("./functions")

const app = express();
const port = 3000;
app.use(express.json())

function Task(name, description, status, dataVencimento, timestamp, createDate){
    this.name = name;
    this.description = description;
    this.status = status;
    this.dataVencimento = dataVencimento;
    this.createDate = createDate;
    this.timestamp = timestamp
}

app.get('/tasks', async (req, res) => {
    try{
        const result = await searchAllTasks()
        res.status(200).send(result)
    }
    catch(err){console.log(err)}
})

app.get('/tasks/:id', async (req, res) => {
    try{
        const id = req.params.id
        if(id.length < 24){
            res.status(404).send()
            return false
        }

        const result = await searchTaskById(id)
        console.log(typeof(result))
        if(result.length > 0){
            console.log("entrou")
            res.status(200).send(result)
        }
        else{
            res.status(404).send()
        }
    }
    catch(err){console.log(err)}

})

app.get('/tasks/status/:status', async (req, res) => {
    try{
        const status = req.params.status
        console.log(status)
        if(!taskStatusValidation(status)){
            res.status(404).send()
            return false
        }

        const result = await searchTaskByStatus(status)
        console.log(typeof(result))
        if(result.length > 0){
            console.log("entrou")
            res.status(200).send(result)
        }
        else{
            res.status(404).send()
        }
    }
    catch(err){console.log(err)}
})

app.put('/tasks/:id', async (req, res) => {

    const body = req.body
    const timestamp = Date.now()
    let task = new Task(body.name, body.description, body.status, body.dataVencimento, timestamp, undefined)


    if(body.dataVencimento != null){
        if(!dueDateValidation(task.dataVencimento)){
            res.status(400).send()
            return false
        }
    }

    if(body.status !== null){
        if(!taskStatusValidation(task.status)){
            res.status(400).send()
            return false
        }
    }

    try{
        const id = req.params.id
        if(id.length < 24){
            res.status(404).send()
            return false
        }
        const result = await updateTask(id, task)
        res.status(200).send(result)
    }
    catch(err){console.log(err)}
})

app.delete('/tasks/:id', async (req, res) => {
    try{
        const id = req.params.id
        if(id.length < 24){
            res.status(404).send()
            return false
        }
        const result = await deleteTask(id)
        res.status(204).send(result)
    }
    catch(err){console.log(err)}
})

app.post('/tasks', async (req, res) => {

    const body = req.body

    console.log(body)

    const timestamp = Date.now()
    const task = new Task(body.name, body.description, body.status, body.dataVencimento, timestamp, timestamp)

    if(!dataValidation({name: task.name, description: task.description, dueDate: task.dataVencimento})){
        res.status(500).send()
        return false
    }
    if(!taskStatusValidation(task.status)){
        res.status(500).send()
        return false
    }

    try{
        const result = await addTask(task)
        res.status(201).send(result)
    }
    catch(err){
        console.log(err)
    }
})

app.listen(port, () => {
    console.log('Server running... port:'+port)
}) 