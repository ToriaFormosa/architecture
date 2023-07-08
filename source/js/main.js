'use strict';

/*------------------------------------------------

	1. Global
	2. Animsition init
	3. Mobile menu
		3.1 Mobile left aside
	4. Fixed header
	5. Header search
	6. Project Slider
	7. Testimonials slider
	8. Project carousel
	9. Hero slider
	10. News slider
	11. Scroll to the next section
	12. Modal window with a form on the contact page
	13. Tariff slider
	14. An awards slider
	15. Animation circle diagram
	16. Animation of statistics
	17. Modal
	18. Packery init
	19. The same height for blocks in the grid
	20. Pagepiling
	21. Form validation
	22. Fixed footer
	23. Parallax slider

-------------------------------------------------*/

var body = $('body');
var DURATION = 300;
var preloader = $('.preloader');
var header = $('.header');
var anAwards = $('.an-awards');
var mobileBreakpoint = 992;

function setOverlay(cb) {
	var overlay = $('<div class="overlay"></div>');
	overlay.on('click', cb);
	return overlay;
}

AOS.init({
	duration: 1000,
	//offset: 500
});

/* 2. Animsition init */
(function() {
	//$(document).ready(function() {
		$(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 1500,
			outDuration: 1000,
			linkElement: '.animsition-link',
			// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
			loading: true,
			loadingParentElement: 'body', //animsition wrapper element
			loadingClass: 'preloader',//'animsition-loading',
			loadingInner: `<div class="preloader__spinner">
				<span class="preloader__double-bounce"></span>
				<span class="preloader__double-bounce preloader__double-bounce--delay"></span>
			</div>`, // e.g '<img src="loading.svg" />
			timeout: false,
			timeoutCountdown: 5000,
			onLoadEvent: true,
			browser: [ 'animation-duration', '-webkit-animation-duration'],
			// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body',
			transition: function(url){ window.location.href = url; }
		});

		setTimeout(function(){
			//preloader.fadeOut(DURATION);
		}, 1000);

	//})
})();

/* 3. Mobile menu */
(function() {
	var menuOpenBtn = $('.menu-toggle');
	var menu = $('.__js_mobile-canvas');
	var menuCloseBtn = menu.find('.mobile-canvas__close');
	var headerInner = $('.header__inner');
	var animsition = $('.animsition');
	var isHandled = false;

	//var dropdownLinks = menu.find('.__js_menu-dropdown-link');
	var mobileDropdownLinks = $('.navigation__link');

	var ModifierClass = {
		MENU: 'mobile-canvas--opened',
		TOGGLE: 'menu-toggle--opened'
	};

	menuOpenBtn.on('click', function() {
		var overlay = setOverlay(closeMenu);//
		body.append(overlay);

		menuCloseBtn.on('click', closeMenu);
		menuOpenBtn.addClass(ModifierClass.TOGGLE);

		setTimeout(function() {
			overlay.fadeIn(DURATION);

			menu.addClass(ModifierClass.MENU);
		}, DURATION + 50);
	});

	if ($(window).width() >= mobileBreakpoint) {
		headerInner.append(menu);
		menu.addClass('header__mobile');
	}

	if ($(window).width() < mobileBreakpoint) {
		mobileDropdownLinks.each(function() {
			if($(this).next().length !== 0) {
				$(this).removeClass('animsition-link');
			}
		});
	}

	if ($(window).width() < mobileBreakpoint && !isHandled) {
		mobileDropdownLinks.on('click', openMobileDropdown);
		isHandled = true;
	}

	$(window).on('resize', function() {
		if ($(window).width() >= mobileBreakpoint) {
			headerInner.append(menu);
			menu.addClass('header__mobile');
		} else {
			animsition.prepend(menu);
			menu.removeClass('header__mobile');
		}

		if ($(window).width() < mobileBreakpoint && !isHandled) {
			mobileDropdownLinks.on('click', openMobileDropdown);
			isHandled = true;
		} else {
			mobileDropdownLinks.off('click', openMobileDropdown);
			isHandled = false;
		}


		if ($(window).width() < mobileBreakpoint) {
			mobileDropdownLinks.each(function() {
				if($(this).next().length !== 0) {
					$(this).removeClass('animsition-link');
				}
			});
		} else {
			mobileDropdownLinks.addClass('animsition-link');
		}
	})





	function openMobileDropdown(evt) {
		if ($(this).next().length !== 0) {
			evt.preventDefault();
			$(this).next().find('a[href]').on('click', closeMenu);
			$(this).next().slideToggle(DURATION);
		}
	}

	function closeMenu() {
		menuCloseBtn.off('click', closeMenu);
		menu.removeClass(ModifierClass.MENU);
		var overlay = $('.overlay').fadeOut(DURATION);

		setTimeout(function() {
			menuOpenBtn.removeClass(ModifierClass.TOGGLE);
			overlay.remove();
		}, DURATION + 50);
	}

	$(window).on('resize', function() {
		var windowWidth = $(window).width();

		if (windowWidth >= mobileBreakpoint) {
			closeMenu();
		}
	});
})();

