var inputTodo = document.getElementById('inputTodo')
var addBtn = document.getElementById('add')
var list = document.getElementById('list')
var INSERT = 'INSERT'
var DELETE = 'DELETE'
var EDIT = 'EDIT'
var DEL_ALL = 'DEL_ALL'

var store = Redux.createStore(addFunc, { todoArray: [] })

function addFunc(state, action) {
    switch (action.type) {
        case INSERT:
            return state = {
                todoArray: [...state.todoArray, action.payload]
            }
            break;
        case DELETE:
            var todos = state.todoArray
            todos.splice(action.payload, 1)
            return state = {
                todoArray: todos
            }
            break;
        case EDIT:
            var todos = state.todoArray
            var editVal = prompt('Edit Value', todos[action.payload])
            console.log(editVal, '000000000000')
            todos.splice(action.payload, 1, editVal)
            return state = {
                todoArray: todos
            }
            break;
        case DEL_ALL:
            return state = {
                todoArray: []
            }
            break;
        default:
            return state
    }
}

var nameBtn = document.getElementById('nameBtn')
var userName = document.getElementById('userName')

nameBtn.onclick = () => {
    console.log(userName.value)
    var todoBox = document.getElementById('todoBox')
    todoBox.style.display = 'block'
}

addBtn.onclick = () => {
    // console.log(inputTodo.value)
    store.dispatch({
        type: INSERT, payload: inputTodo.value
    })
    inputTodo.value = ''
    console.log(store.getState())
}


inputTodo.value = ''
function render() {
    var todos = store.getState().todoArray
    list.innerHTML = ""
    todos.map((todo, key) => {
        var li = document.createElement('LI')
        var editBtn = document.createElement('BUTTON')
        var editText = document.createTextNode('Edit')
        editBtn.setAttribute('onClick', 'editBtn(' + key + ')')
        editBtn.appendChild(editText)
        var delBtn = document.createElement('BUTTON')
        delBtn.setAttribute('onClick', 'delBtn(' + key + ')')
        var delText = document.createTextNode('Delete')
        delBtn.appendChild(delText)
        var textNode = document.createTextNode(todo)

        li.appendChild(textNode)
        li.appendChild(editBtn)
        li.appendChild(delBtn)
        list.appendChild(li)
    })
}

function delAll() {
    store.dispatch({
        type: DEL_ALL
    })
}
// var editBtn = document.getElementById('editBtn')
function editBtn(key) {
    store.dispatch({
        type: EDIT, payload: key
    })
}


// var delBtn = document.getElementById('delBtn')
function delBtn(key) {
    store.dispatch({
        type: DELETE, payload: key
    })
    console.log('action dispatched')
}



store.subscribe(render)

render()