$(document).ready(function(){
    let taskId = 0;
    let taskData = [];

    function loadTasks() {
        const saved = localStorage.getItem('taskData');
        if (saved) {
            taskData = JSON.parse(saved);
            taskId = taskData.length ? Math.max(...taskData.map(t => t.id)) + 1 : 0;
        }
    }

    function saveTasks() {
        localStorage.setItem('taskData', JSON.stringify(taskData));
    }

    function renderTasks(){
        $('.task').empty();

        const sortedTasks = taskData.slice().sort((a,b) => {
            if (a.completed === b.completed){
                return a.id - b.id;
            }
            return a.completed - b.completed;
        });

        sortedTasks.forEach(task => {
            const completedClass = task.completed ? 'completed': '';
            const newTask = `
             <div class="task-item" data-id=${task.id}>
                <div class="task-item-left">
                    <span class="task-text ${completedClass}" contenteditable="false">${$('<div>').text(task.text).html()}</span>
                </div>
                <div class="task-item-right">
                    <input class="task-checkbox" type="checkbox" ${task.completed ? 'checked': ''} />
                    <button class="del-btn" title="Delete">&#128465;</button>
                </div>
             </div>
             `;
             $('.task').append(newTask);
        });
    }

    loadTasks();
    renderTasks();

    $('.open-modal-btn').on('click', function(){
        $('.modal').fadeIn(200);
        $('#modal-task-input').val('').focus()
    })

    $('.modal-task-cancel').on('click',function(){
        $('.modal').fadeOut(200);
    })

    $('.modal-task-form').on('submit', function(e){
        e.preventDefault();
        const taskText = $('.modal-task-input').val().trim();
        if (!taskText) return;

        const newTask = {
            id: taskId,
            text: taskText,
            completed: false
        };

        taskData.unshift(newTask);
        taskId++;
        saveTasks();
        renderTasks();
        $('.modal').fadeOut(200)
        $('#modal-task-input').val('');
    })

    $(document).on('dblclick', 'span.task-text' ,function(){
        $(this).attr('contentEditable',true).focus()
    })

    $(document).on('blur', 'span.task-text', function(){
        $(this).attr('contentEditable',false)
        const $task = $(this).closest('.task-item')
        const id = +$task.data('id')
        const task = taskData.find(t => t.id === id)
        if (task) {
            task.text = $(this).text();
            saveTasks();
        }
    })

    $(document).on('change','.task-checkbox',function(){
        const $task = $(this).closest('.task-item')
        const id = +$task.data('id')
        const task = taskData.find(t => t.id === id);

        if (task) {
            task.completed = this.checked;
            saveTasks();
            renderTasks();
        }
    });

    $(document).on('click','.del-btn',function(){
        const $task = $(this).closest('.task-item')
        const id = +$task.data('id')
        if (confirm("Точно хотите удалить задачу?")){
            taskData = taskData.filter(t => t.id !== id);
            saveTasks();
            $task.addClass('removing');
            setTimeout(function(){
                renderTasks();
            },400);
        }
    })

    $('.search-task-input').on('input',function(){
        const value = $(this).val().toLowerCase();
        $('.task-item').each(function(){
            const text  = $(this).find('.task-text').text().toLowerCase()
            $(this).toggle(text.includes(value));
        })
    })

    $(document).on('keydown','span.task-text[contenteditable="true"]',function(e){
        if(e.key === "Enter"){
            e.preventDefault()
            $(this).blur();
        }
    })
})
