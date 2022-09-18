import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTasks, faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [todo, settodo] = useState([

    { id: 1, title: 'task1', status: false },
    { id: 2, title: 'task2', status: false }

  ])




  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add task 
  ////////////////////////////////////////// 
  const addTask = () => {

    if (newTask) {

      let num = todo.length + 1
      let newEntry = { id: num, title: newTask, status: false }
      settodo([...todo, newEntry])
      setNewTask('')
    }


  }

  // Delete task 
  ////////////////////////////////////////// 
  const deleteTask = (id) => {

    let remainingTask = todo.filter(task => task.id != id)
    settodo(remainingTask)
  }

  // mark task as done or completed
  ////////////////////////////////////////// 
  const markDone = (id) => {

    let taskCompleted = todo.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status })
      } else {
        return task
      }

    })
    settodo(taskCompleted)
  }

  // cancel update
  ////////////////////////////////////////// 
  const cancelUpdate = () => {
    setUpdateData('')
  }

  // Change task for update
  ////////////////////////////////////////// 
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry)

  }

  // update task 
  ////////////////////////////////////////// 
  const updateTask = () => {
console.log("ghdfghkfdhgkfdhgka");
    let filiteredData = [...todo].filter(task => task.id !== updateData.id)
    let updatedData = [...filiteredData,updateData]
    settodo(updatedData)
    setUpdateData('');


  }






  return (
    <div className=" container App">
      <br /><br />
      <h2>To Do List App (React JS)</h2>



  {updateData && updateData ? (
        <>
          <div className="row">
            <div className="col">
              <input 
                value={updateData && updateData.title} 
                onChange={ (e) => changeTask(e) } 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success mr-20" 
                onClick={updateTask}
              >Update</button>
              <button 
                className="btn btn-lg btn-warning" 
                onClick={cancelUpdate}
              >Cancel</button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <input 
                value={newTask} 
                onChange={e => setNewTask(e.target.value)} 
                className="form-control form-control-lg" 
              />
            </div>
            <div className="col-auto">
              <button 
                className="btn btn-lg btn-success" 
                onClick={addTask}
              >Add Task</button>
            </div>
          </div>
          <br />
        </>
      )}


      {/* {display todos} */}

      <br /><br />
      {todo && todo.length ? '' : 'No tasks...'}
      {todo && todo
        .sort((a, b) => a.id > b.id ? 1 : -1)
        .map((task, index) => {

          return (
            <React.Fragment key={task.id}>

              <div className='col taskBg'>
                <div className={task.status ? 'done' : ''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>
                <div className='iconsWrap'>
                  <span title='Completed / Not Completed' onClick={() => {
                    markDone(task.id)
                  }}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  {task.status ? null : (<span title='Edit' onClick={() =>
                    setUpdateData({
                      id: task.id,
                      title: task.title,
                      status: task.status ? true : false
                    })
                  }  >
                    <FontAwesomeIcon icon={faTasks} />
                  </span>)}

                  <span title='Delete' onClick={() => {
                    deleteTask(task.id)
                  }}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>




            </React.Fragment>
          )

        })}

    </div>
  );
}

export default App;
