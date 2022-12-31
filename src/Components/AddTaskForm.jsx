const AddTaskForm=({newTask,setNewTask,addTask})=>{
    return(
        <>
            <div className="row">
              <div className="col">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="form-control form-control-lg mr"
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-lg btn-success mr-20"
                  onClick={addTask}
                >Add Task</button>
              </div>
            </div>
            <br/>
          </>
    )
}

export default AddTaskForm;