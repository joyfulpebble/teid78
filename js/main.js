$(function () {
  $(".main-margin").css("margin-top", $(".header").outerHeight());
  $(".menu__submenu").css("padding-top", $(".header").outerHeight());
  $(".menu__item--catalog").css(
    "--height-before",
    $(".header").outerHeight() + "px"
  );

  $(window).on("resize", function () {
    $(".main-margin").css("margin-top", $(".header").outerHeight());
    $(".menu__submenu").css("paddingtop", $(".header").outerHeight());
  });

  $(".main-catalog__item:last-child").css(
    "height",
    $(".main-catalog__item:first-child").outerHeight()
  );

  $(window).on("resize", function () {
    $(".main-catalog__item:last-child").css(
      "height",
      $(".main-catalog__item:first-child").outerHeight()
    );
  });

  if (window.innerWidth > 991) {
    $(".menu__item--catalog").hover(
      function () {
        $(this).addClass("menu__item--active");
        $(".header").addClass("header--active");
        $("body").addClass("menu-hidden");
      },
      function () {
        $(this).removeClass("menu__item--active");
        $(".header").removeClass("header--active");
        $("body").removeClass("menu-hidden");
      }
    );
  } else {
    $(".menu__item--catalog").on("click", function () {
      $(this).toggleClass("menu__item--active");
      $(".menu__submenu").slideToggle();
    });
  }
});

$(document).ready(function () {
  if (localStorage.getItem("cookie_agreement") == null) {
    $(".cookie__popup").removeClass("hide");
  }

  if ($(".leasing").length) {
    const leasingMarquee = $("#leasing__line-inner");
    const leasingWidth = $(".leasing__items").outerWidth();

    let clientsI = 0;
    let interval;

    $("#leasing__line").css(
      "-webkit-transform",
      `translateX(${-leasingWidth}px)`
    );
    $("#leasing__line").css("-ms-transform", `translateX(${-leasingWidth}px)`);
    $("#leasing__line").css("transform", `translateX(${-leasingWidth}px)`);

    leasingMarquee.append(leasingMarquee.find("ul").clone());
    leasingMarquee.append(leasingMarquee.find("ul").clone());

    function reset() {
      clientsI = clientsI - 0.8;

      $("#leasing__line-inner").css(
        "-webkit-transform",
        `translateX(${clientsI}px)`
      );
      $("#leasing__line-inner").css(
        "-ms-transform",
        `translateX(${clientsI}px)`
      );
      $("#leasing__line-inner").css("transform", `translateX(${clientsI}px)`);

      if (clientsI <= -leasingWidth) {
        clientsI = 0;
        clientsI = clientsI - 0.8;
      }
    }

    interval = setInterval(reset, 15);
  }

  function delay(f) {
    let isCooldown = false;

    return function () {
      if (isCooldown) return;

      f.apply(this, arguments);

      isCooldown = true;

      setTimeout(() => (isCooldown = false), 200);
    };
  }

  function menu() {
    if ($(".header__burger").hasClass("header__burger--active")) {
      setTimeout(() => {
        $(this).removeClass("header__burger--active");
      }, 200);

      $(".header__inner-menu").removeClass("header__inner-menu--active");
      $("body").removeClass("hidden");
    } else {
      $(this).addClass("header__burger--active");

      $(".header__inner-menu").addClass("header__inner-menu--active");
      $("body").addClass("hidden");
    }

    if ($(".header__burger").hasClass("header__burger--active-transit")) {
      $(this).removeClass("header__burger--active-transit");
    } else {
      setTimeout(() => {
        $(this).addClass("header__burger--active-transit");
      }, 200);
    }
  }

  document
    .getElementById("header-burger")
    .addEventListener("click", delay(menu));

  if (window.innerWidth > 991) {
    const subMenuHeight = $(".menu__submenu").outerHeight();
    let subMenuWindow;

    if (subMenuHeight > $(window).outerHeight()) {
      subMenuWindow = subMenuHeight - $(window).outerHeight();
    } else {
      subMenuWindow = $(window).outerHeight() - subMenuHeight;
    }

    $(".menu__submenu").css("height", `calc(100vh - ${subMenuWindow}px)`);
  } else {
    $(".menu__submenu").css("height", "");
  }

  $(window).on("resize", function () {
    if (window.innerWidth > 991) {
      $(".menu__submenu").css("height", "");

      const subMenuHeight = $(".menu__submenu").outerHeight();
      let subMenuWindow;

      if (subMenuHeight > $(window).outerHeight()) {
        subMenuWindow = subMenuHeight - $(window).outerHeight();
      } else {
        subMenuWindow = $(window).outerHeight() - subMenuHeight;
      }

      $(".menu__submenu").css("height", `calc(100vh - ${subMenuWindow}px)`);
    } else {
      $(".menu__submenu").css("height", "");
    }
  });
});

