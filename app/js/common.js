// custom menu toggle
// custom menu toggle


let burgerBtn = document.querySelector('.hamburger.toggle-menu-btn');
let headerCont = document.querySelector('.header-content');
let navMenuCont = document.querySelector('.my-menu');

function topMenuToggle() {
    //remove listener for closing menu if necessary
    headerCont.removeEventListener('click', topMenuToggle);

    //menu collapse
    burgerBtn.classList.toggle('is-active');
    headerCont.classList.toggle('collapsed-header-cont');
    navMenuCont.classList.toggle('collapsed-my-menu');

    //body mute scrolling
    $('body').toggleClass('stop-scrolling');

    // add listener for closing menu only if menu is openning by this func
    window.setTimeout(function () {
        if (document.body.classList.contains('stop-scrolling')){
            headerCont.addEventListener('click', topMenuToggle);
            $(window).scrollTop(0);
        }
    }, 400);
}

burgerBtn.addEventListener('click', topMenuToggle);

// wrap some el in spans
function wrapFirstWordinSpan(elementsSelectorsArr) {
    for (let selector of elementsSelectorsArr){
        $(selector).each(function () {
            let ths = $(this);
            ths.html(ths.html().replace(/(\S+)\s/,'<span>$1</span>'));
        })
    }
}

wrapFirstWordinSpan([
    '.fotorama-descr-bl .fotorama-descr-headline',
    '.feedback-headline',
]);


// services slider
// services slider

function calculateAmountOfSlides(maxSlides, brakepoints){
    let screenWidth = Number(document.body.offsetWidth);
    for (let point of brakepoints){
        if (screenWidth < point && maxSlides > 1){
            maxSlides--;
        }
    }
    return maxSlides
}
function getSlideWidth(amountOfSlides){
    return  Math.ceil(Number(document.body.offsetWidth) /amountOfSlides);
}

$(document).ready(() => {
    let serviceSlider = $('.service-slider').bxSlider({
        prevSelector: '.bx-prev-sel',
        nextSelector: '.bx-next-sel',
        wrapperClass: 'service-slider',
        pager: false,
        minSlides: 1,
        maxSlides: 3,
        slideWidth: getSlideWidth(calculateAmountOfSlides(3, [1100, 820])), // returns slide width
    });

    $(window).resize(function() {
        serviceSlider.destroySlider(); //rebuild the slider on resize
        serviceSlider = $('.service-slider').bxSlider({
            prevSelector: '.bx-prev-sel',
            nextSelector: '.bx-next-sel',
            wrapperClass: 'service-slider',
            pager: false,
            minSlides: 1,
            maxSlides: 3,
            slideWidth: getSlideWidth(calculateAmountOfSlides(3, [1100, 820])), // returns slide width
        });
    });
});

// fotorama fix
let intervalID = setInterval(function () {
    let arrowNext = document.querySelectorAll('.fotorama__arr--next');
    let arrowPrev = document.querySelectorAll('.fotorama__arr--prev');
    if (arrowNext && arrowPrev) {
        for (let arrow of arrowNext) {
            arrow.innerHTML += '<i class="fas fa-angle-right"></i>';
        }
        for (let arrow of arrowPrev) {
            arrow.innerHTML += '<i class="fas fa-angle-left"></i>';
        }
        clearInterval(intervalID);
    }
}, 1000);

//custom select
$('.callback-form-select').selectize({
    create: true,
    //sortField: 'text'
});

// form js
$("form.callback-form").submit(function() { //Change
    var th = $(this);
    $.ajax({
        type: "POST",
        url: "mail.php", //Change
        data: th.serialize()
    }).done(function() {
        $(th).find('.callback-form-success').addClass('active').hide().fadeIn();
        setTimeout(function() {
            // Done Functions
            th.trigger("reset");
            $(th).find('.callback-form-success').removeClass('active').fadeOut();
        }, 3500);
    });
    return false;
});

// feedback slider

$('.bx-feedback-slider').bxSlider({
    adaptiveHeight: true
});

// our partners slider

let partnersBxSilder = $('.our-partners-bx-slider').bxSlider({
    pager: false,
    auto: Number(document.body.offsetWidth) < 480 ? true : false,
    minSlides: 1,
    maxSlides: 4,
    moveSlides: 1,
    slideWidth: 236,
    prevSelector: '.left-arr-bx-our-partners',
    nextSelector: '.right-arr-bx-our-partners',
});

// go top pill js
$(window).scroll(function() {
    if($(this).scrollTop() > $(this).height()){
        $('.top').addClass('active');
    }
    else {
        $('.top').removeClass('active');
    }
});

let goTopBlock = document.querySelector('.top');
goTopBlock.addEventListener('click', function() {
    $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');

});
//preloader js
$(window).on('load', function (){
    $('.preloader').delay(1000).fadeOut('slow');
});
