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
    list.innerHTML = '<a href="#0" data-dir = "prev" class="slider__prev desktop-shown js-slider-link">Prev</a><a href="#0" data-dir = "next" class="slider__next desktop-shown js-slider-link">Next</a>';
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

  if(options.arrows) {

      self.list.onclick = onArrowsClick;
  }

    var slider_list = self.elem.children[0].children[0];
    var sliderCtrls = self.elem.querySelectorAll('.slider__controls a');
    var slen=sliderCtrls.length;
    var slideWidth, slider_list_width;
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

    function onArrowsClick(e){
      if(self.list.classList.contains('in-progress')) return;
      self.list.classList.add('in-progress');
      var e = e || window.event;
      var target = e.target;
      if(target.classList.contains('js-slider-link')){
        var dir = target.dataset.dir ==='prev'? 1:-1;
        var marginLeft = parseInt(getComputedStyle(document.querySelector('.slider__list')).marginLeft) + slideWidth*dir;

        if(marginLeft <= -slider_list_width) marginLeft = 0;

        if(marginLeft > 0) marginLeft = -slider_list_width+slideWidth;
        self.list.style.marginLeft = marginLeft + 'px';
        setTimeout(function(){
          self.list.classList.remove('in-progress');
        }, 400);
      }

    };

    function onResize(){

    slideWidth = parseInt(getComputedStyle(self.elem.querySelector('.slider__item')).width);
    slider_list_width = slideWidth*slen;
    slider_list.style.width = slider_list_width + 'px';

    };
    // window.onresize = onResize;
};
