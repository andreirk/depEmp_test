
export const departmentApi = {
  register (userData) {
    return fetch(`http://localhost:3000/departments`)
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error)
        .then(data => data)
  }
}


export const employeeApi = {
  register (userData) {
    return fetch(`http://localhost:3000/employees`)
        .then(statusHelper)
        .then(response => response.json())
        .catch(error => error)
        .then(data => data)
  }
}



function statusHelper (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}