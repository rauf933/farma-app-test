import '../styles/index.scss';
import '../styles/email.scss';

var question_data = require('./question-db.json');

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}



$(function() {

  /*========== Functions Handler buttons ========*/
  
  /*-----Function Show Hide Player ------*/
  const buttonHandlerShow = Array.from(document.querySelectorAll('.button_toggle_show'));
  
  buttonHandlerShow.forEach(button=>{button.addEventListener('click', toggleShowVideo)})
  
  function toggleShowVideo(e){
    const eventButton = e.target.getAttribute('data-show');
    const popupVideo = document.getElementById('popup-video-wrap');
    
    if(eventButton==='show'){
      popupVideo.classList.add('active');
    }else{
      changeButtonType(btnPlayPause, 'play', '../public/images/icon/play.svg');
      player.pause();
      popupVideo.classList.remove('active');
    }
    
  }
  
  
  /*------- Function Controls Player -----*/
  
  const player = document.getElementById('video-element');
  const btnPlayPause = document.getElementById('play-pause');
  const g = document.querySelector('.video__player')
 
  
  player.addEventListener('click', playPauseVideo);
  btnPlayPause.addEventListener('click', playPauseVideo);
  
  function playPauseVideo() {
    const frame = document.querySelector('.video__player_frame');
    if (player.paused || player.ended) {
      frame.classList.remove('pause')
        changeButtonType(btnPlayPause, 'pause');
        player.play();
    } else {
     
    frame.classList.add('pause')
        btnPlayPause.classList.remove('play')
        changeButtonType(btnPlayPause, 'play');
        player.pause();
    }
  }
  
  function changeButtonType(btn, value) {
    btn.className = value;
  }
  
  
  /*======== Questions handler ===============*/
  renderQuestion()
  
  function renderQuestion(){
    
    const qiestion_container = document.getElementById('question-container');
    
    question_data.forEach((item, index)=>{
      
    var div_block = document.createElement('div')
    const lengh_quest = question_data.length
    div_block.classList.add('question__block')
    
    /*-----questions ----*/
    
    var block_child_questions = document.createElement('div');
    block_child_questions.classList.add('question__block_item');
    
 
    
    item.answers.forEach(child=>{
      var div_button = document.createElement('div')
      div_button.classList.add('question__block_button')
      var button = document.createElement('button');
      button.setAttribute('id', `button-id-${child.id}`)
      button.classList.add('block')
      
      var block_answer = document.createElement('div')
      block_answer.classList.add('question__block_answer', 'd-none')
      block_answer.setAttribute('id', `block-answer-${child.id}`)

      button.addEventListener('click', ()=>handlerButtonQuestion(child.id, child.status))
      
      button.innerHTML = `
      <div class="border">
        <p>${child.value}</p>
      </div>
      `
      
      block_answer.innerHTML = `
      <p class="question__block_answer_statusMessage">${child.message}</p>
      <p class="question__block_answer_text">${child.description}</p>
      `
      
      div_button.append(button)
      div_button.append(block_answer)
      block_child_questions.append(div_button)
    })
    

    let p_title = document.createElement('p')
    p_title.classList.add('question__block_number')
    p_title.innerHTML = `${index+1} вопрос из ${lengh_quest}`
    
    let p_question = document.createElement('p')
    p_question.classList.add('question__block_desc')
    p_question.innerHTML = item.question

    
    div_block.appendChild(p_title)
    div_block.appendChild(p_question)
    div_block.appendChild(block_child_questions)
    

    qiestion_container.appendChild(div_block)
    
    })
    
  }
  
  function handlerButtonQuestion(id, status){
    let answer_block = document.getElementById(`block-answer-${id}`)
    answer_block.classList.remove('d-none')
    let button = document.getElementById(`button-id-${id}`)
    if(status===200){
      button.classList.add('button-success')
      answer_block.classList.add('answer-success')
    }else{
      button.classList.add('button-error')
      answer_block.classList.add('answer-error')
    }
  
  }
  
  
});