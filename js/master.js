function handleActive(el){
  el.parentElement.querySelectorAll(".active").forEach(function(element){
    element.classList.remove("active")
  })
  el.classList.add("active")
}
let mainColor = localStorage.getItem("data-color")
if(mainColor!=null){
  document.documentElement.style.setProperty("--main-color",mainColor)
  document.querySelectorAll(" .setting-box ul li").forEach(function(element){
    element.classList.remove("active")
    if(element.getAttribute("data-color") === mainColor){
      element.classList.add("active")
    }
  })
}
let colorList = document.querySelectorAll(".option-color li");
colorList.forEach(function(li){
  li.addEventListener("click",function(){
    document.documentElement.style.setProperty("--main-color",li.getAttribute("data-color"));
    localStorage.setItem("data-color",li.getAttribute("data-color"));
    handleActive(li);
  })
})

  document.querySelector(".setting-box .setting-gear").onclick=function(){
  document.querySelector(".setting-box .setting-gear svg").classList.toggle("fa-spin");
  document.querySelector(".setting-box").classList.toggle("open");
}

// nav bullets
let bullets = document.querySelectorAll(".nav-bullets .bullet")
let links = document.querySelectorAll(".heading ul li a")
function scrollToSection(elements){
  elements.forEach(ele =>{
    ele.addEventListener('click',(e)=>{
      document.querySelector(ele.getAttribute('data-section')).scrollIntoView({behavior:'smooth'});
      e.preventDefault();
    })
  })
}
scrollToSection(bullets);
scrollToSection(links)
//bullets option
let bulletOptions = document.querySelectorAll('.option-bullets span');
let navBullet = document.querySelector('.nav-bullets')
let storageDisplay = localStorage.getItem('bullet-display');
if(storageDisplay !== null){
  navBullet.style.display = storageDisplay;
  bulletOptions.forEach(ele=>{
    ele.classList.remove('active');
  });
  if(storageDisplay === 'block'){
    document.querySelector('.option-bullets span.yes').classList.add("active");
  }
  else{
    document.querySelector('.option-bullets span.no').classList.add("active");
  }
}
bulletOptions.forEach(ele=>{
  ele.addEventListener('click',(ev) => {
    navBullet.style.display = ele.getAttribute('data-display')
    handleActive(ele)
    localStorage.setItem("bullet-display", ele.getAttribute('data-display'));
  })
})


//shuffle the landing background
let landingImage = document.querySelector(".landing");
let imagesSource = ["landing-background","landing-background1","landing-background2","landing-background3","landing-background4"];

function backgroundShuffle(checkInterver){
  if(checkInterver){
    intervel = setInterval(function(){
      let randNumber = Math.floor(Math.random()*imagesSource.length);
      landingImage.style.backgroundImage="url('../imgs/"+imagesSource[randNumber]+".jpg')";
    },10000)
  }
  else{
    clearInterval(intervel)
  }
}
//background option
let checkInterver = true;
let intervel;
let storageOption = localStorage.getItem("background-option")
if(storageOption === "yes"){
  checkInterver = true;
}
else{
  checkInterver = false;
}
if(storageOption !== null){
  document.querySelectorAll(".setting-content .option-color span").forEach(element =>{
    element.classList.remove("active");
    if(element.getAttribute("random-background") === storageOption){
      element.classList.add("active");
    }
  })
}
let backOptions = document.querySelectorAll(".setting-content .option-color span");
backgroundShuffle(checkInterver);
backOptions.forEach(function(span){

  span.addEventListener("click",function(){
    handleActive(span);
    let checkValue = span.getAttribute("random-background");
    if(checkValue === "yes"){
      checkInterver = true;
      localStorage.setItem("background-option","yes")
    }
    else{
      checkInterver = false;
      localStorage.setItem("background-option","no")
    }
    backgroundShuffle(checkInterver);
  })
})

// animate the progress on scroll
let skills = document.querySelector('.skills')
let allSkills = document.querySelectorAll('.skills .skill-box .skill-progress span');
    
window.onscroll = function(){
  let skillTop = skills.offsetTop;

  let skillsHeight = skills.offsetHeight;

  let windowHeight = this.innerHeight;

  let currentScroll = this.pageYOffset;
  console.log(currentScroll , skillTop- windowHeight + 140) 
  if(currentScroll > (skillTop- windowHeight + 140)){
    allSkills.forEach(skill => {
      skill.style.width = skill.getAttribute('progress')
    });
  }
  else{
    allSkills.forEach(skill => {
      skill.style.width = 0;
    });
  }
}

// creat popup
let allImages = document.querySelectorAll('.gallery .imgs-box img');
allImages.forEach(element =>{
  element.addEventListener('click', (e)=>{
    let overLay = document.createElement('div');
    overLay.classList.add('pop-overlay');
    document.body.appendChild(overLay);
    let popBox = document.createElement('div');
    popBox.classList.add('pop-box');
    let popImg = document.createElement('img')
    popImg.src = element.src;
    if(element.alt !== null){
      let headingBox = document.createElement('h2');
      let headingTxt = document.createTextNode(element.alt);
      headingBox.appendChild(headingTxt);
      popBox.appendChild(headingBox);
    }
    popBox.appendChild(popImg)
    document.body.appendChild(popBox);
    let closeButton = document.createElement('span')
    let closeTxt = document.createTextNode('X')
    closeButton.appendChild(closeTxt)
    closeButton.classList.add('close-button')
    overLay.appendChild(closeButton);
    overLay.addEventListener('click', (e)=>{
      overLay.remove()
      popBox.remove()
    })
  })
})
//reset button
let resetButton = document.querySelector('.setting-box .reset');
resetButton.addEventListener('click',function(){
  localStorage.clear();
  window.location.reload();
})


//toggle menu
let toggleBar = document.querySelector('.heading .bar-icon');
let menu = document.querySelector('.heading ul');
console.log(menu)
toggleBar.addEventListener('click',(e)=>{
  menu.classList.toggle('open');
  console.log(menu)
  toggleBar.classList.toggle('open');
})
let toggleBarIcon = document.querySelector('.heading .bar-icon svg');
let overlay = document.querySelector('.overlay')
console.log(overlay)
overlay.addEventListener('click',(e)=>{
  menu.classList.remove('open')
  toggleBar.classList.toggle('open');
  console.log(menu)
})