$(function () {
  $(".cookie_accept").click(function () {
    localStorage.setItem("cookie_agreement", "true");
    $(".cookie__popup").addClass("hide");
  });

  function delay(f) {
    let isCooldown = false;

    return function () {
      if (isCooldown) return;

      f.apply(this, arguments);

      isCooldown = true;

      setTimeout(() => (isCooldown = false), 200);
    };
  }

  if ($(".main-catalog").length) {
    let $range = $(".catalog__filters-input--one");
    let $rangeTwo = $(".catalog__filters-input--two");

    let from = 0;

    let instance;
    let instanceTwo;

    $range.ionRangeSlider({
      type: "double",
      onStart: updateInputs,
      onChange: updateInputs,
    });

    $rangeTwo.ionRangeSlider({
      type: "double",
      onStart: updateInputsTwo,
      onChange: updateInputsTwo,
    });

    instance = $range.data("ionRangeSlider");
    instanceTwo = $rangeTwo.data("ionRangeSlider");

    function getDecodedText(url) {
      const hashIndex = url.indexOf("#");
      if (hashIndex === -1) return "";

      const encodedText = url.slice(hashIndex + 1);
      return decodeURIComponent(encodedText);
    }

    function hashOpdate() {
      let hashText = getDecodedText(window.location.href);

      if (hashText.length > 0) {
        $(".catalog__names-item").each(function () {
          if ($(this).find(".form-content__text").text().trim() === hashText) {
            $(this).find(".form-content__input-checkbox").prop("checked", true);
            $(".catalog__filters-item--checkbox").click();
          }
        });

        const regex = /^(\D+)(\d+)/;
        const match = hashText.match(regex);

        if (match != null) {
          if (
            Number(match[2]) * 1000 <
            Number($(".catalog__filters-input--one").attr("data-max"))
          ) {
            instance.update({
              to: Number(match[2]) * 1000,
            });

            $(".catalog__filters-item--one-line").addClass(
              "catalog__filters-item--active"
            );

            $(".catalog__filters-max-input--one").val(Number(match[2]) * 1000);
          }
        }

        window.history.replaceState(
          {},
          document.title,
          window.location.href.replace(window.location.hash, "")
        );
      }
    }

    hashOpdate();

    $(window).bind("hashchange", function () {
      hashOpdate();
    });

    $(".catalog__top-btn").each(function () {
      setTimeout(() => {
        $(this).css("width", Math.round($(this).outerWidth()) + 1);

        if ($(this).hasClass("catalog__top-btn--active")) {
          $(this).css(
            "width",
            Math.round($(this).outerWidth()) +
              Math.round($(this).find(".catalog__top-btn--close").outerWidth())
          );
        }
      }, 300);
    });

    $(window).on("resize", function () {
      $(".catalog__top-btn").each(function () {
        $(this).css("width", "");
        $(this).css("width", Math.round($(this).outerWidth()) + 1);

        if ($(this).hasClass("catalog__top-btn--active")) {
          $(this).css("width", "");
          $(this).css(
            "width",
            Math.round($(this).outerWidth()) +
              Math.round($(this).find(".catalog__top-btn--close").outerWidth())
          );
        }
      });
    });

    function catalogBtn(element) {
      element.toggleClass("catalog__top-btn--active");

      if (element.hasClass("catalog__top-btn--active")) {
        element.css(
          "width",
          Math.round(element.outerWidth()) +
            Math.round(element.find(".catalog__top-btn--close").outerWidth())
        );
      } else {
        element.css(
          "width",
          Math.round(element.outerWidth()) -
            Math.round(element.find(".catalog__top-btn--close").outerWidth())
        );
      }
    }

    $(".catalog__top-btn").on(
      "click",
      delay(function () {
        catalogBtn($(this));
      })
    );

    $(".catalog__filters-small").on("click", function () {
      $(".catalog__filters").addClass("catalog__filters--active");
      $("body").addClass("hidden-two");
    });

    $(".catalog__filters-item-top-close").on("click", function () {
      $(".form-content__input-checkbox").prop("checked", false);
      $(".catalog__active-item--checkbox").remove();

      $(".catalog__filters-min-input").val("0");

      $(".catalog__filters-max-input--one").val(
        $(".catalog__filters-input--one").attr("data-max")
      );
      $(".catalog__filters-max-input--two").val(
        $(".catalog__filters-input--two").attr("data-max")
      );

      instance.update({
        from: 0,
        to: $(".catalog__filters-input--one").attr("data-max"),
      });

      instanceTwo.update({
        from: 0,
        to: $(".catalog__filters-input--two").attr("data-max"),
      });

      $(".catalog__filters-item--one-line").removeClass(
        "catalog__filters-item--active"
      );
      $(".catalog__filters-item--two-line").removeClass(
        "catalog__filters-item--active"
      );

      $(".catalog__active-item--line-one").remove();
      $(".catalog__active-item--line-two").remove();

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    });

    $(".catalog__filters-item-top-close, .catalog__filters-item-btn").on(
      "click",
      function () {
        $(".catalog__filters").removeClass("catalog__filters--active");
        $("body").removeClass("hidden-two");
      }
    );

    function updateInputs(data) {
      from = data.from;
      to = data.to;

      $(".catalog__filters-min-input--one").prop("value", from);
      $(".catalog__filters-max-input--one").prop("value", to);

      if (
        from >
          Number(
            $(".catalog__filters-min-input--one")
              .closest(".catalog__filters-item")
              .find(".catalog__filters-input")
              .attr("data-min")
          ) ||
        to <
          Number(
            $(".catalog__filters-min-input--one")
              .closest(".catalog__filters-item")
              .find(".catalog__filters-input")
              .attr("data-max")
          )
      ) {
        $(".catalog__filters-min-input--one")
          .closest(".catalog__filters-item")
          .addClass("catalog__filters-item--active");
      } else {
        $(".catalog__filters-min-input--one")
          .closest(".catalog__filters-item")
          .removeClass("catalog__filters-item--active");
      }
    }

    function updateInputsTwo(data) {
      from = data.from;
      to = data.to;

      $(".catalog__filters-min-input--two").prop("value", from);
      $(".catalog__filters-max-input--two").prop("value", to);

      if (
        from >
          Number(
            $(".catalog__filters-min-input--two")
              .closest(".catalog__filters-item")
              .find(".catalog__filters-input")
              .attr("data-min")
          ) ||
        to <
          Number(
            $(".catalog__filters-min-input--two")
              .closest(".catalog__filters-item")
              .find(".catalog__filters-input")
              .attr("data-max")
          )
      ) {
        $(".catalog__filters-min-input--two")
          .closest(".catalog__filters-item")
          .addClass("catalog__filters-item--active");
      } else {
        $(".catalog__filters-min-input--two")
          .closest(".catalog__filters-item")
          .removeClass("catalog__filters-item--active");
      }
    }

    $(".catalog__filters-min-input").on("input", function () {
      let val = Number($(this).prop("value"));
      const max = $(this)
        .closest(".catalog__filters-item")
        .find(".catalog__filters-input")
        .attr("data-max");
      const min = $(this)
        .closest(".catalog__filters-item")
        .find(".catalog__filters-input")
        .attr("data-min");

      const value = $(this).val();
      const filteredValue = value.replace(/[^0-9]/g, "");

      $(this).val(filteredValue);

      if (val > min) {
        $(this)
          .closest(".catalog__filters-item")
          .addClass("catalog__filters-item--active");
      } else {
        $(this)
          .closest(".catalog__filters-item")
          .removeClass("catalog__filters-item--active");
      }

      if (val <= min) {
        val = min;
      } else if (val >= max) {
        val = max;
        $(this).prop("value", max);
      }

      if ($(this).attr("data-col") === "1") {
        instance.update({
          from: val,
        });
      } else {
        instanceTwo.update({
          from: val,
        });
      }
    });

    $(".catalog__filters-max-input").on("input", function (e) {
      let valMax = Number($(this).prop("value"));
      const max = $(this)
        .closest(".catalog__filters-item")
        .find(".catalog__filters-input")
        .attr("data-max");
      const min = $(this)
        .closest(".catalog__filters-item")
        .find(".catalog__filters-input")
        .attr("data-min");

      const value = $(this).val();
      const filteredValue = value.replace(/[^0-9]/g, "");

      $(this).val(filteredValue);

      if (valMax < max) {
        $(this)
          .closest(".catalog__filters-item")
          .addClass("catalog__filters-item--active");
      } else {
        $(this)
          .closest(".catalog__filters-item")
          .removeClass("catalog__filters-item--active");
      }

      if (valMax <= min) {
        valMax = max;
      } else if (valMax >= max) {
        valMax = max;
        $(this).prop("value", max);
      }

      if ($(this).attr("data-col") === "1") {
        instance.update({
          to: valMax,
        });
      } else {
        instanceTwo.update({
          to: valMax,
        });
      }
    });

    $(".catalog__first-box").on("click", function () {
      $(this).toggleClass("catalog__first--active");
      $(".catalog__first-inner").slideToggle();
      $(".touchable-bg").toggleClass("touchable-bg--active");

      $("body").toggleClass("first-hidden");
    });

    $(".catalog__first-item .form-content__checkbox").on("click", function () {
      $(".catalog__first-active").text(
        $(this).find(".form-content__text").text().trim()
      );
    });

    $(document).click(function (e) {
      const list = $(".catalog__first, .catalog__first");

      if (e.target != list[0] && !list.has(e.target).length) {
        $(".catalog__first-inner").slideUp();
        $(".touchable-bg").removeClass("touchable-bg--active");

        $("body").removeClass("first-hidden");
      }
    });

    if ($(".catalog__active-items li").length === 0) {
      $(".catalog__products-box").css("display", "none");
    }

    $(".catalog__filters-item--checkbox").on("click", function () {
      $(".catalog__active-item--checkbox").remove();

      $(".catalog__names-item").each(function () {
        if ($(this).find(".form-content__input-checkbox").prop("checked")) {
          $(".catalog__products-box").css("display", "block");

          if (
            $(".catalog__products-content").outerWidth() -
              $(".catalog__first").outerWidth() -
              30 >
              $(".catalog__active").outerWidth() ||
            window.innerWidth <= 767
          ) {
            $(".catalog__active-items").append(
              `<li class="catalog__active-item catalog__active-item--checkbox">${$(
                this
              )
                .find(".form-content__text")
                .text()
                .trim()}<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
            );
          }

          if (
            $(".catalog__products-content").outerWidth() -
              $(".catalog__first").outerWidth() -
              30 <
              $(".catalog__active").outerWidth() &&
            window.innerWidth > 767
          ) {
            $(".catalog__active-item:last-child").remove();
          }
        }
      });

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }

      $(".catalog__active-item--checkbox").on("click", function () {
        const $this = $(this);

        $(".catalog__names-item").each(function () {
          if (
            $this.text().trim() ===
            $(this).find(".form-content__text").text().trim()
          ) {
            $(this)
              .find(".form-content__input-checkbox")
              .prop("checked", false);
            $this.remove();
          }
        });

        if ($(".catalog__active-items li").length === 0) {
          $(".catalog__products-box").css("display", "none");
        }
      });

      $(".catalog__active-clear").on("click", function () {
        $(".form-content__input-checkbox").prop("checked", false);
        $(".catalog__active-item--checkbox").remove();

        if ($(".catalog__active-items li").length === 0) {
          $(".catalog__products-box").css("display", "none");
        }
      });
    });

    function lineChange(element) {
      setTimeout(() => {
        $(".catalog__products-box").css("display", "block");

        if (element.attr("data-col") === "1") {
          $(".catalog__active-item--line-one").remove();
        } else {
          $(".catalog__active-item--line-two").remove();
        }

        if (
          $(".catalog__products-content").outerWidth() -
            $(".catalog__first").outerWidth() -
            30 >
            $(".catalog__active").outerWidth() ||
          window.innerWidth <= 767
        ) {
          if (element.attr("data-col") === "1") {
            if (
              element
                .closest(".catalog__filters-item")
                .find(".catalog__filters-min-input--one")
                .val() > 0 ||
              element
                .closest(".catalog__filters-item")
                .find(".catalog__filters-max-input--one")
                .val() < element.attr("data-max")
            ) {
              $(".catalog__active-items").append(
                `<li class="catalog__active-item catalog__active-item--line-one">Грузоподъемность ${element
                  .closest(".catalog__filters-item")
                  .find(".catalog__filters-min-input--one")
                  .val()} — ${element
                  .closest(".catalog__filters-item")
                  .find(".catalog__filters-max-input--one")
                  .val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
              );
            } else {
              $(".catalog__active-item--line-one").remove();
            }
          } else {
            if (
              element
                .closest(".catalog__filters-item")
                .find(".catalog__filters-min-input--two")
                .val() > 0 ||
              element
                .closest(".catalog__filters-item")
                .find(".catalog__filters-max-input--two")
                .val() < element.attr("data-max")
            ) {
              $(".catalog__active-items").append(
                `<li class="catalog__active-item catalog__active-item--line-two">Масса ${element
                  .closest(".catalog__filters-item")
                  .find(".catalog__filters-min-input--two")
                  .val()} — ${element
                  .closest(".catalog__filters-item")
                  .find(".catalog__filters-max-input--two")
                  .val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
              );
            } else {
              $(".catalog__active-item--line-two").remove();
            }
          }
        }

        if (
          $(".catalog__products-content").outerWidth() -
            $(".catalog__first").outerWidth() -
            30 <
            $(".catalog__active").outerWidth() &&
          window.innerWidth > 767
        ) {
          $(".catalog__active-item:last-child").remove();
        }

        if ($(".catalog__active-items li").length === 0) {
          $(".catalog__products-box").css("display", "none");
        }
      }, 1);
    }

    function lineInput(element) {
      $(".catalog__products-box").css("display", "block");

      if (element.attr("data-col") === "1") {
        $(".catalog__active-item--line-one").remove();
      } else {
        $(".catalog__active-item--line-two").remove();
      }

      if (
        element
          .closest(".catalog__filters-item")
          .find(".catalog__filters-input")
          .attr("data-col") === "1"
      ) {
        if (
          element
            .closest(".catalog__filters-item")
            .find(".catalog__filters-min-input--one")
            .val() > element.attr("data-min") ||
          element
            .closest(".catalog__filters-item")
            .find(".catalog__filters-max-input--one")
            .val() < element.attr("data-max")
        ) {
          $(".catalog__active-items").append(
            `<li class="catalog__active-item catalog__active-item--line-one">Грузоподъемность ${$(
              ".catalog__filters-min-input--one"
            ).val()} — ${$(
              ".catalog__filters-max-input--one"
            ).val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
          );
        } else {
          $(".catalog__active-item--line-one").remove();
        }
      } else {
        if (
          element
            .closest(".catalog__filters-item")
            .find(".catalog__filters-min-input--two")
            .val() > element.attr("data-min") ||
          element
            .closest(".catalog__filters-item")
            .find(".catalog__filters-max-input--two")
            .val() < element.attr("data-max")
        ) {
          $(".catalog__active-items").append(
            `<li class="catalog__active-item catalog__active-item--line-two">Масса ${$(
              ".catalog__filters-min-input--two"
            ).val()} — ${$(
              ".catalog__filters-max-input--two"
            ).val()} кг<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
          );
        } else {
          $(".catalog__active-item--line-two").remove();
        }
      }

      if (
        $(".catalog__products-content").outerWidth() -
          $(".catalog__first").outerWidth() -
          30 <
          $(".catalog__active").outerWidth() &&
        window.innerWidth > 767
      ) {
        $(".catalog__active-item:last-child").remove();
      }

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    }

    $(".catalog__filters-input").on("change", function () {
      lineChange($(this));

      setTimeout(() => {
        $(".catalog__active-item--line-one").on("click", function () {
          $(".catalog__filters-min-input--one").val(
            $(".catalog__filters-input--one").attr("data-min")
          );
          $(".catalog__filters-max-input--one").val(
            $(".catalog__filters-input--one").attr("data-max")
          );

          instance.update({
            from: $(".catalog__filters-input--one").attr("data-min"),
            to: $(".catalog__filters-input--one").attr("data-max"),
          });

          $(".catalog__filters-item--one-line").removeClass(
            "catalog__filters-item--active"
          );

          if ($(".catalog__active-items li").length === 0) {
            $(".catalog__products-box").css("display", "none");
          }
        });

        $(".catalog__active-item--line-two").on("click", function () {
          $(".catalog__filters-min-input--two").val(
            $(".catalog__filters-input--two").attr("data-min")
          );
          $(".catalog__filters-max-input--two").val(
            $(".catalog__filters-input--two").attr("data-max")
          );

          instanceTwo.update({
            from: $(".catalog__filters-input--two").attr("data-min"),
            to: $(".catalog__filters-input--two").attr("data-max"),
          });

          $(".catalog__filters-item--two-line").removeClass(
            "catalog__filters-item--active"
          );

          if ($(".catalog__active-items li").length === 0) {
            $(".catalog__products-box").css("display", "none");
          }
        });
      }, 1);

      $(".catalog__active-clear").on("click", function () {
        $(".catalog__filters-min-input").val("0");

        $(".catalog__filters-max-input--one").val(
          $(".catalog__filters-input--one").attr("data-max")
        );
        $(".catalog__filters-max-input--two").val(
          $(".catalog__filters-input--two").attr("data-max")
        );

        instance.update({
          from: 0,
          to: $(".catalog__filters-input--one").attr("data-max"),
        });

        instanceTwo.update({
          from: 0,
          to: $(".catalog__filters-input--two").attr("data-max"),
        });

        $(".catalog__filters-item--one-line").removeClass(
          "catalog__filters-item--active"
        );
        $(".catalog__filters-item--two-line").removeClass(
          "catalog__filters-item--active"
        );

        if ($(".catalog__active-items li").length === 0) {
          $(".catalog__products-box").css("display", "none");
        }
      });
    });

    $(".catalog__filters-min-input, .catalog__filters-max-input").on(
      "input",
      function () {
        lineInput($(this));
      }
    );

    $(".catalog__names-item").each(function () {
      if ($(this).find(".form-content__input-checkbox").prop("checked")) {
        $(".catalog__products-box").css("display", "block");

        if (
          $(".catalog__products-content").outerWidth() -
            $(".catalog__first").outerWidth() -
            30 >
            $(".catalog__active").outerWidth() ||
          window.innerWidth <= 767
        ) {
          $(".catalog__active-items").append(
            `<li class="catalog__active-item catalog__active-item--checkbox">${$(
              this
            )
              .find(".form-content__text")
              .text()
              .trim()}<img class="catalog__active-item-img" src="img/sprite/sprite.svg#close" alt="крестик"></li>`
          );
        }

        if (
          $(".catalog__products-content").outerWidth() -
            $(".catalog__first").outerWidth() -
            30 <
            $(".catalog__active").outerWidth() &&
          window.innerWidth > 767
        ) {
          $(".catalog__active-item:last-child").remove();
        }
      }
    });

    $(".catalog__filters-input").each(function () {
      lineChange($(this));
    });

    $(".catalog__active-item--checkbox").on("click", function () {
      const $this = $(this);

      $(".catalog__names-item").each(function () {
        if (
          $this.text().trim() ===
          $(this).find(".form-content__text").text().trim()
        ) {
          $(this).find(".form-content__input-checkbox").prop("checked", false);
          $this.remove();
        }
      });

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    });

    $(".catalog__active-item--line-one").on("click", function () {
      $(".catalog__filters-min-input--one").val(
        $(".catalog__filters-input--one").attr("data-min")
      );
      $(".catalog__filters-max-input--one").val(
        $(".catalog__filters-input--one").attr("data-max")
      );

      instance.update({
        from: $(".catalog__filters-input--one").attr("data-min"),
        to: $(".catalog__filters-input--one").attr("data-max"),
      });

      $(".catalog__filters-item--one-line").removeClass(
        "catalog__filters-item--active"
      );

      $(this).remove();

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    });

    $(".catalog__active-item--line-two").on("click", function () {
      $(".catalog__filters-min-input--two").val(
        $(".catalog__filters-input--two").attr("data-min")
      );
      $(".catalog__filters-max-input--two").val(
        $(".catalog__filters-input--two").attr("data-max")
      );

      instanceTwo.update({
        from: $(".catalog__filters-input--two").attr("data-min"),
        to: $(".catalog__filters-input--two").attr("data-max"),
      });

      $(".catalog__filters-item--two-line").removeClass(
        "catalog__filters-item--active"
      );

      $(this).remove();

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    });

    $(".catalog__active-clear").on("click", function () {
      $(".form-content__input-checkbox").prop("checked", false);
      $(".catalog__active-item--checkbox").remove();

      $(".catalog__filters-min-input").val("0");

      $(".catalog__filters-max-input--one").val(
        $(".catalog__filters-input--one").attr("data-max")
      );
      $(".catalog__filters-max-input--two").val(
        $(".catalog__filters-input--two").attr("data-max")
      );

      instance.update({
        from: 0,
        to: $(".catalog__filters-input--one").attr("data-max"),
      });

      instanceTwo.update({
        from: 0,
        to: $(".catalog__filters-input--two").attr("data-max"),
      });

      $(".catalog__filters-item--one-line").removeClass(
        "catalog__filters-item--active"
      );
      $(".catalog__filters-item--two-line").removeClass(
        "catalog__filters-item--active"
      );

      $(".catalog__active-item--line-one").remove();
      $(".catalog__active-item--line-two").remove();

      if ($(".catalog__active-items li").length === 0) {
        $(".catalog__products-box").css("display", "none");
      }
    });
  }

  let startY = 0;
  let dy = 0;

  $(document).on("touchstart", function (event) {
    event.preventDefault();
    startY = event.originalEvent.touches[0].clientY;
  });

  $(document).on("touchmove", function (event) {
    if ($(event.target).hasClass("touchable-trigger")) {
      event.preventDefault();
      dy = event.originalEvent.touches[0].clientY - startY;

      if (dy >= 0) {
        $(event.target)
          .closest(".touchable")
          .css({
            transform: `translateY(${dy}px)`,
            transition: "",
          });
      }
    }
  });

  $(document).on("touchend", function (event) {
    if ($(event.target).hasClass("touchable-trigger")) {
      const thisHeight =
        $(event.target).closest(".touchable").outerHeight() / 2;

      if (thisHeight > dy) {
        $(event.target).closest(".touchable").css({
          transform: "translateY(0)",
          transition: "-webkit-transform 0.3s",
          transition: "transform 0.3s",
          transition: "transform 0.3s, -webkit-transform 0.3s",
        });
      } else {
        $(event.target).closest(".touchable").css({
          transform: "translateY(100%)",
          transition: "-webkit-transform 0.3s",
          transition: "transform 0.3s",
          transition: "transform 0.3s, -webkit-transform 0.3s",
        });

        setTimeout(() => {
          $(".touchable").slideUp();
          $(".touchable-bg").removeClass("touchable-bg--active");
          $(".popup").removeClass("popup--active");

          $("body").removeClass("first-hidden");
          $("body").removeClass("hidden-two");

          setTimeout(() => {
            $(event.target).closest(".touchable").css({
              transform: "translateY(0)",
            });
          }, 600);
        }, 300);
      }
    }
  });

  const swiperProductSmall = new Swiper(".swiper-product-small", {
    slidesPerView: 3,

    spaceBetween: 8,

    breakpoints: {
      991: {
        direction: "vertical",
        spaceBetween: 20,
      },
    },
  });

  const swiperProductBig = new Swiper(".swiper-product-big", {
    effect: "fade",

    fadeEffect: {
      crossFade: true,
    },

    thumbs: {
      swiper: swiperProductSmall,
    },
  });

  $(".product__item-link").on("click", function (e) {
    e.preventDefault();
    $(".product__item-link").removeClass("product__item-link--active");
    $(this).addClass("product__item-link--active");

    if ($(this).position()["left"] === 1) {
      $(".product__bg").css({ "transform-origin": "left" });
    } else {
      $(".product__bg").css({ "transform-origin": "right" });
    }

    $(".product__bg").css({ transform: "scale(2, 1)" });
    $(".product__bg").css("left", $(this).position()["left"]);

    setTimeout(() => {
      $(".product__bg").css({ transform: "scale(1, 1)" });
    }, 150);

    $(".product__inner-item").removeClass("product__inner-item--active");
    $($(this).attr("href")).addClass("product__inner-item--active");
  });

  $(".product__dop-clear").on("click", function () {
    $(".product__dop-item").each(function () {
      $(this).find(".form-content__input-checkbox").prop("checked", false);
      $(this)
        .find(".product__dop-subitem:first-child .form-content__input-checkbox")
        .prop("checked", true);
      $(this).find(".product__small-open span").text("Не выбрано");
    });
  });

  if (window.innerWidth > 767) {
    $(".product__table").removeClass("product__table--active");
  }

  if (!$(".product__table").hasClass("product__table--active")) {
    if (window.innerWidth <= 767) {
      $(".product__tbody").css("display", "none");
    } else {
      $(".product__tbody").css("display", "");
    }
  }

  $(window).on("resize", function () {
    if (window.innerWidth > 767) {
      $(".product__table").removeClass("product__table--active");
    }

    if (!$(".product__table").hasClass("product__table--active")) {
      if (window.innerWidth <= 767) {
        $(".product__tbody").css("display", "none");
      } else {
        $(".product__tbody").css("display", "");
      }
    }
  });

  $(".product__thead").on("click", function () {
    if (window.innerWidth <= 767) {
      $(this).closest(".product__table").toggleClass("product__table--active");
      $(this).closest(".product__table").find(".product__tbody").slideToggle();
    }
  });

  $(".product__small-open").on("click", function () {
    $(".touchable-bg").toggleClass("touchable-bg--active");
    $(this)
      .closest(".product__dop-item")
      .find(".product__dop-small-box")
      .slideToggle();
    $("body").toggleClass("hidden-two");
  });

  $(".close, .btn-close").on("click", function () {
    $(".touchable").slideUp();
    $(".touchable-bg").removeClass("touchable-bg--active");

    $("body").removeClass("first-hidden");
    $("body").removeClass("hidden-two");
  });

  $(".product__dop-subitem").on("click", function () {
    if ($(this).find(".form-content__input-checkbox").prop("checked")) {
      $(this)
        .closest(".product__dop-item")
        .find(".product__small-open span")
        .text($(this).find(".form-content__text").text().trim());
    }
  });

  $(".catalog__search-input").on("input", function () {
    if ($(this).val().length > 0) {
      $(this)
        .closest(".catalog__search-box")
        .find(".catalog__search-clear")
        .addClass("catalog__search-clear--active");
    } else {
      $(this)
        .closest(".catalog__search-box")
        .find(".catalog__search-clear")
        .removeClass("catalog__search-clear--active");
    }
  });

  $(".catalog__search-clear").on("click", function () {
    $(this).removeClass("catalog__search-clear--active");
    $(this)
      .closest(".catalog__search-box")
      .find(".catalog__search-input")
      .val("");
  });

  $(".contacts__requisites-title").on("click", function () {
    $(this)
      .closest(".contacts__requisites")
      .toggleClass("contacts__requisites--active");
    $(this)
      .closest(".contacts__requisites")
      .find(".contacts__items")
      .slideToggle();
  });

  $(".contacts__city-link").on("click", function (e) {
    e.preventDefault();
    $(".contacts__city-link").removeClass("contacts__city-link--active");
    $(this).addClass("contacts__city-link--active");

    $(".contacts__content-item").removeClass("contacts__content-item--active");
    $($(this).attr("href")).addClass("contacts__content-item--active");
  });

  if ($(".contacts__content").length > 0) {
    function init() {
      $(".contacts__content-item").each(function () {
        const $thisId = $(this).find(".contacts__map").attr("id");
        const $thisLat = $(this).find(".contacts__map").attr("data-lat");
        const $thisLng = $(this).find(".contacts__map").attr("data-lng");

        let map = new ymaps.Map($thisId, {
          center: [$thisLat, $thisLng],
          zoom: 12,
        });

        let placemark = new ymaps.Placemark([$thisLat, $thisLng], {}, {});

        map.geoObjects.add(placemark);
      });
    }

    ymaps.ready(init);
  }

  if (document.querySelector('[type="tel"]')) {
    const elements = Array.from(document.querySelectorAll('[type="tel"]'));

    elements.forEach((el) => {
      const maskOptions = {
        mask: "+{7} (000) 000-00-00",
      };

      const mask = IMask(el, maskOptions);
    });
  }

  $(".form__input").on("input", function () {
    if ($(this).val().length > 0) {
      $(this).closest(".form__label").find(".form__text").css("opacity", "0");
    } else {
      $(this).closest(".form__label").find(".form__text").css("opacity", "1");
    }
  });

  $(".popup-one-open").on("click", function () {
    $(".popup").addClass("popup--active");
    $("body").addClass("popup-hidden");

    $(".popup__title").html(
      'Заполните форму, чтобы <br> мы&nbsp;<span class="title--color">с&nbsp;вами&nbsp;связались</span>'
    );
    $(".form__hidden").val("Форма для связи");

    if (window.innerHeight <= $(".popup .popup__inner").outerHeight()) {
      $(".popup .popup__inner").css({
        height: "100vh",
        overflow: "auto",
      });
    }
  });

  $(".popup-two-open").on("click", function () {
    $(".popup").addClass("popup--active");
    $("body").addClass("popup-hidden");

    $(".popup__title").html(
      'Заполните форму <br> для <span class="title--color" style="white-space: nowrap;">записи&nbsp;на&nbsp;тест-драйв</span>'
    );
    $(".form__hidden").val("Запись на тест-драйв");

    if (window.innerHeight <= $(".popup .popup__inner").outerHeight()) {
      $(".popup .popup__inner").css({
        height: "100vh",
        overflow: "auto",
      });
    }
  });

  $(".popup-product-open").on("click", function () {
    $(".popup-product").addClass("popup-product--active");
    $("body").addClass("popup-hidden");
  });

  $(document).click(function (e) {
    const list = $(
      ".popup__inner, .popup-one-open, .popup-two-open, .popup-product-open"
    );

    if (e.target != list[0] && !list.has(e.target).length) {
      $(".popup__inner").css({
        transition: "-webkit-transform 0.3s",
        transition: "transform 0.3s",
        transition: "transform 0.3s, -webkit-transform 0.3s",
      });

      $(".popup").removeClass("popup--active");
      $(".popup-product").removeClass("popup-product--active");
      $("body").removeClass("popup-hidden");
    }
  });

  $(".popup__close").on("click", function () {
    $(".popup__inner").css({
      transition: "-webkit-transform 0.3s",
      transition: "transform 0.3s",
      transition: "transform 0.3s, -webkit-transform 0.3s",
    });

    $(".popup").removeClass("popup--active");
    $(".popup-product").removeClass("popup-product--active");
    $("body").removeClass("popup-hidden");
  });

  if (window.innerHeight <= $(".popup-product .popup__inner").outerHeight()) {
    $(".popup-product .popup__inner").css({
      height: "100vh",
      overflow: "auto",
    });
  }

  $(window).on("resize", function () {
    if (window.innerHeight <= $(".popup-product .popup__inner").outerHeight()) {
      $(".popup-product .popup__inner").css({
        height: "100vh",
        overflow: "auto",
      });
    }

    if (window.innerHeight <= $(".popup .popup__inner").outerHeight()) {
      $(".popup .popup__inner").css({
        height: "100vh",
        overflow: "auto",
      });
    }
  });
});

$(document).ready(function () {
  const bxPanel = $("#bx-panel");

  if (bxPanel.length) {
    if ($(window).width() < 768) {
      bxPanel.hide();
    } else {
      $(".header").css("top", "40px");
    }
  }
});
