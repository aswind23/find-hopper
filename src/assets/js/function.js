(function($) {

  $(document).ready(function() {
    $.scrollify({
      section: ".slider",
      scrollbars: false,
      before: function(i, panels) {
        $('.sliders > section').eq(i).siblings().removeClass('active');
        $('.sliders > section').eq(i).addClass("active");
        // var ref = panels[i].attr("data-section-name");

        // $(".side-menu a.active").removeClass("active");

        // $(".side-menu a[href=#" + ref + "]").addClass("active");
        // /*
        // if(ref==="features") {
        //   $(".features .gallery0,.features .gallery1,.features .gallery2").addClass("moved");

        // }*/
        // panels[i].addClass("moved");
        // if(ref==="home") {
        //   $(".slider2").removeClass("moved");
        //   $(".slider3").css("top",0);
        // }
        // if(ref==="about") {
        //   $(".slider3").removeClass("moved");
        //    initialPosition();
        // }
        // if(ref==="brewery") {
        //   $(".slider4").removeClass("moved");
        //   initialPosition();
        // }
        // if(ref==="brewmasters") {
        //   $(".slider5").removeClass("moved");
        //   initialPosition();
        // }
        // if(ref==="meethopper") {
        //   $(".slider6").removeClass("moved");
        //   initialPosition();
        // }
        // if(ref==="witbier") {
        //   $(".slider7").removeClass("moved");
        //   initialPosition();
        // }
        // if(ref==="blonde") {
        //   $(".slider8").removeClass("moved");
        // }
        // if(ref==="culture") {
        //   $(".slider8").addClass("moved");
        //   $(".slider8").css("top",0);
        // }
      },
      after: function(i, panels) {

        // var ref = panels[i].attr("data-section-name");

        // if(ref==="home") {
        //   $(".about").removeClass("moved");
        // }
        // for(var j = 0;j < panels.length;j++) {
        //   if(j>i) {

        //     //panels[j].find(".moved").removeClass("moved");
        //   }
        // }
      },
      afterResize: initialPosition,
      afterRender: initialPosition
    });



    function initialPosition() {

      var current = $.scrollify.current();

      $(current).addClass("active");
      // if(current.hasClass("slider8")===false) {
      //   // var height = parseInt($(".slider8").height());
      //   // var f = parseInt($(".slider7").height()) - 50;

      //   // var top = 0 - (height*0.4) - (height-f);
      //   // $(".slider8").css("top",top);
      // } else {
      //   $(".slider7").addClass("moved");
      // }

    }
    $(window).on("load", function() {
      setTimeout(function() {
        $.scrollify.instantMove("#home");
        $('body').toggleClass('loading');
      }, 100)
    });

    $(".owl-carousel").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
    $(document).on("click", ".side-menu a", function(e) {
      $.scrollify.move($(this).attr("href"));
      e.preventDefault();
    });

    function getCookiesMap(cookiesString) {
      return cookiesString.split(";")
        .map(function(cookieString) {
          return cookieString.trim().split("=");
        })
        .reduce(function(acc, curr) {
          acc[curr[0]] = curr[1];
          return acc;
        }, {});
    }

    if (getCookiesMap(document.cookie) !== undefined && getCookiesMap(document.cookie)['age-valid'] == "true") {
      $(".age-checker").remove();
    } else {
      $(".age-checker").css({
        'display': 'table'
      });
    }
    $(document).on('click', '.hamburger-icon', function(e) {
      $('.main').toggleClass('menuopen');
      e.preventDefault();
    })

    $(document).on('click', '.overlay', function(e) {
      $('.main').removeClass('menuopen');

    })
    $(document).on('click', '.video', function() {
      var video = document.getElementById("videoID");
      $('.overlayVideo').show();
      $('#divVideo').show();
      video.play()
    })
    $(document).on('click', '.overlayVideo', function() {
      var video = document.getElementById("videoID");
      $('.overlayVideo').hide();
      $('#divVideo').hide();
      video.pause();
      video.currentTime = 0;
    })

    $.getJSON("/assets/js/names.json", function(data) {
      var contents = data.items;
      $.each(contents, function(key, item) {
        $('#country').append($('<option>', {
          value: item.code,
          text: item.name
        }));
      });
    });

    $(document).on('click', '.submit-button', function(e) {
      var day = document.forms["agForm"]["dob_[day]"].value;
      var month = document.forms["agForm"]["dob_[month]"].value;
      var year = document.forms["agForm"]["dob_[year]"].value;
      var country = document.forms["agForm"]["dob_[country]"].value;
      if (day !== '' && month !== '' && year !== '' && country !== '') {
        ageChecker(day, month, year, country)
      } else {
        alert("Please Provide valid information")
      }
      e.preventDefault();
    });

    function ageChecker(day, month, year, country) {
      var min_age = 18;
      if (jQuery.inArray(country, ["CF", "US", "ID", "KZ", "MY", "OM", "LK", "AS", "GU", "PW", "SO", "SB"]) != -1) {
        min_age = 21;
      }
      if (jQuery.inArray(country, ["PY", "JP", "TH", "UZ", "IS"]) != -1) {
        min_age = 20;
      }
      if (jQuery.inArray(country, ["CA", "KS"]) != -1) {
        min_age = 19;
      }
      if (jQuery.inArray(country, ["GM", "BN", "CY", "MT"]) != -1) {
        min_age = 17;
      }
      if (jQuery.inArray(country, ["UG", "BE", "ZW", "AT", "AG", "BB", "CU", "GY", "VC", "PS", "DK", "DE", "GI", "LI", "SM", "RS", "CH", "GB"]) != -1) {
        min_age = 16;
      }
      if (jQuery.inArray(country, ["ET"]) != -1) {
        min_age = 15;
      }
      var dob = month + '-' + day + '-' + year;
      dob = new Date(dob);
      var today = new Date();

      var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

      today.setFullYear(today.getFullYear() - min_age);

      if ((today - dob) < 0) {
        var diff = new Date(dob - today);
        var daysRemaining = Math.ceil(diff / 1000 / 60 / 60 / 24);
        //$('.message').html("Sorry, only persons over the age of " + min_age + " may enter this site .You have to wait more days");
        // document.getElementById("content-placeholder").innerHTML = `You have to wait <span id="days-counter">${daysRemaining}</span> more days`;
        // document.getElementsByClassName('age-checker-form')[0].style.visibility = 'hidden';
        // document.getElementsByClassName('age-checker-form')[1].style.visibility = 'hidden';
        // document.getElementsByClassName('submit-button')[0].style.visibility = 'hidden';
        // document.getElementsByClassName("country-text")[0].style.visibility = 'hidden';
        document.cookie = 'age-valid = false; max-age==' + new Date().setTime(+new Date() + (90 * 86400000));
        // var counter = new CountUp("days-counter", 0, daysRemaining);
        // counter.start();

      } else {

        document.cookie = 'age-valid=""';
        document.cookie = 'age-valid = true; max-age=' + new Date().setTime(+new Date() + (90 * 86400000));
        setTimeout(function() {
          $('.age-checker').removeAttr('style');
          window.location.reload();
        }, 1000);
      }
    }
  });

})(jQuery);
