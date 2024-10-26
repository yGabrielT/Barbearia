let id = 2;

fetch(`/sql?id=${id}`)
    .then(response=> response.json())
    .then(data => console.log(data));