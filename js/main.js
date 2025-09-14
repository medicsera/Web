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

    nav.find('a').on('click', function () {
        let $el = $(this), 
        id = $el.attr('href'); 
        $('html, body').animate({
            scrollTop: $(id).offset().top - nav_height
        }, 600);
        return false;
    });

    
    const $btn = $('#toTop');
    const showAt = 200;

    $(window).on('scroll', () => {
        const y = $(window).scrollTop();
        if (y > showAt) {
        if ($btn.prop('hidden')) $btn.prop('hidden', false);
        $btn.addClass('is-visible');
        } else {
        $btn.removeClass('is-visible');

        setTimeout(() => {
            if (!$btn.hasClass('is-visible')) $btn.prop('hidden', true);
        }, 250);
        }
    });

    $btn.on('click', (e) => {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
})