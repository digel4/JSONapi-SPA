const APIURL = 'http://localhost:3001/api/todos/';

export async function getTodos() {
    return fetch(APIURL)
    .then(res => {
        if(!res.ok) {
            if(res.status >=400 && res.status < 500){
                return res.json().then(data => {
                    let err = {errorMessage: data.message}
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not responding"};
                throw err;
            }
        }
        return res.json()
    })
}

export async function createTodo(val) {
    return fetch(APIURL, {
        method: "post",
        headers: new Headers({
            "content-Type": "application/json",
        }),
        body: JSON.stringify({name: val})
    })
    .then(res => {
        if(!res.ok) {
            if(res.status >=400 && res.status < 500){
                return res.json().then(data => {
                    let err = {errorMessage: data.message}
                    throw err;
                })
            } else {
                let err = {errorMessage: "Please try again later, server is not responding"};
                throw err;
            }
        }
        return res.json()
    })
}

export async function deleteTodo(id) {
    const deleteURL = APIURL + id;
        return fetch(deleteURL, {
            method: "delete",
        })
        .then(res => {
            if(!res.ok) {
                if(res.status >=400 && res.status < 500){
                    return res.json().then(data => {
                        let err = {errorMessage: data.message}
                        throw err;
                    })
                } else {
                    let err = {errorMessage: "Please try again later, server is not responding"};
                    throw err;
                }
            }
            return res.json()
        })
}

export async function toggleTodo(todo) {
    const updateURL = APIURL + todo._id;
        return fetch(updateURL, {
            method: "put",
            headers: new Headers({
                "content-Type": "application/json",
            }),
            body: JSON.stringify({completed: !todo.completed})
        })
        .then(res => {
            if(!res.ok) {
                if(res.status >=400 && res.status < 500){
                    return res.json().then(data => {
                        let err = {errorMessage: data.message}
                        throw err;
                    })
                } else {
                    let err = {errorMessage: "Please try again later, server is not responding"};
                    throw err;
                }
            }
            return res.json()
        })
}