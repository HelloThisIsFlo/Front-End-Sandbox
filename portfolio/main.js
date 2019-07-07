$(".project__preview__visit").hover(
  function(e) {
    $(e.target)
      .siblings(".project__preview__img")
      .addClass("project__preview__img__hover");
  },
  function(e) {
    $(e.target)
      .siblings(".project__preview__img")
      .removeClass("project__preview__img__hover");
  }
);

// const folded = new OriDomi(".featured")
// const paperfold = $('#test').paperfold({duration: 5000, isOpen: true});