/* 3.1 Mobile left aside */
(function() {
	var toggleBtn = $('.header-toggle');
	var header = $('.header--aside');

	var dropdownLinks = $('.__js_nav-dropdown-link');

	toggleBtn.on('click', function() {

		if($(this).hasClass('on')) {
			close();
		} else {
			var overlay = setOverlay(close);
			body.append(overlay);

			$(this).removeClass('off').addClass('on');

			setTimeout(function() {
				overlay.fadeIn(DURATION);
				header.addClass('header--opened');
			}, 500);
		}
	});

	dropdownLinks.on('click', function(evt) {
		evt.preventDefault();

		$(this).next().slideToggle(DURATION);

	});

	function close() {
		var overlay = $('.overlay');

		toggleBtn.addClass('off').removeClass('on');

		setTimeout(function() {
			overlay.fadeOut(DURATION);
			header.removeClass('header--opened');

			setTimeout(function() {
				overlay.remove();
			}, DURATION)


		}, 500);
	}

	$(window).on('resize', function() {
		if ($(window).width() >= 1200) {
			close();
		}
	});
})();

/* 4. Fixed header */
(function() {
	var header = $('.__js_fixed-header');
	var headerOffset = header.offset().top;
	var classes = 'header--fixed';
	var headerHeight = header.outerHeight();
	var scroll = $(window).scrollTop();
	var isScroll = false;
	var isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;//(header.css('position') === 'absolute') || (header.css('position') === 'fixed') ? true : false;

	$(window).on('scroll', function() {
		scroll = $(window).scrollTop();

		if (scroll >= headerOffset + headerHeight) {
			isScroll = true;

			headerHeight = isScroll ? header.outerHeight() : null;
			header.addClass(classes);

			if (!header.hasClass('is-fixed')) {
				header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'}).addClass('is-fixed');

				if (!isNotStatic) {
					body.css('padding-top', headerHeight + 'px');
				}
			}
		} else {
			isScroll = false;
			header.removeClass(classes + ' is-fixed').removeAttr('style');
			body.css('padding-top', 0);

			if (!isNotStatic) {
				//body.css('padding-top', 0);
			}
		}
	});

	$(window).on('resize', function() {
		headerHeight = header.outerHeight();
		isNotStatic = header.hasClass('header--half') && $(window).width() >= mobileBreakpoint ? true : false;

		if (scroll >= headerOffset + headerHeight && isScroll) {
			header.css({'top': -headerHeight + 'px', 'transform': 'translateY(' + headerHeight + 'px)'});
			//body.css('padding-top', headerHeight + 'px');

			if (!isNotStatic) {
				body.css('padding-top', headerHeight + 'px');
			}
		}
	});
})();

/* 5. Header search */
(function() {
	var search = $('.__js_header-search');
	var toggle = search.find('.header-search__toggle');

	var activeClass = 'header-search--opened';

	toggle.on('click', function() {
		search.toggleClass(activeClass);
	});
})();

