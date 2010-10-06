var days_pie, hours_pie;
function display_sidebar_stats(start, end) {
   $.getJSON('/events/stats.json', {start: start.getTime(), end: end.getTime()}, function(response) {
      if (response.days_spent && response.days_spent.length) {
         $('#days-plot:hidden').show();
         days_pie = $.jqplot('days-plot', [response.days_spent], {
             title: 'Days spent',
             grid: { drawGridLines: false, gridLineColor: '#fff', background: '#fff',  borderColor: '#fff', borderWidth: 1, shadow: false },
             highlighter: {sizeAdjust: 7.5},
             seriesDefaults:{renderer:$.jqplot.PieRenderer, rendererOptions:{sliceMargin:3, padding:10, border:false}},
           legend:{show:true}
        });
      } else {
         $('#days-plot:visible').hide();
      }

      if (response.hours_spent && response.hours_spent.length) {
         $('#hours-plot:hidden').show();
         hours_pie = $.jqplot('hours-plot', [response.hours_spent], {
             title: 'Hours spent',
             grid: { drawGridLines: false, gridLineColor: '#fff', background: '#fff',  borderColor: '#fff', borderWidth: 1, shadow: false },
             seriesDefaults:{renderer:$.jqplot.PieRenderer, rendererOptions:{sliceMargin:3, padding:10, border:false}},
           legend:{show:true}
        });
      } else {
         $('#hours-plot:visible').hide();
      }
      
   });
}


$(function() {
   if (days_pie === null) {
      // it hasn't been loaded yet by the fullCalendar callback
      var view = $('#calendar').fullCalendar('getView');
      display_sidebar_stats(view.start, view.end);
   }
   
   $('a.account').fancybox({
      'width': '75%',
      'height': '75%',
      'autoScale'     : false,
      'transitionIn': 'none',
      'transitionOut': 'none',
      onComplete: function(array, index, opts) {
         $.lazy({
            src: '/static/account.js',
            name: 'account',
            dependencies: { css: ['/static/css/account.css'] }//,
            //cache: true //?????? what is this?
         });
      }
   });

   
   $('a.user-settings').fancybox({
      'width': '75%',
      'height': '75%',
      'autoScale'     : false,
      'transitionIn': 'none',
      'transitionOut': 'none',
      //'type': 'iframe',
      onClosed: function() {
         location.href='/'; // works but not ideal
      }
   });
   
   $('a.share').fancybox({
      'width': '75%',
      'height': '75%',
      'autoScale'     : false,
      'transitionIn': 'none',
      'transitionOut': 'none'
      //'type': 'iframe',
      //onClosed: function() {
      //   location.href='/'; // works but not ideal
      //}
   });   
   
   
   
});