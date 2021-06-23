import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');

$(function() {

  const block_hide = document.querySelector('.block_hide');
  const block_view = document.querySelector('.block_view');
  const hide_view_box = document.querySelector('.hide_view_box');

  block_view.addEventListener('click', (e) => {
    e.preventDefault();

    block_view.style.display = 'none';
    block_hide.style.display = 'block';
    hide_view_box.style.display = 'block';
  })

  block_hide.addEventListener('click', (e) => {
    e.preventDefault();

    block_hide.style.display = 'none';
    block_view.style.display = 'block';
    hide_view_box.style.display = 'none';
  })

  // $("._1").on("click","a", function (event) {
  //   event.preventDefault();
  //   var id  = $(this).attr('href'),
  //       top = $(id).offset().top;
  //   $('body,html').animate({scrollTop: top}, 1500);
  // });


  $('.popup').magnificPopup();

});