import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { MdDelete } from "react-icons/md";
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

// import './App.css'
import Navbar from './components/navbar'
function App() {
  // const [count, setCount] = useState(0)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
const [showfinished, setshowfinished] = useState(true)



useEffect(() => {
 let todostring=localStorage.getItem("todos")
  if(todostring){

    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
}, [])


const toggleFinished=(e)=>{

setshowfinished(!showfinished)

}



  const saveTOs=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });//this is a new array now.

    setTodos(newTodos)
    saveTOs()
  }
  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });//this is a new array now.

    setTodos(newTodos)
    saveTOs();




  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }


  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handlecheckbox = (e) => {
    let id = e.target.name;
    // console.log(`the id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];//this is a new array now.
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

    console.log(newTodos)
saveTOs();
  }


  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto my-5 rounded-x1 p-5 bg-violet-100 min-h-[80vh] md:w-1/2" >
      <h1 className='font-bold text-center text-xl'>iTask - Manage your to-dos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a To-do</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1 bg-white' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-700 font-bold p-3 py-1 text-white rounded-md'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>

        <div className="todos justify-center">
          {todos.length === 0 && <div className='m-5'>Nothing to Display </div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-5 justify-between">
              <div className='flex gap-10'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>

              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-sm font-bold p-2 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-800 text-sm font-bold p-2 py-1 text-white rounded-md mx-1' ><MdDelete /></button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
