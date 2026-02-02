console.log("Tasks")
console.log("====================")
var todoList = {
  tasks: [],
  
  addTask: function(name) {
    this.tasks.push({
        "name":name,
    })
  },
  
  
  removeTask: function(name) {
    var index=0;

    this.tasks.forEach((task)=>{
        if(task.name == name){
            return;
        }
        index++;
    })

    this.tasks.splice(index,1);
  },
  
  listTasks: function() {
    console.log("All Tasks")
    this.tasks.forEach((task) => {
        console.log(`task name : ${task.name}`)
    })
  }
};

todoList.addTask("Task 1");
todoList.addTask("Task 2");
todoList.addTask("Task 3");
console.log("Add tasks and display them all")
todoList.listTasks();
console.log("====================")
console.log("Remove Task 2")
todoList.removeTask("Task 2");
todoList.listTasks();
console.log("====================")
