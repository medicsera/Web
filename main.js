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
        const $newTask = $(newTask).css({opacity: 0});
        $('.task').append($newTask);
        setTimeout(function() {
        $newTask.css({opacity: 1});
        }, 10);
        $('.add-task-input').val('');
        taskId++
    })

    $('span').bind('dblclick',function(){
        $(this).attr('contentEditable',true)
    }).blur(
        function(){
            $(this).attr('contentEditable',false)
        }
    )

    $(document).on('change','.task-checkbox',function(){
        const $taskText = $(this).closest('.task-item').find('.task-text');
        $taskText.toggleClass('task-text--done',$(this).is(':checked'));
    })

    $(document).on('click','.task-btn',function(){
        const $task = $(this).closest('.task-item')
        $task.addClass('removing');
        setTimeout(function(){
            $task.remove();
        },500);
    })


})