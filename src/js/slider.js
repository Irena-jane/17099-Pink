function Slider(options){
  var self = this;
  this.selector = options.selector;
  this.elem = document.querySelector(this.selector);
  this.items = this.elem.children;

  var inner_clss = 'slider__inner';
  var list_clss = 'slider__list';
  var item_clss = 'slider__item';
  var controls_clss = 'slider__controls';


  var inner = document.createElement('div');
  inner.classList.add(inner_clss, (options.inner_clss || inner_clss));
  var list = document.createElement('div');
  list.classList.add(list_clss, (options.list_clss || list_clss));
  self.list = list;
  var controls =  document.createElement('div');
  controls.classList.add(controls_clss, (options.controls_clss || controls_clss));
  controls.innerHTML = '<div class="slider__ctrl-inner"><a class="active" href="#0">1</a><a href="#0">2</a><a href="#0">3</a></div>';

  if(options.arrows) {
    list.innerHTML = '<a href="#0" class="slider__prev desktop-shown">Prev</a><a href="#0" class="slider__next desktop-shown">Next</a>';
  }


  for(var i = this.items.length-1;i > -1;i--){
    var item = document.createElement('div');
    item.classList.add(item_clss , (options.item_clss || item_clss));
    item.appendChild(this.items[i]);
    list.insertBefore(item, list.firstChild || null);
  }
  inner.appendChild(list);
  this.elem.appendChild(inner);
  this.elem.appendChild(controls);

  // if(option.arrows) {
  //   var prev = document.querySelector('.slider__prev');
  //   var next = document.querySelector('.slider__next');

  // }

  // function onArrowClick(e){
  //   var e = e || window.event;
  //   var target = e.target;

  //   if()
  // };

    var slider_list = self.elem.children[0].children[0];
    var sliderCtrls = self.elem.querySelectorAll('.slider__controls a');
    var slen=sliderCtrls.length;
    var slideWidth;
    onResize();

    var slides = self.elem.querySelectorAll(self.selector+'__item');

    for(var i=0; i<slen;i++){
      sliderCtrls[i].onclick = showSlide;
    }
    function showSlide(e){
      showSlide.go = true;
      e.preventDefault();

      for(var i=0, slen=sliderCtrls.length; i<slen;i++){
      if(sliderCtrls[i].classList.contains('active')) {
        sliderCtrls[i].classList.remove('active');
        }
      }
      this.classList.add('active');

      showSlide.prev = showSlide.prev? showSlide.prev : self.list.children[0];
      showSlide.prev.classList.remove('slide-item-active');

      var numSlide = parseInt(this.innerHTML);
      self.list.style.marginLeft = -(numSlide-1)*slideWidth + 'px';
      setTimeout(function(){
        self.list.children[(numSlide-1)].classList.add('slide-item-active');
        showSlide.go = false;
      },1000)
      showSlide.prev = self.list.children[(numSlide-1)];
    };

    function onResize(){

    slideWidth = parseInt(getComputedStyle(self.elem.querySelector('.slider__item')).width);


    // console.log(slideWidth);
    };
    window.onresize = onResize;
};
