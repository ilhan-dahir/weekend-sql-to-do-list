$(document).ready(function () {
    console.log('JQ');
    sendTasksToDB();
    getItems();

}); // end doc ready

function sendTasksToDB() {
    $('#add-button').on('click', function () {
        console.log('in add-button on click');
        //send task to database server as an object
        let taskToSend = {
            item: $('#task-to-add').val(),
            completed: false
        };
        // call saveTask with new object
        saveTask(taskToSend);
    })
}

function saveTask(newTask) {
    console.log('in saveTasK', newTask);
    //ajax call to server to get tasks
    $.ajax({
        method: 'POST',
        url: '/items',
        data: newTask
    }).then(function (response) {
        console.log(response);
        getItems();
        $('#task-to-add').val('')
    })
        .catch(function (error) {
            console.log('The "/items" ajax post request failed with error: ', error);
        })
}

function getItems() {
    console.log('in getItems');
    //ajax call to server to get items from db
    $.ajax({
        method: 'GET',
        url: '/items'
    }).then(function (response) {
        //empty out items table
        $('#view-items').empty();

        //loop through items form DB and render to DOM
        for (let item of response) {
            $('#view-items').append(
                `
            <tr data-id = ${item.id}>
            <td>${item.item}</td>
            `)
        }
    })
}//end getItems