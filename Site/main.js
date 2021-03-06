    jQuery.noConflict();
    jQuery(function(){
      var $ = jQuery,
        $map = $('#map1');

      var options = {
        "year" : 2008,
        "concern" : "Recession and unemployment"
      };
      
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
        
        backgroundColor: 'transparent', //very light blue for ocean
        regionStyle: {
          initial: {
            fill: '#ddd'
          }
        },
        series: {
          regions: [{
            scale: ['#007dc3', '#D7EDFA'],
            normalizeFunction: 'polynomial',
            values: data[options. year][options.concern]
          }]
        },
        //LOOK AT THIS SNOOG! :)
        onRegionLabelShow: function(e, el, code) {
       
          var rankText = data[options.year][options.concern][code] || 'not in top 5';  
          var hoverText = hover[options.year][code] || '';
          
          //Check if country exists in array
          //Loop through our object of countries and see if the passed in code is
          //in the object
          var inArray = false;
          for (var countryCode in data[options.year][options.concern]) {
            if(countryCode === code){
              inArray = true;
            }
          }

          //if we found the country -- yay!
          if(inArray === true){
            //if it does, and it has no rank, display this text
            if (data[options.year][options.concern][code] == undefined) {
              el.html(el.html()+'<br /><strong>Not in top 5</strong><br />' + hoverText);
            } else {
              //if it exists in the array and has a rank, display this text
              el.html(el.html()+'<br /><strong> Rank - ' + rankText + '</strong><br />' + hoverText);
            }
          // else the passed in code wasn't in our object -- print we didn't find it  
          } else {
            el.html(el.html()+'<br />Not in survey');
          }
        }
      });

	//changes active and inactive colors of the year buttons
      $('.js-year').on({
        click : function(e) {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');
		
          options.year = $(this).attr('id');
          //console.log('year updated!')
          //console.log(options);
          updateMap();
          updateText();
        }
      });

      //Updates the map when you chagne the leading concern selection
      $(".js-select").on({
        change : function (e) {
          options.concern = $(this).val();
         // console.log('concern updated');
          updateMap();
          updateText();
          //console.log(options);
        }
      });

      var updateMap = function () {
        var mapObject = $map.vectorMap('get', 'mapObject');
        mapObject.series.regions[0].setValues(data[options.year][options.concern]);
      };
      
      var updateText = function () {
        var concernYear = options.year;
        var concernName = options.concern;
        $('#text').html(concernDescriptions[options.year][options.concern]['desc']);
      };
    });