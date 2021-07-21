var items = [];//array for to-do-s
var count = 0;//COUNTER FOR ID
var lister = document.querySelector('ul');//checking for completed
var fltr = "all";//filter default value is 0(all)

saveItem = () => {//SAVE THE ITEM FROM FORM FUNCTION
    let todo = document.getElementById("inp").value;
    let priorityGet = document.getElementById("priority").value;

    if(todo && priorityGet){//CHECK IF NOT EMPTY

        var item = {//new object to be added in array
            id: count,
            description: todo,
            priority: priorityGet,
            completed: false
        }

        items.push(item);//push in main array

        document.getElementById("inp").value = "";//CLEAR FIELD

        // console.log(items);

        displayList(items);

        count++;
    }
    else alert("Type something");//no null values
    
}

//DISPLAYING ALL THE TO_DO-LIST
displayList = list => {
    //FIRST, REMOVE ALL PREVIOUS ELEMENTS
    let remove = document.getElementById("todos");
    while (remove.hasChildNodes()) {
        remove.removeChild(remove.firstChild);
    }

    changeInfo(list);

    list.map( elem => {
        let tag = document.createElement("li");//create the li element of the list
        if (elem.completed) tag.setAttribute("class", "checked");
        else tag.setAttribute("class","");
        tag.setAttribute("id",elem.id);

       
        let text = document.createTextNode(elem.description);//the description of the to-do
        tag.appendChild(text);

        let span = document.createElement("SPAN");//the delete button
        span.setAttribute("class","close");
        span.setAttribute("onclick", `deleteCurrent(${elem.id})`)//using onclick function
        text = document.createTextNode("X");
        span.appendChild(text);
        tag.appendChild(span);

        let br = document.createElement("hr");//for separation
        tag.appendChild(br);
         tag.appendChild(br);

        text = document.createTextNode(`Priority: ${elem.priority}`);//element priority display
        tag.appendChild(text);

        span = document.createElement("SPAN");//the edit button
        span.setAttribute("class", "edit");
        span.setAttribute("onclick", `editCurrent(${elem.id})`)//using onclick
        text = document.createTextNode("edit");
        span.appendChild(text);
        tag.appendChild(span);

        document.getElementById("todos").appendChild(tag);//append all the info of the list element 
    })
}

//get the current index from the id
currentIndex = id => {
    let checkIndex = el => el.id === id;
    let currentId = items.findIndex(checkIndex);
    return currentId;
}


//DELETE ITEM FROM LIST WITH FUNCTION ONCLICK
deleteCurrent = id => {
    //delete from array
    items.splice(currentIndex(id), 1);
    if (fltr === "all") displayList(items);
    else sortList(fltr);
}

//EDIT CURRENT TO DO WITH A POPUP
editCurrent = id => {
    let newVal = prompt("Save the new value to the to-do:",items[currentIndex(id)].description);

    if (newVal === null || newVal === ""){//only if not null value
        alert("No new value Saveded. Keep the old value.");
    }
    else{
        items[currentIndex(id)].description = newVal;
        if(fltr === "all") displayList(items);
        else sortList(fltr);
    }
}

//SORT WITH PRIORITY FILTER 
sortList = pr => {
    if(pr != "all"){//if there is a filter applied
        const sorter = items.filter( item => item.priority === pr);
        displayList(sorter);
        fltr = pr;
    }
    else {displayList(items); fltr = "all"}
}

//CHECK/UNCHECK ITEMS WITH EVENT LISTENER
lister.addEventListener('click', check => {
    if (check.target.tagName === 'LI') {
        check.target.classList.toggle('checked');
        items[check.target.id].completed = !items[check.target.id].completed;
        console.log(items[check.target.id]);
    }
}, false);

//change the counter of to-do-s that is displayed
changeInfo = nr => {
    document.getElementById("inf").innerHTML = nr.length;//change innerHTML to display number
}
// Changing The background color according to the Priorities//
 function myFunction1() {
         document.body.style.backgroundColor = "red";//Higher priority//
        }
        function myFunction2() {
         document.body.style.backgroundColor = "#FFBF00";//Medium Priority//
       }
        function myFunction3() {
          document.body.style.backgroundColor = "green";//Low priority//
       }
      
