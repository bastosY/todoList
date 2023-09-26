
url = 'http://localhost:3000/tasks'

function addTask(){

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'asads',
            'description': 'lavar casa terça a noite',
            'status': 'concluida',
            'dataVencimento': '009ww2-09-30'
        })
    })
    
    .then( data => {
        console.log(data)
    })
}

function viewTask(){
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log(data)
    })
}

function deleteTask(id){
    fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => {
        console.log(data)
    })
}

function updateTask(id){

    fetch(url+'/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': 'Yves2',
            'description': 'teste PUT',
            'status': 'por fazer',
            'dataVencimento': '025-11-23'
        })
    })
    
    .then( data  => {
        console.log(data)
    })
}


updateTask("6510d2353c29513f8e838493")