/* 6. Project slider */
(function(){
	var projectsSlider = new Swiper('.__js_projects-slider', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		loop: true,
		centeredSlides: true,
		navigation: {
			nextEl: '.projects-slider__next',
			prevEl: '.projects-slider__prev',
		},

	});

})();

/* 7. Testimonials slider */
(function() {
	var mySwiper = new Swiper('.__js_testimonials-carousel', {
		slidesPerView: 'auto',
		spaceBetween: 60,
		loop: true,
		navigation: {
			nextEl: '.testimonials__nav-btn--next',
			prevEl: '.testimonials__nav-btn--prev',
		},
	});
})();

(function(){
	var sliderSingle2 = new Swiper('.__js_slider-single-2', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		loop: true,
		navigation: {
			prevEl: '.works-arrow--prev',
			nextEl: '.works-arrow--next'
		},
		pagination: {
			el: '.slide-counter-2',
			type: 'fraction',
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' +
					'<span class="' + totalClass + '"></span>';
			}
		}
	});
})();

/* 8. Project carousel */
(function(){
	var mySwiper = new Swiper('.__js_projects-carousel', {
		slidesPerView: 'auto',
		spaceBetween: 32,
		loop: false,

		navigation: {
			nextEl: '.projects-carousel__next',
			prevEl: '.projects-carousel__prev',
		},

		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});

	var latestProjectsInHomeCarousel = new Swiper('.__js_latest-projects-carousel', {
		slidesPerView: 1,
		loop: false,
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 24
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30
			},
		},

		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});


	/* Filter carousel */
	$('.__js_latest-projects-filter-item').on('click', function() {
		var selector = $(this).attr('data-filter');

		$('.__js_latest-projects-carousel').fadeOut(DURATION);
		$('.__js_latest-projects-carousel').fadeIn(DURATION);

		setTimeout(function(){
			$('.__js_latest-projects-carousel .swiper-slide').hide();
			$(selector).closest('.__js_latest-projects-carousel .swiper-slide').show();

			latestProjectsInHomeCarousel.update();
		}, DURATION);

		return false;
	});

})();

