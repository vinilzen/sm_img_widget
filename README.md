Виджет картинка для SM
=============

index.html демо страница для верстки.

js/test.js - скрипт для встраивания на сайты партнеров. Для теста, можно добавлять скопированное содержимое в консоль на странице партнеров.

При изменении стилей в main.css, их нужно вписать в переменную var css в файле js/test.js на 54 строке

Сжатые файл test.js находится в js/min/test.min.js


Страницы для теста
=============

 Селекторы используются для оперделения изображений на которые нужно накладывать виджет

| Старница для встраивания | Селектор | 
| :------------- |:-------------|
| http://www.mobiledevice.ru/sony-xperia-acro-sony-android-smartfon-usilennii-korpus-prochnii.aspx |'#hypercontext img:first'|
| http://mobiltelefon.ru/post_1398233081.html | '.postbody img:first' |
| http://mobiltelefon.ru/post_1398075870.html |['.postbody img:eq(0)', '.postbody img:eq(1)'] |
| http://mobiltelefon.ru/post_1385651143.html |['.postbody img:eq( 0 )', '.postbody img:eq(1)' , '.postbody img:eq(2)'] |


Запрос моделей телефонов
=============

Забираем JSON тут http://dev.socialmart.ru/?json=2,  где 2 - количество моделей.
```javascript
{
  "selector": ".postbody img:first",
  "models": [[{
    "vendor": "LG",
    "name": "Nexus 5 16Gb",
    "mainPhoto": "http:\/\/mdata.yandex.net\/i?path=b1101194043_img_id1514955707961763939.jpeg",
    "priceMin": "13250",
    "priceCurrCode": "RUR",
    "priceCurrName": "\u0440",
    "offersCount": "274",
    "url": "http:\/\/dev.socialmart.ru\/product\/10564185\/LG-Nexus-5-16Gb?utm_source=smwi-test&utm_id=10564185"
  }, {
    "vendor": "Apple",
    "name": "iPhone 4S 64Gb",
    "mainPhoto": "http:\/\/mdata.yandex.net\/i?path=b1205082554_img_id4774149717563272798.jpg",
    "priceMin": "16650",
    "priceCurrCode": "RUR",
    "priceCurrName": "\u0440",
    "offersCount": "40",
    "url": "http:\/\/dev.socialmart.ru\/product\/7717687\/Apple-iPhone-4S-64Gb?utm_source=smwi-test&utm_id=7717687"
  }]]
}
```
