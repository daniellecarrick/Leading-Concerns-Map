 jQuery.noConflict();
    jQuery(function(){
      var $ = jQuery,
        $map = $('#map1');

      var options = {
        "year" : 2000,
        "concern" : "Recession and unemployment"
      }

      $('#focus-init').click(function(){
        $map.vectorMap('set', 'focus', 1, 0, 0);
      });

      $map.vectorMap({
        map: 'world_mill_en',
        focusOn: {
          x: 0.5,
          y: 0.5,
          scale: 1
        },
        
        backgroundColor: '#E8F7FA', //very light blue for ocean
        regionStyle: {
          initial: {
            fill: '#ddd'
          }
        },
        series: {
          regions: [{
            scale: ['#007dc3', '#D7EDFA'],
            normalizeFunction: 'polynomial',
            values: data[options.year][options.concern]
          }]
        },
        onRegionLabelShow: function(e, el, code) {
          el.html(el.html()+' Rank - '+data[options.year][options.concern][code]);
        }
      });

      $('.js-year').on({
        click : function(e) {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          options.year = $(this).attr('id');
          updateMap();
        }
      });

      //Select Change
      $(".js-select").on({
        change : function (e) {
          options.concern = $(this).val();
          updateMap();
        }
      });

      var updateMap = function () {
        var mapObject = $map.vectorMap('get', 'mapObject');
        mapObject.series.regions[0].setValues(data[options.year][options.concern]);
      };

    });