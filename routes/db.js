const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://admin:oOivA0qcc9HCfclp@cluster0.zzfvvkm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function run(){
    try{
        await client.connect()
        .then(() =>{
            console.log("Connect accepted")
        })
        await client.db("Cluster0").command({ping: 1})
        .then(() => {
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        })
    }
    catch(err){
        console.log(err)
    }
}

async function addTask(task){
    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const result = await collection.insertOne(task)
        //console.log(result)
    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

async function searchAllTasks(){
    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const data = collection.find()
        const result = await data.toArray()
        console.log(result)
        return result
    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

async function searchTaskById(id){
    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const objectId = new ObjectId(id);
        const data = collection.find({_id: {$eq: objectId}})
        const result = await data.toArray()
        console.log(result)
        return result
    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

async function searchTaskByStatus(status){
    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const data = collection.find({status: {$eq: status}})
        const result = await data.toArray()
        console.log(result)
        return result
    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

async function deleteTask(id) {
    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const objectId = new ObjectId(id);
        const result = await collection.deleteOne({_id: objectId})

        if(result.deletedCount){
            return true
        }
        else{
            return false
        }

    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

async function updateTask(id, {name, description, status, dataVencimento, timestamp}) {

    try{
        await run()
        const collection = client.db("Cluster0").collection("Estudo.ToDo List")
        const objectId = new ObjectId(id)
        const filter = {_id: objectId}

        const update= {
            $set: {
                name: name,
                description: description,
                status: status, 
                dataVencimento: dataVencimento,
                timestamp: timestamp
            }
        }
        
        for(field in update.$set){
            if(update.$set[field] === undefined){
                delete update.$set[field]
            }
        }

        console.log(update.$set)

        const result = await collection.updateOne(filter, update);

        if (result.modifiedCount) {
            console.log('Documento atualizado com sucesso:', result.modifiedCount);
        }
        else{
            console.log('nenhum')
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        client.close()
    }
}

module.exports = {
    searchAllTasks,
    searchTaskById,
    searchTaskByStatus,
    deleteTask,
    updateTask,
    addTask
  };