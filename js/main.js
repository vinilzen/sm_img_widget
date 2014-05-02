//@prepros-prepend jq.js
//@prepros-prepend template.js

var widget_container = '<div class="smw__img_widget">',
	tpl =	'<div id="<%=id%>" class="smw__item">' +
				'<div class="smw__imgl"><a href="<%=url%>" target="_blank"><img src="<%=img_url%>" title="<%=title%>" alt="<%=title%>" /></a></div>' +
				'<div class="smw__imgdescr">' +
					'<h3><a href="<%=url%>" target="_blank"><%=title%></a></h3>' +
					'<p><a href="<%=url%>">от <strong><%=priceMin%></strong> руб.</a></p>' +
					'<p class="smw__offer"><a href="<%=url_all%>" target="_blank">все предложения (<%=count%>)</a></p>' +
				'</div>' +
			'</div>',
	powered = '<div class="smw__powered">Powered by <a href="#">SocialMart</a> Данные - <a href="#">Яндекс.Маркет</a></div>'

var test_data = [{
	id: 1,
	img_url: 'img/1.jpg',
	title: 'Samsung Galaxy Tab 2 7.0 P3110 8Gb',
	url:'http://dva-cveta.ru/index.php?route=product/product&path=59&product_id=188&_openstat=bWFya2V0LnlhbmRleC5ydTtOb2tpYSBMdW1pYSA3MTA7dTN0em82Q01xbFVtZ3J5VS1RbmhCZzs',
	url_all:'http://dva-cveta.ru/index.php?route=product/product&path=59&product_id=188&_openstat=bWFya2V0LnlhbmRleC5ydTtOb2tpYSBMdW1pYSA3MTA7dTN0em82Q01xbFVtZ3J5VS1RbmhCZzs',
	price: '25 600',
	priceMin: '25 600',
	count: 25
}, {
	id: 2,
	img_url: 'img/2.jpg',
	title: 'Apple iPhone 5S 16Gb',
	url:'http://dva-cveta.ru/index.php?route=product/product&path=66&product_id=156',
	url_all:'http://dva-cveta.ru/index.php?route=product/product&path=66&product_id=156',
	price: '28 300',
	priceMin: '28 300',
	count: 32
}];


$(function() {
	var selector = '.add_widget',
		min_img_width = 240,
		min_widget_height = 100,
		min_img_procent_height = 0.4,
		img = $(selector),
		position = img.position(),
		w = img.outerWidth(),
		h = img.height();


	function add_widget(img) {

		var parent = img.closest('center').length ? img.closest('center') : img.closest('div');
		parent.css({position:'relative'});

	
		if (!img.widget) {
			img.widget = $(widget_container)
							.appendTo(parent)
							.width(w)
							.attr('data-leave',1);

			var offset_left = img.offset().left - parent.parent().offset().left;

      img.widget.css({left:offset_left});

			test_data.forEach(function(item){
				img.widget.append( tmpl(tpl, item) );
			});

      // here counter
      console.log('show');

			img.widget
				.append(powered)
				.mouseleave(function(){
					img.widget.attr('data-leave',1);

					function remove_my(){
						if (img.widget && img.attr('data-leave') === '1' && img.widget.attr('data-leave') === '1'){
							img.widget.fadeOut('200', function() {
								img.widget.remove();
								delete img.widget;
							});
						}
					}
					setTimeout(remove_my, 500);
				})
				.mouseenter(function(){
					$(this).attr('data-leave',0);
				})
				.css({bottom:0});

			return true;
		} else {
			return false;
		}
	}

	if (w > min_img_width && h > min_widget_height*min_img_procent_height) {

		if (1){
			img.hover(function(){

				$(this).attr('data-leave',0);

				if (add_widget(img)) img.widget.fadeIn();
				
			}, function(){

				img.attr('data-leave',1);

				function remove_widget(){
					if (img.widget && img.attr('data-leave') === '1' && img.widget.attr('data-leave') === '1'){
						img.widget.fadeOut('200', function() {
							img.widget.remove();
							delete img.widget;
						});
					}
				}

				setTimeout(remove_widget, 500);
			});
		}

	} else console.log('слишком маленькое изображение');

});