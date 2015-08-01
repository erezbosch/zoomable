$.Zoomable = function (el) {
  this.$el = $(el);
  this.focusSize = 50;
  this.$img = this.$el.find('img');
  this.$focusBox = $('<div class="focus-box"></div>')
                  .css('height', this.focusSize)
                  .css('width', this.focusSize);
  this.$el.on("mousemove",this.$img, this.showFocusBox.bind(this));
  this.$el.on("mouseleave", this.$img, this.hideFocusBox.bind(this));
  this.$zoomedImage = $('<div class="zoomed-image"></div>');
  var imgCopy = new Image();
  imgCopy.src = this.$img.attr('src');
  var widthInPx = this.$el.css('width');
  this.xMax = parseInt(widthInPx.substring(0, widthInPx.length - 2));
  this.yMax = this.xMax * imgCopy.height / imgCopy.width;
}

$.Zoomable.prototype.showFocusBox = function (e) {

  var left = Math.max(e.pageX - (this.focusSize / 2), 0);
  left = Math.min(left, this.xMax - this.focusSize);
  var top = Math.max(e.pageY - (this.focusSize / 2), 0);
  top = Math.min(top, this.yMax - this.focusSize);

  this.$focusBox.css('left', left).css('top', top);
  if (!this.$el.find('focus-box').length) {
    this.$el.append(this.$focusBox);
  }

  this.showZoom(left, top);
}

$.Zoomable.prototype.showZoom = function (xDiff, yDiff) {
  var windowHeight = $(window).height();
  var windowWidth = $(window).width();
  var str = ""
  str += Math.floor(xDiff / (this.xMax - this.focusSize) * 100);
  str += "% ";
  str += Math.floor(yDiff / (this.yMax - this.focusSize) * 100);
  str += "%"
  this.$zoomedImage.css("width", windowHeight)
              .css("background-image", 'url(' + this.$img.attr("src") + ')')
              .css("background-size", windowHeight / this.focusSize * this.xMax)
              .css("background-position", str);
  if (!$('body').find('.zoomed-image').length) {
    $('body').append(this.$zoomedImage);
  }
};

$.Zoomable.prototype.hideFocusBox = function (e) {
  this.$focusBox.remove();
  this.$zoomedImage.remove();
}

$.fn.zoomable = function () {
  return this.each(function () {
    new $.Zoomable(this);
  })
}
