document.querySelector("#push").onclick=function() {
    
   if( document.querySelector("#newtask input").value.length ==0){
        alert('Enter the task');
    }
    
    else {
        document.querySelector("#tasks").innerHTML += `
        <div class="task">
          <span id="taskname">
          ${document.querySelector("#newtask input").value}
          </span>
            <button class="delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;

        document.querySelector("#tasks").value=""

        var current_tasks=document.querySelectorAll(".delete");

        for(var i=0;i<current_tasks.length;i++){
            current_tasks[i].onclick=function(){
                this.parentNode.remove();
            };
        }
    }
};

