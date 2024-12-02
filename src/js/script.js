$(document).ready(function () {
	// Carousel

	$(".carousel__inner").slick({
		//? установка скорости перемотки слайдера в миллисекундах
		speed: 1200,
		//? установка адаптации размера изображения слайда
		// adaptiveHeight: true,
		prevArrow:
			'<button type="button" class="slick-prev"><img src="icons/carousel/chevron_left_solid.png"></button>',
		nextArrow:
			'<button type="button" class="slick-next"><img src="icons/carousel/chevron_right_solid.png"></button>',
		//? установка свойств при изменении размера экрана
		responsive: [
			{
				//* контрольная точка расширения
				breakpoint: 992,
				//* свойства
				settings: {
					//* точки для скроллинга включены
					dots: true,
					//* стрелки для перемотки выключены
					arrows: false
				}
			}
		]
	});

	//! СКИПТ ДЛЯ ТЕРЕКЛЮЧЕНИЯ ТАБОВ

	$("ul.catalog__tabs").on("click", "li:not(.catalog__tab--active)", function () {
		$(this)
			.addClass("catalog__tab--active")
			.siblings()
			.removeClass("catalog__tab--active")
			.closest("div.container")
			.find("div.catalog__content")
			.removeClass("catalog__content--active")
			.eq($(this).index())
			.addClass("catalog__content--active");
	});

	//! НЕ ОПТИМИЗИРОВАННО

	// $(".catalog-item__link").each(function (i) {
	// 	$(this).on("click", function (e) {
	// 		e.preventDefault();
	// 		$(".catalog-item__content").eq(i).toggleClass("catalog-item__content--active");
	// 		$(".catalog-item__list").eq(i).toggleClass("catalog-item__list--active");
	// 	});
	// });

	// $(".catalog-item__back").each(function (i) {
	// 	$(this).on("click", function (e) {
	// 		e.preventDefault();
	// 		$(".catalog-item__content").eq(i).toggleClass("catalog-item__content--active");
	// 		$(".catalog-item__list").eq(i).toggleClass("catalog-item__list--active");
	// 	});
	// });

	//! ОПТИМИЗИРОВАННО

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on("click", function (e) {
				e.preventDefault();
				$(".catalog-item__content").eq(i).toggleClass("catalog-item__content--active");
				$(".catalog-item__list").eq(i).toggleClass("catalog-item__list--active");
			});
		});
	};

	toggleSlide(".catalog-item__back");
	toggleSlide(".catalog-item__link");

	//! MODAL

	$("[data-modal=consultation]").on("click", function () {
		$(".overlay, #consultation").fadeIn("slow");
	});
	$(".modal__close").on("click", function () {
		$(".overlay, .modal").fadeOut("slow");
	});

	$(".button--mini").each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
					$(".overlay, #order").fadeIn("slow");
		});
	});

	$(document).keyup(function (e) {
		if (e.keyCode === 27) {
			// esc
			$(".overlay, .modal").fadeOut("slow");
		}
	});

	//! Validate

	function validForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format(
						" В имени должно быть не менее {0}-х символов!"
					)
				},
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Ваш e-mail должен быть в формате: name@domain.com"
				}
			}
		});
	};

	validForm("#consultation-form");
	validForm("#consultation form");
	validForm("#order form");

	//! Настройка маски для номера телефона

	$("input[name=phone]").mask("+7 (999) 999-99-99");
});