(function() {
	var reviewCarousel = new Swiper('.__js_review-carousel', {
		slidesPerView: 1,
		loop: false,
		spaceBetween: 15,
		breakpoints: {
			768: {
				slidesPerView: 2,
				spaceBetween: 15
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			1200: {
				slidesPerView: 2,
				spaceBetween: 60
			},
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});
})();

/* 9. Hero slider */
(function() {
	var mySwiper = new Swiper('.__js_hero-banner', {
		slidesPerView: 1,
		loop: false,

		pagination: {
			el: '.swiper-pagination',
		},
	});
})();

/* 10. News slider */
(function(){
	var sliderNews = new Swiper('.__js_slider-news', {
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		navigation: {
			prevEl: '.slider__nav-btn--prev',
			nextEl: '.slider__nav-btn--next'
		},
		loop: true,
		speed: 300
	});
})();

(function(){
	var sliderNews2 = new Swiper('.__js_slider-news-2', {
		slidesPerView: 1,
		loop: true,
		speed: 600,
		navigation: {
			prevEl: '.arrow-square--prev',
			nextEl: '.arrow-square--next'
		},
		breakpoints: {
			1560: {
				slidesPerView: 3
			},
			1200: {
				slidesPerView: 2
			}
		}
	});
})();

(function(){
	var sliderNews3 = new Swiper('.__js_slider-news-3', {
		slidesPerView: 1,
		spaceBetween: 20,
		speed: 300,
		loop: false,
		navigation: {
			prevEl: '.news-sb-page__related-arrow--prev',
			nextEl: '.news-sb-page__related-arrow--next'
		},
		breakpoints: {
			992: {
				slidesPerView: 3,
				spaceBetween: 50
			},
			768: {
				slidesPerView: 2
			}
		}
	});
})();

/* 11. Scroll to the next section */
(function() {
	var scrollToBtn = $('.__js_to-next-section');

	if(scrollToBtn.length) {
		scrollToBtn.on('click', function(evt) {
			evt.preventDefault();
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;

			$('html').animate({ scrollTop: destination }, 1100); //1100 - скорость
		});
	}
})();

/* 12. Modal window with a form on the contact page */
(function() {
	var openContactsModalBtn = $('.__js_open-contacts-modal');
	var contactsModal = $('.contacts__modal');
	var closeContactsModalBtn = contactsModal.find('.contacts__modal-close');

	openContactsModalBtn.on('click', function(evt) {
		evt.preventDefault();

		contactsModal.fadeIn(DURATION);
		closeContactsModalBtn.on('click', closeModal);
	});

	function closeModal() {
		contactsModal.fadeOut(DURATION);
	}
})();

/* 13. Tariff slider */
(function(){
	var optionsTariff = {
		slidesPerView: 1,
		spaceBetween: 10,
		initialSlide: 1,
		speed: 300,
		loop: false,
		centeredSlides: true,
		centeredSlidesBounds: true,
	};

	var priceList = undefined;

	if ($('.__js_slider-price').length > 0) {
		$(window).resize(function () {
			initPriceSlider();
		});
	}

	initPriceSlider();

	function initPriceSlider() {
		if (window.matchMedia('(max-width: 1199px)').matches && priceList == undefined) {
			var slider = $('.pricing__slider-container');

			priceList = new Swiper('.__js_slider-price', optionsTariff);

			priceList.on('slideChange', function () {
				priceList.activeIndex === 0 ? slider.addClass('hide-left') : slider.removeClass('hide-left');
				priceList.activeIndex === priceList.slides.length - 1 ? slider.addClass('hide-right') : slider.removeClass('hide-right');
			});
		} else if (window.matchMedia('(min-width: 1200px)').matches && priceList != undefined) {
			priceList.destroy();
			priceList = undefined;
		}
	}
})();

/* 14. An awards slider */
(function(){
	var sliderNews4 = new Swiper('.__js_slider-awards', {
		slidesPerView: 1,
		speed: 300,
		loop: true,
		navigation: {
			prevEl: '.arrow-square--prev',
			nextEl: '.arrow-square--next'
		},
		pagination: {
			el: '.slide-counter',
			type: 'fraction',
		},
	});
})();

/* 15. Animation circle diagram */
(function(){
	var diagrams = document.querySelectorAll('.__js_diagram');
	var specialization = document.querySelector('.specialization');
	var windowHeight = window.innerHeight;
	var animationDone = false;

	if (diagrams && specialization) {
		diagrams.forEach(function(item) {
			var progress = item.querySelector('.diagram__circle--progress');
			var progresslength = Math.round(progress.getTotalLength());
			progress.setAttribute('stroke-dasharray', '0 ' + progresslength);
		});

		window.onscroll = function () {
			var offset = specialization.getBoundingClientRect().top;

			if (offset <= windowHeight && !animationDone) {
				diagrams.forEach(function(item) {
					var progress = item.querySelector('.diagram__circle--progress');
					var progresslength = Math.round(progress.getTotalLength());
					var percent = item.querySelector('.diagram__percent').textContent;
					var percentValue = parseFloat(percent, 10);
					var progressFill = percentValue * progresslength / 100;
					progress.style.strokeDasharray = progressFill + ' ' + progresslength;
				});

				animationDone = true;
			}
		}
	}
})();

/* 16. Animation of statistics */
(function() {
	var statistics = $('.statistics');
	var numbers = $('.__js_number');
	var animationIsDone = false;
	var scroll = $(window).scrollTop() + $(window).height();

	if ($('*').is('.statistics')) {
		var offset = statistics.offset().top;

		if (!animationIsDone && scroll >= offset) {
			animateNumbers();
		}

		$(window).on('scroll', function() {
			scroll = $(window).scrollTop() + $(window).height();

			if (!animationIsDone && scroll >= offset) {
				animateNumbers();
			}
		});
	}

	function animateNumbers() {
		numbers.each(function() {
			var endValue = parseInt($(this).attr('data-end-value'), 10);

			$(this).easy_number_animate({
				start_value: 0,
				end_value: endValue,
				duration: 2500
			});

		});

		animationIsDone = true;
	}
})();

/* 17. Modal */
(function(){
	$(document).ready(function() {
		$(".fancybox").fancybox();
	});
})();

/* 18. Packery init */
(function() {
	$(window).on('load', function(){
		var filterItem = $('.filter__item');
		var filterItemAll = $('.filter__item[data-filter="*"]');
		var filterActiveClass = 'filter__item--active';

		var grid = $('.__js_projects-grid').isotope({
			itemSelector: '.__js_masonry-item',
			layoutMode: 'packery',
			getSortData: {
        order: '[data-order]',
      },
      sortBy: 'order',
      //sortAscending: false,
			packery: {
				gutter: 0
			},
		});

		var grid2 = $('.__js_news-grid').isotope({
			itemSelector: '.__js_masonry-item',
			layoutMode: 'packery',
			packery: {
				gutter: 0
			},
		});

		setTimeout(function () {
			$('.masonry').isotope({
				itemSelector: '.masonry-item',
				layoutMode: 'packery'
			});
		}, 100);

		filterItem.on('click', function() {
			var filterValue = $(this).attr('data-filter');

			$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
			grid.isotope({ filter: filterValue });
			grid2.isotope({ filter: filterValue });

			if ($('.__js_news-list-filter') && $('.__js_news-list-filter').length > 0) {
				var destination = $('.__js_news-list-filter').offset().top - 200;

				$('html').animate({ scrollTop: destination }, 1100); //1100 - скорость
			}
		});
	});




})();

/* Паралакс фона при скролле */
(function() {
	var bg = $('.__js_bg-parallax-container');
	var bgInner = bg.find('.__js_bg-parallax-inner');

	if (bg.length) {
		var bgHeight = bg.innerHeight();
		var bgInnerHeight = bgInner.innerHeight();
		var bgOffset = bg.offset().top;
		var hideBgInnerHeight = bgInnerHeight - bgHeight;
		var halfWindowHeight = $(window).height() / 2;
		var ratio = hideBgInnerHeight / halfWindowHeight;

		$(window).on('resize', function() {
			bgHeight = bg.innerHeight();
			bgInnerHeight = bgInner.innerHeight();
			bgOffset = bg.offset().top;
			hideBgInnerHeight = bgInnerHeight - bgHeight;
			halfWindowHeight = $(window).height() / 2;
			ratio = hideBgInnerHeight / halfWindowHeight;
		});


		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			var scrollPlusHalfWindowHeight = scroll + halfWindowHeight;

			if (scrollPlusHalfWindowHeight >= bgOffset && scroll <= bgOffset) {
				var difference = bgOffset - scrollPlusHalfWindowHeight;
				var shift = difference * ratio;
				bgInner.css('top', shift + 'px');
			}
		});
	}

})();

