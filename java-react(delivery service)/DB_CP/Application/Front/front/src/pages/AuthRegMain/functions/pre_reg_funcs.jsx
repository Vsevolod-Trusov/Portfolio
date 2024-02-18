export default  function loadPoints() {

     fetch("http://localhost:8080/api/admin/points", {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    })
        .then(response => {
            if(response.status === 200){
                return response.json()
            }
            throw new Error(`${response.status}`)
        }).then(data=>{
            return data
        }).catch(error => {
            alert(error)//todo fix drop alert
        })

}