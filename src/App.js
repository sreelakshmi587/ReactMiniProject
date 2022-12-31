import React,{useState} from 'react';
import AddTaskForm from './Components/AddTaskForm';
import UpdateTaskForm from './Components/UpdateForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faPen ,faTrashCan} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

//main state
const[toDo,setToDo]=useState([])

//temp states
const[newTask,setNewTask]=useState('');
const[updateData,setUpdateData]=useState('');

//add Task
const addTask= () => {
  if(newTask){
    let num=toDo.length+1;
    let newEntry={id:num,title:newTask,status:false}
    setToDo([...toDo,newEntry])
    setNewTask('');
  }
};

//update Task
const updateTask=()=>{
  let filteredData = [...toDo].filter((task) => task.id !==updateData.id);
  let updatedData = [...filteredData,updateData]
  setToDo(updatedData);
  setUpdateData('');

};

//delete Task
const deleteTask=(id)=>{
  let newTasks=toDo.filter(task => task.id!==id)
  setToDo(newTasks);
};

//marks task as Done
const markDone=(id)=>{
  let newTask=toDo.map(task => {
    if(task.id==id){
      return({...task,status : !task.status})
    }
    return task;
  })
  setToDo(newTask);
};

//Cancels Update
const cancelUpdate=()=>{
  setUpdateData('');
};

//Change Task for Update
const changeTask=(e)=>{
  let newEntry={
    id : updateData.id ,
    title : e.target.value ,
    status : updateData.status ? true : false
  }
  setUpdateData(newEntry);
};

  return (
    <div className="ContainerApp">
      <br></br>
      <h2>To-Do List App</h2>
      <br/>

      {updateData && updateData ? (
        <UpdateTaskForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
        />
      ):(
        <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}/>
      )}
      
      {toDo && toDo.length ? '':'No Tasks......'}
      {toDo && toDo
      .sort((a,b)=>a.id>b.id ? 1:-1)
      .map((task,index)=>{
        return(
          <div className='col taskBg'>
            <div className={task.status ? 'done' : ''}>
              <React.Fragment key={task.id}>
                <span className='taskNumber'>{index + 1}</span>
                <span className='taskName'>{task.title}</span>
                <div className='iconsWrap'>
                  <span title='Completed/NotCompleted' onClick={(e) => markDone(task.id)}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                  </span>
                  {task.status? null:(
                    <span title='Edit' 
                    onClick={()=>setUpdateData({
                      id : task.id,
                      title : task.title,
                      status : task.status ? true : false
                    })}>
                    <FontAwesomeIcon icon={faPen} />
                  </span>
                  )}
                  <span title='Delete' onClick={()=>deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan}/>
                  </span>
                </div>
              </React.Fragment>
            </div>
          </div>
        )

      })}
    </div>
  );
}

export default App;