/* 19. The same height for blocks in the grid */
(function(){
	$(window).on('load', function () {
		setEqualHeight($('.article-list__list'));

		$(window).resize(function () {
			setEqualHeight($('.article-list__list'));
		});
	});

	function setEqualHeight(row) {
		if (window.matchMedia('(min-width: 768px) and (max-width: 991px)').matches) {
			row.each(function() {
				var tallestcolumn = 0;

				$(this).find('li').each(function () {
					var currentHeight = $(this).find('.article-preview__content').height();

					if (currentHeight > tallestcolumn) {
						tallestcolumn = currentHeight;
					}
				});

				$(this).find('.article-preview__content').height(tallestcolumn);
			});
		} else {
			$('.article-preview__content').removeAttr('style');
		}
	}
})();

/* 20. Pagepiling */
(function(){
	initFullPage();

	if ($('#pagepiling .section.active').hasClass('dark')) {
		setDark();
	}

	function initFullPage() {
		if ($('#pagepiling') && $('#pagepiling').length > 0) {
			$('#pagepiling').pagepiling({
				scrollingSpeed: 280,
				loopBottom: true,
				afterLoad: function (anchorLink, index) {
					var current = $('#pagepiling .section.active');

					if (current.hasClass('dark')) {
						setDark();
					} else {
						removeDark();
					}

					$('.fp-table.active .aos-init').addClass('aos-animate');
				}
			});
		}
	}

	function setDark() {
		$('.webpage').addClass('webpage--parallax-dark');
	}

	function removeDark() {
		$('.webpage').removeClass('webpage--parallax-dark');
	}
})();

