$(document).ready(function () {
    console.log('JQ');

    getItems();

}); // end doc ready


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