
var menuToggleBtn = document.querySelector('.js-menu-toggle');
var menu;
menuToggleBtn.onclick = function(){
  document.querySelector('.page-top').classList.toggle('menu-opened');
  if(!menu) createMenu('.js-menu');

};

function toggleMenu(){
  document.querySelector('.page-top').classList.toggle('menu-opened');
};

function createMenu(selector){
  this.elem = document.querySelector(selector);
  menu = this.elem;

  menu.onclick = function(e){
    var e = e || window.event;
    var target = e.target;

    this.close = function(){
      document.querySelector('.page-top').classList.remove('menu-opened');
    };

    if(target.tagName === "A") {
      this.close();
    }
  };
};
