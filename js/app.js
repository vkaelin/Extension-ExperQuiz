// CSS
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('style.css');
(document.head||document.documentElement).appendChild(style);

// Score
var actualScore = document.querySelector('.brief-card.score strong');

// Si le score existe
if (actualScore) {
  var scoreText = actualScore.textContent.split('/')[0];
  addForm(scoreText);
  drawScores();
  addHiddenBtn();
}


function addForm(scoreText) {
  var container = document.querySelector('.pqs-list');
  var form = document.createElement('form');
  form.id = 'sendScore';
  var input = document.createElement('input');
  input.id = 'q';
  input.placeholder = 'Votre prénom';
  var btn = document.createElement('button');
  btn.innerText = 'Envoyer';
  form.appendChild(input);
  form.appendChild(btn);

  form.addEventListener('submit', function(e) { // envoi du formulaire
    e.preventDefault();
    if(input.value !== null && input.value !== "") { // si le prénom n'est pas vide
      if(localStorage["bestScores"]) { // A partir du 2ème score
        localStorage["bestScores"] += (',' + scoreText + '- ' +  input.value);
      } else { // 1er score
        localStorage["bestScores"] = (scoreText + '- ' +  input.value);
      }
    }
    console.log(input.value + '-' + scoreText);
    drawScores();
    form.className = 'disabled';
    createReplayBtn(container, form);
  })
  container.appendChild(form);
}


function createReplayBtn(container, form) {
  var replayBtn = document.createElement('a');
  replayBtn.className = 'replay';
  replayBtn.textContent = 'Rejouer';
  replayBtn.setAttribute('href', 'http://www.experquiz.com/xq/quizzetml2018siteweb');
  container.insertBefore(replayBtn, form);
}


function drawScores() {
  if(!localStorage["bestScores"])
	  return;
  removeOldScores();
  var container = document.querySelector('.pqs-list');
  var title = document.createElement('h2');
  title.className = 'scores-title';
  title.textContent = 'Meilleures scores';
  var listScores = document.createElement('ol');
  listScores.className = 'list-scores';
  container.appendChild(title);
  container.appendChild(listScores);
  var allLocalScores = localStorage["bestScores"].split(',');
  allLocalScores.sort().reverse();
  allLocalScores.forEach(e => {
    var li = document.createElement('li');
    li.innerText = e;
    listScores.appendChild(li);
  });
}


function removeOldScores() {
  var l = document.querySelector('.list-scores');
  var t = document.querySelector('.scores-title');
  if(l) {
    l.parentNode.removeChild(l);
    t.parentNode.removeChild(t);
  } 
}


/* Bouton caché pour reset le localStorage */
function addHiddenBtn() {
 var resetStorageBtn = document.createElement('button');
 resetStorageBtn.className = 'reset-storage';
 resetStorageBtn.addEventListener('click', function() {
   console.log('RESET LOCAL STORAGE');
   localStorage.clear();
 })
 var body = document.querySelector('body');
 body.appendChild(resetStorageBtn);
}