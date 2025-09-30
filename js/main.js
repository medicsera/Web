$(function ($) {
  let sections = $("section"),
    nav = $("nav"),
    nav_height = nav.outerHeight();
  $(window).on("scroll", function () {
    let cur_pos = $(this).scrollTop();
    sections.each(function () {
      let top = $(this).offset().top - nav_height - 50,
        bottom = top + $(this).outerHeight();
      if (cur_pos >= top && cur_pos <= bottom) {
        nav.find("a").removeClass("active");
        sections.removeClass("active");
        $(this).addClass("active");
        nav.find('a[href="#' + $(this).attr("id") + '"]').addClass("active");
      }
    });
  });

  nav.find("a").on("click", function () {
    let $el = $(this),
      id = $el.attr("href");
    $("html, body").animate(
      {
        scrollTop: $(id).offset().top - nav_height,
      },
      600
    );
    return false;
  });

  const $toTopBtn = $("#toTop");
  const showAt = 200;

  $(window).on("scroll", () => {
    const y = $(window).scrollTop();
    if (y > showAt) {
      if ($toTopBtn.prop("hidden")) $toTopBtn.prop("hidden", false);
      $toTopBtn.addClass("is-visible");
    } else {
      $toTopBtn.removeClass("is-visible");
      setTimeout(() => {
        if (!$toTopBtn.hasClass("is-visible")) $toTopBtn.prop("hidden", true);
      }, 250);
    }
  });

  $toTopBtn.on("click", (e) => {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  const $wrap = $(".header-right-drop");
  const $menuBtn = $wrap.find(".right-strip");
  const $dd = $wrap.find(".header-dropdown");
  const $nav = $("nav.nav");

  function getNavH() {
    return $nav.outerHeight() || 0;
  }

  function openDD() {
    $wrap.addClass("open");
    $menuBtn.attr({ "aria-expanded": "true" });
    $dd.attr({ "aria-hidden": "false" });
  }
  function closeDD() {
    $wrap.removeClass("open");
    $menuBtn.attr({ "aria-expanded": "false" });
    $dd.attr({ "aria-hidden": "true" });
  }

  $menuBtn.on("click", (e) => {
    e.preventDefault();
    $wrap.hasClass("open") ? closeDD() : openDD();
  });

  $dd.on("click", "a.nav-links", function (e) {
    const href = $(this).attr("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const $t = $(href);
      if ($t.length) {
        $("html, body").animate(
          { scrollTop: $t.offset().top - getNavH() },
          500
        );
      }
      closeDD();
    }
  });

  $(document).on("click", (e) => {
    if (!$wrap.is(e.target) && $wrap.has(e.target).length === 0) {
      closeDD();
    }
  });

  $(document).on("keydown", (e) => {
    if (e.key === "Escape") closeDD();
  });

  $(window).on("resize", () => {
    if (window.innerWidth > 767) closeDD();
  });

  $("#openModal").on("click", function () {
    $("#modalFeedback").fadeIn(200);
  });

  $("#modalFeedback .close").on("click", function () {
    $("#modalFeedback").fadeOut(200);
  });

  $("#modalFeedback").on("click", function (e) {
    if ($(e.target).is("#modalFeedback")) {
      $("#modalFeedback").fadeOut(200);
    }
  });

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    $("#formResult").text("Sending");

    $.ajax({
      url: "url",
      type: "POST",
      data: $(this).serialize(),
      dataType: "json",
      beforeSend: function () {
        $("#contactForm button").attr("disabled", true);
      },
      success: function (responce) {},
      error: function () {},
    });

    setTimeout(function () {
      $("#formResult").text("Thanks! Message sended");
      $("#contactForm")[0].reset();
      $("#contactForm button").attr("disabled", false);
    }, 1000);
  });
});
