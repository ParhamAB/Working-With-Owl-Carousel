var Albums;
var Pictures;

// Getting Imgs Arr and Albums Arr in Load

$(document).ready(function () {
    fetch('https://jsonplaceholder.typicode.com/users/1/albums')
        .then((response) => response.json())
        .then((json) => Albums = (json));
    fetch(`https://jsonplaceholder.typicode.com/albums/1/photos`)
        .then((response) => response.json())
        .then((json) => Pictures = (json));
});

// Generating Img Elements and Owl Carousel

function ShowPic() {
    $('.js-carousel').empty();
    for (let i = 0; i < Pictures.length; i++) {
        let body = $(`
            <div id="${i}" data-bs-toggle="modal" data-bs-target="#modal-simple">
                <div class="media">
                    <img src="${Pictures[i].thumbnailUrl}" class="img-fluid">
                </div>
            </div>
        `)
        body.click(ModalImg);
        $('.js-carousel').append(body);
    }
    $('.js-carousel').owlCarousel({
        loop: false,
        stagePadding: 0,
        margin: 80,
        autoPlay: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        nav: true,
        dots: true,
        items: 3,
        navText: ['<span> < </span>', '<span> > </span>'],
        responsive: {
            0: {
                items: 1,
                dots: false
            },
            600: {
                items: 2,
                dots: false
            },
            1000: {
                items: 3
            },
            1400: {
                items: 4
            },
            1800: {
                items: 5
            }
        }
    })
}

// Changing Img Elements in owl-Carousel Class

function changeImg() {
    setTimeout(() => {
        for (let i = 0; i < Pictures.length; i++) {
            let child = $(`
            <div class="media">
                <img src="${Pictures[i].thumbnailUrl}" class="img-fluid">
            </div>
            `);
            $(`#${i}`).empty().append(child);
        }
    }, 500);
}

// Getting Img Arr from Top in Section Albums and Calling ChangeImg Func

function getImg() {
    let id = $(this).attr('id').replace(/[^0-9]/g, '');
    $('input.active').removeClass('active');
    $(this).addClass('active');
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
        .then((response) => response.json())
        .then((json) => Pictures = (json));
    changeImg();
}

// Setting Img in Modal

function ModalImg() {
    let PicId = $(this).attr('id').replace(/[^0-9]/g, '');
    let AlbId = $('input.active').attr('id').replace(/[^0-9]/g, '');
    $('#modal-img').attr('src', Pictures[PicId].url);
    $('.modal-title').text(`
    Album ID : ${AlbId}  ||  Picture ID : ${(((Number)(AlbId) - 1) * 50) + (Number)(PicId) + 1}  ||  Url : ${Pictures[PicId].url}`);
}

// Generating Albums Btn Elements and Calling ShowPic Func

setTimeout(() => {
    $(document).ready(function () {
        for (let i = 0; i < Albums.length; i++) {
            let body = $(`<div></div>`).addClass('title-name')
            let str = ""
            if (i == 0) {
                str = "active"
            }
            let btn = $(`<input class="w-100 h-50 btn btn-outline-primary ${str}" type="button" value="${Albums[i].title}" id="${Albums[i].id}-album">`)
            btn.click(getImg);
            body.append(btn);
            $('#row-overflow').append(body);
        }
    });
    ShowPic();
}, 700);