/* 21. Form validation */
(function(){
	function validateEmail(email) {
		var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return re.test(String(email).toLowerCase());
	}

	function mail(event, php) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		var req = new XMLHttpRequest();
		req.open('POST', php, true);

		req.onerror = function () {
			console.log("Ошибка отправки запроса");
		};

		req.send(new FormData(event.target));
	}

	function checkValid(errs) {
		var isValid = true;

		errs.each(function () {
			if ($(this).is(':visible')) {
				isValid = false;
			}
		});

		return isValid;
	}

	$('.js-form-validate button').on('click', function (e) {
		var that = $(this),
				fields = $(this).parent().find('input').add($(this).parent().find('textarea')),
				form = $(this).parent('form'),
				isValid = checkValid(form.find('.field-error'));

		fields.each(function () {
			var err = $(this).parent().next();

			if ($(this).prop('required') === true) {
				if ($(this).val().length === 0) {
					err.show().text('Please enter a value.');
					isValid = false;
				} else {
					err.hide().text('');
				}
			}

			if ($(this).attr('type') === "email") {
				if (validateEmail($(this).val()) === false) {
					err.show().text('Please enter a valid email address.');
					isValid = false;
				}
			}
		});

		if (isValid) {
			form.submit(function () {
				mail(event, 'php/mail.php');

				$.fancybox.open({
					src: '#thanks',
					type: 'inline',
					touch: false,
					scrolling: 'no'
				});
			});

			setTimeout(function () {
				form.off('submit');
			}, 100);
		} else {
			e.preventDefault();
		}
	});

	$('.js-form-validate .field').on('focusout keyup change', function () {
		var input = $(this).find('input'),
				err = input.parent().next(),
				val = input.val();

		if (input.attr('type') === "email") {
			if (validateEmail(val) || val.length === 0) {
				err.hide().text('');
			} else {
				err.show().text('Please enter a valid email address.');
			}
		}
	});
})();


/* 22. Fixed footer */
(function() {

	$(window).on('load', function() {
		var footer = $('.__js_fixed-footer');
		var footerParent = footer.parent();
		var footerHeight = footer.innerHeight();

		if(footer.length !== 0) {
			if (footerHeight <= $(window).height()) {
				var leftValue = footerParent.css('padding-left');
				footer.css({ 'position': 'fixed', 'left': leftValue, 'right': '0', 'bottom': '0'});
				body.css('padding-bottom', footerHeight);
			} else {
				body.css('padding-bottom', '0');
				footer.removeAttr('style')
			}

			$(window).on('resize', function() {
				footerHeight = footer.innerHeight();

				if (footerHeight <= $(window).height()) {
					leftValue = footerParent.css('padding-left');
					footer.css({ 'position': 'fixed', 'left': leftValue, 'right': '0', 'bottom': '0'});
					body.css('padding-bottom', footerHeight);
				} else {
					body.css('padding-bottom', '0');
					footer.removeAttr('style');
				}
			});
		}
	});
})();

/* 23. Parallax slider */
(function(){
	var elem = new Swiper('.__js_slider-parallax', {
		navigation: {
			prevEl: '.slider-parallax__nav-btn--prev',
			nextEl: '.slider-parallax__nav-btn--next'
		},
		loop: true,
		speed: 300
	});
})();
