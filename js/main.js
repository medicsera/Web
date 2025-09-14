$(function($){
    let sections = $('section'),
    nav = $('nav'), 
    nav_height = nav.outerHeight();
    $(window).on('scroll', function () {
        console.log('removeClass')
        let cur_pos = $(this).scrollTop(); 
        sections.each(function() {
            let top = $(this).offset().top - nav_height - 50,
            bottom = top + $(this).outerHeight();    
            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find('a').removeClass('active');
                sections.removeClass('active');
                console.log('removeClass')    
                $(this).addClass('active');
                nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
            }
        });
    });
    
})