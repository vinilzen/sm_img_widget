//@prepros-prepend jq.js
//@prepros-prepend template.js

$.noConflict();
jQuery(document).ready(function($) {

  var widget_container = '<div class="smw__img_widget">',
    tpl = '<div class="smw__item">' +
      '<div class="smw__imgl"><a href="<%=url%>" target="_blank"><img src="<%=mainPhoto%>" title="<%=name%>" alt="<%=name%>" /></a></div>' +
      '<div class="smw__imgdescr">' +
      '<h3><a href="<%=url%>" target="_blank"><%=name%></a></h3>' +
      '<p><a href="<%=url%>">от <strong><%=priceMin%></strong> руб.</a></p>' +
      '<p class="smw__offer"><a href="<%=url%>" target="_blank">все предложения (<%=offersCount%>)</a></p>' +
      '</div>' +
      '</div>',
    powered = '<div class="smw__powered">Powered by <a href="#">SocialMart</a> Данные - <a href="#">Яндекс.Маркет</a></div>',
    css = '.smw__img_widget{display:none;position:absolute;width:100%;left:0;background-color:#fff;overflow:hidden;padding:0}.smw__img_widget .smw__item{min-width:225px;width:50%;float:left;padding-top:10px;padding-bottom:3px}.smw__img_widget .smw__item .smw__imgl{float:left;max-width:80px;padding-right:10px;padding-left:10px;text-align:center}.smw__img_widget .smw__item .smw__imgl img{max-width:80px;max-height:73px}.smw__img_widget .smw__imgdescr{margin-left:66px;padding-right:18px;text-align:left}.smw__img_widget .smw__imgdescr h3{margin:0;padding:0 0 3px 0;font-family:Arial;font-size:13px;display:inline-block;max-height:32px;overflow:hidden}.smw__img_widget .smw__imgdescr h3 a{text-decoration:none;font-weight:bold;font-size:13px;color:#000}.smw__img_widget .smw__imgdescr h3 a:hover{color:#444}.smw__img_widget .smw__imgdescr p{margin:0;padding:0;font-size:12px;font-family:Arial;margin-top:-4px}.smw__img_widget .smw__imgdescr p a{text-decoration:none;color:#000}.smw__img_widget .smw__imgdescr p.smw__offer a{font-size:12px;font-family:Arial;color:#33a8d3;text-decoration:none}.smw__img_widget .smw__imgdescr p.smw__offer a:hover{text-decoration:underline}.smw__img_widget .smw__imgdescr p strong{color:#33a8d3;font-size:20px;font-weight:bold;font-family:Arial}.smw__img_widget .smw__imgdescr p.smw__offer{color:#33a8d3}.smw__img_widget .smw__powered{width:100%;height:10px;font-size:8.5px;color:#838383;font-family:Arial;float:left;text-align:right;padding-bottom:6px}.smw__img_widget .smw__powered a{text-decoration:none;font-size:8.5px !important;color:#33a8d3}.smw__img_widget .smw__powered a:last-child{padding-right:10px}.smw__img_widget .smw__powered a:hover{text-decoration:underline}',
    min_img_width = 240,
    min_widget_height = 100,
    min_img_procent_height = 0.4;

  $("head link[rel='stylesheet']").last().after('<style media="screen" type="text/css">' + css + '</style>');

  function start(selector) {

    var img = $(selector),
      position = img.position(),
      w = img.outerWidth(),
      h = img.height(),
      model_data;

    if (w > min_img_width && h > min_widget_height * min_img_procent_height) {

      img.hover(function() {

        $(this).attr('data-leave', 0);

        if (add_widget(img)) img.widget.fadeIn();

      }, function() {

        img.attr('data-leave', 1);

        function remove_widget() {
          if (img.widget && img.attr('data-leave') === '1' && img.widget.attr('data-leave') === '1') {
            img.widget.fadeOut('200', function() {
              img.widget.remove();
              delete img.widget;
            });
          }
        }

        setTimeout(remove_widget, 500);
      });

    } else console.log('слишком маленькое изображение', w, h, min_img_width, min_widget_height * min_img_procent_height);
  }

  function add_widget(img) {

    var parent = img.closest('center').length ? img.closest('center') : img.closest('div');

    parent.css({
      position: 'relative'
    })

    if (!img.widget) {
      img.widget = $(widget_container)
        .appendTo(parent)
        .width(img.outerWidth())
        .attr('data-leave', 1);

      var offset_left = img.offset().left - parent.parent().offset().left;

      img.widget.css({
        left: offset_left
      });

      if (img.outerWidth() < 450) {
        $('.smw__item').width('100%');
        $('.smw__img_widget').css({
          height: 'inherit'
        });
      }

      model_data.forEach(function(item) {
        img.widget.append(tmpl(tpl, item));
      });

      // here counter
      console.log('show');

      img.widget
        .append(powered)
        .mouseleave(function() {
          img.widget.attr('data-leave', 1);

          function remove_my() {
            if (img.widget && img.attr('data-leave') === '1' && img.widget.attr('data-leave') === '1') {
              img.widget.fadeOut('200', function() {
                img.widget.remove();
                delete img.widget;
              });
            }
          }
          setTimeout(remove_my, 500);
        })
        .mouseenter(function() {
          $(this).attr('data-leave', 0);
        })
        .css({
          bottom: 0
        });

      return true;
    } else {
      return false;
    }
  }

  if (window.location.search != '') {
    var url = 'http://socialmart.ru/' + window.location.search + '&json=2';
  } else {
    var url = 'http://socialmart.ru/?json=2';
  }

  $.getJSON(url, function(data) {
    model_data = data.models[0];

    if (typeof data.selector === 'string') {
      start(data.selector);
    } else if (typeof data.selector === 'object' && data.selector.length > 0) {
      data.selector.forEach(function(s, i) {
        model_data = data.models[i];
        start(s);
      });
    }
  });

});