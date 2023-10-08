  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase,ref, set ,update,onChildAdded , push , remove    } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBRjo37gImzvZBSjCvVu77qndQrGoks-DI",
    authDomain: "todoapp-63b75.firebaseapp.com",
    projectId: "todoapp-63b75",
    storageBucket: "todoapp-63b75.appspot.com",
    messagingSenderId: "1012785486596",
    appId: "1:1012785486596:web:0ddfbd8d12746aa69dce51"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var DATABASE = getDatabase(app)


var inp = document.getElementById("inp")
var list = document.getElementById("list")
var todoList = []


window.addTodo = function (){
    // console.log(inp.value)

    if(inp.value == ""){
        alert("ENTER ANY VALUE ")
        return;
    }

    var userItems = {
        item : inp.value 
    }

    // ==== id generate krni hai q k edit or delete k liye id chahiye hoti hai ===
    var referKey = ref(DATABASE)
    var itemKey= push(referKey).key
    userItems.id = itemKey

    // === check karengay k id milrahi hai ya nhi phir agr milrahi hou 
    // to hum data ko database me save karwadengay ============
    // console.log(userItems)

    var refer = ref(DATABASE , `todolist/${userItems.id}`)
    set(refer , userItems)
    render()
}

function render(data){
    inp.value = ""
    list.innerHTML =""

    if(data){
        todoList.push(data)
        // console.log(todoList)
    }

    for(var i = 0 ; i<todoList.length ; i++){
        list.innerHTML += `<div>
            <li class="mt-2 p-1"> ${todoList[i].item}
             <span id="li-buttons">
                <button onclick="editTodo(${i},'${todoList[i].id}')" class="li-buttons" id="edit-btn"> <i class="fa-solid fa-pen-to-square" style="color: #000000;"></i> </button>
                <button onclick="deleteTodo(${i},'${todoList[i].id}')" class="li-buttons"  id="delete-btn"> <i class="fa-solid fa-trash" style="color: #000000;"></i></button>
            </span>
            </li>
        </div>`
    }

}

window.editTodo = function (index, id){
    // console.log(index,id)

    var newItem = prompt(" ENTER A NEW ITEM ")
    todoList[index].item = newItem

    var refer = ref(DATABASE,`todolist/${id}`)
    update(refer,{item: newItem})
    render()
}


window.deleteTodo = function (index,id){
    // console.log(index,id)

    todoList.splice(index,1)
    var refer = ref(DATABASE,`todolist/${id}`)
    remove(refer)
    render()
}

window.deleteAll = function (){
    todoList=[]
    list.innerHTML=""
    // console.log(todoList)

    var refer = ref(DATABASE, "todolist")
    remove(refer)

}


function getDataFromDatabase(){
    var reference = ref(DATABASE,"todolist")

    onChildAdded(reference , function(data){
        // console.log(data.val())
        render(data.val())
    })
}

window.onload = getDataFromDatabase()

/* step 1 : first apko user se value leni hai 
step 2: then wo phir hume firebase me bhejna hai 
step 3: phir hume database se data mangwana hai or check krna hai araha hai ya nahi
step 4: phir hume wo data render krna hai 
step 5: then edit 
step 6: then delete */
