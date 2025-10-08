$(document).ready(function(){
    let taskId = 1;

    $('.add-task-form').on('submit', function(e){
        e.preventDefault();
        const taskText = $('.add-task-input').val().trim();
        if (!taskText) return;
        
        const newTask = `
             <div class="task-item" data-id=${taskId}>
                <div class="task-item-left">
                    <span class="task-text" contenteditable="false">${$('<div>').text(taskText).html()}</span>
                </div>
                <div class="task-item-right">
                    <input class="task-checkbox" type="checkbox" />
                    <button class="task-btn" title="Delete">&#128465;</button>
                </div>
            </div>
        `
        $('.task').append(newTask);
        $('.add-task-input').val('');
        taskId++
    })

    $('span').bind('dblclick',function(){
        $(this).attr('contentEditable',true)
    });
})