import React ,{useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import {v4 as uuidv4} from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

var numberOfTask = 0

function App() {

  // const [todos, setToDos] = useState([{id:1,name: 'Todo 1',
  // complete :false}]);
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    if(todo.complete) numberOfTask -=1
    else numberOfTask +=1
    setTodos(newTodos)
  }

  const handleAddTodo=(e)=>{
      const name = todoNameRef.current.value
      if(name === '') return 

      setTodos(prevTodos =>{
        return [...prevTodos,{id:uuidv4(),name:name,
          complete:false}]
      })
      todoNameRef.current.value = null
      numberOfTask+=1
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    if(newTodos) setTodos(newTodos)
  }


  return (
    <>
    <>
    <div>
      Type the Name of the ToDo :-
    </div>
    </>
    <TodoList todos={todos} toggleTodo = {toggleTodo}/>
    <input ref = {todoNameRef} type = 'text'/>
    <button onClick = {handleAddTodo} > Add Todo </button>
    <button onClick={handleClearTodos}> clear completed</button>
    <div> {numberOfTask} Todo Left to do</div>
    {/* <div> {todos.filter(todo=>!todo.complete).length} Left to do</div> */}
    </>
  )
// return (
//   <div className="App">
//     <header className="App-header">
//       <img src={logo} className="App-logo" alt="logo" />
//       <p>
//         Edit <code>src/App.js</code> and save to reload.
//       </p>
//       <a
//         className="App-link"
//         href="https://reactjs.org"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         Learn React Today
//       </a>
//     </header>
//   </div>
// );
}

export default App;
