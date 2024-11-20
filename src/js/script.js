$(document).ready(function(){
	$('.carousel__inner').slick({
		// установка скорости перемотки слайдера в миллисекундах
		speed: 1200,
		// установка адаптации размера изображения слайда
		// adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel/chevron_left_solid.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel/chevron_right_solid.png"></button>',
		// установка свойств при изменении размера экрана
		responsive: [
			{
				// контрольная точка расширения
				breakpoint: 992,
				// свойства
				settings: {
					// точки для скроллинга включены
					dots: true,
					// стрелки для перемотки выключены
					arrows: false
				}
			}
		]
	});
});