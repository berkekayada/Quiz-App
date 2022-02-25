var q1=new Question('Ezelde tevfik i kim vurdu?',['Ramiz Dayı','Temmuzun Oğlu','Ali','Temmuz'],'Temmuzun Oğlu');
var q2=new Question('Ronaldoya futbolu kim öğretti',['Quaresma','Sezai','Serdar Ortaç','Abdulhey'],'Quaresma');
var q3=new Question('Ayakkabı bağcının ucuna ne denir',['Aglet','Ciglet','Baglet','Anan'],'Aglet');
var questions=[q1,q2,q3];
function Question(text,selection,answer){
    this.text=text,
    this.selection=selection,
    this.answer=answer;
}
Question.prototype.checkAnswer=function(answer){
    return this.answer===answer;
}
function Quiz(questions){
    this.questions=questions,
    this.point=0,
    this.questionIndex=0;
}

Quiz.prototype.getQuestion=function(){
    return this.questions[this.questionIndex]
}
Quiz.prototype.Finish=function(){
    return this.questions.length===this.questionIndex;
}
Quiz.prototype.guess=function(answer){
    var questions=this.getQuestion();
    if(questions.checkAnswer(answer)){
        this.point++;
    }
    this.questionIndex++;
}
var quiz=new Quiz(questions)
loadQuestion();
function loadQuestion(){
    if(quiz.Finish()){
        QuizFinished()
    }
    var question=quiz.getQuestion();
    var selection=question.selection;
    document.querySelector('#question').textContent=question.text;
     for (let i = 0; i < selection.length; i++) {
         var element = document.querySelector('#reply'+i) 
         element.innerHTML=selection[i];
         guess('btn'+i,selection[i]);
     }
}
function guess(id,guess){
    var btn=document.getElementById(id);
    btn.onclick=function(){
        quiz.guess(guess);
        loadQuestion();
    }
}
function QuizFinished(){
    document.querySelector('#question').style.display='none';
    buttons=document.querySelector('#buttons').style.display='none';
    var card =document.querySelector('.card-body');
    const div = document.createElement("div");
    div.classList.add('flex')
    const cancelQuiz = document.createElement("button");
    cancelQuiz.textContent='Sınavı İptal Et'
    cancelQuiz.className='btn btn-primary'
    cancelQuiz.addEventListener('click',function(){
        window.location.reload()
    })
    const replyQuiz = document.createElement("button");
    replyQuiz.textContent='Sınavı bitir'
    replyQuiz.className='btn btn-primary'
    replyQuiz.addEventListener('click',function(){
        showScore();
    })
   card.appendChild(div);
   div.appendChild(replyQuiz);
   div.append(cancelQuiz);

}
function showScore(){
 var html=`<h2><h4> Puanınız:${quiz.point}</h4></h2>`
 document.querySelector('.card-body').innerHTML=html;
}