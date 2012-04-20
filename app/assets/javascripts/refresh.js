var refreshTimeout = 30 * 60 * 1000; // 30 minutes
var currentTimeout = null;

var refresh, scheduleRefresh;

refresh = function() {
  $(".project").each(function(index,element) {
    var current_classes = $(element).attr("class");
    var project_id = $(element).attr('data-id');
    var project_type = $(element).hasClass('aggregate') ? 'aggregate_project' : 'project';
    $.ajax({
      url: '/'+project_type+'s/'+project_id+'/status',
      method: 'GET',
      complete: function(data) {
        $('#project_'+project_id).replaceWith(data.responseText);
        $('#project_'+project_id).attr("class", current_classes);
      }
    });
  });
  scheduleRefresh();
};

scheduleRefresh = function () {
  clearTimeout(currentTimeout);
  currentTimeout = setTimeout(refresh, refreshTimeout);
};

$(function(){
  scheduleRefresh();
});
