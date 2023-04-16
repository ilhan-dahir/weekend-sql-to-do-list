$(document).ready(function () {
    // event.preventDefault();
    console.log('JQ');
    sendTasksToDB();
    getItems();

    $('#view-items').on('click', '.delete-task-btn', deleteTask);
    $('#view-items').on('click', '.is-task-checked', checkedTask);

}); // end doc ready

function checkedTask() {
    //get id of item to update
    let idToUpdate = $(this).parent().parent().data('id');
    // console.log($(this).parent().parent().attr("data-id"));
    //get id of item so we can add it to checkbox to get each item 
    //and check if its true
    let taskId = $(this).parent().parent().attr("data-id");
    //get the state of the checkbox and if true update
    let checkbox = document.getElementById(`task-completed-${taskId}`).checked;
    // $(this).parent().parent().attr("data-id");
    let isChecked;
    if (checkbox === true) {
        isChecked = true;
        $(`#item-task-${taskId}`).css("text-decoration", "line-through");
        console.log('isChecked', isChecked)
    }
    else {
        isChecked = false;
        $(`#item-task-${taskId}`).css("text-decoration", "none");
        console.log('isChecked', isChecked);
    }
    $.ajax({
        method: 'PUT',
        url: `/items/${idToUpdate}`,
        data: {
            completed: isChecked
        }
    }).then(function (response) {
        //when we update the completed state, refresh DOM
        // getItems();
    }).catch(function (error) {
        //Log the error in the console log
        console.log(`Error CheckedTask on ${idToUpdate}, error --> ${error}`);
    })

}

function deleteTask() {
    let idToDelete = $(this).parent().parent().data('id');
    console.log(idToDelete);

    $.ajax({
        method: 'DELETE',
        url: `/items/${idToDelete}`
    }).then(function (response) {
        //Call on getItems to update DOM
        getItems();
    }).catch(function (error) {
        console.log(`Error Deleting ${idToDelete} error --> ${error}`);
    })
}//end deleteTask

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
}//end sendTaskToDB

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
}//end saveTask

function getItems(event) {
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
            <td id="item-task-${item.id}">${item.item}</td><td>
            <input type="checkbox" class="is-task-checked" id ="task-completed-${item.id}" value="${item.completed}">
            <button class="delete-task-btn">❌</button>
          </td>
            `)
        }
    })
}//end getItems