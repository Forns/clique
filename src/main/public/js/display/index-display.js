/**
 * index-display.js
 *
 * Contains the index UI functionality and display
 * features
 */

$(function () {
  var browserCompat,
      handleFileSelect;
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    browserCompat = "Hooray! Your browser supports file upload.";
    
    // TESTING: File handling
    $("#file-upload").html(
      "<input type='file' id='files' name='files[]' multiple />" +
      "<output id='list'></output>"
    );
    
    handleFileSelect = function (event) {
      var files = event.target.files; // FileList object
      
      // files is a FileList of File objects. List some properties.
      var output = [];
      for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', f.name, '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate.toLocaleDateString(), '</li>');
      }
      $("#list").html("<ul>" + output.join('') + "</ul>");
    };
    
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    
  } else {
    browserCompat = "Que lastima! Your browser does not support file upload.";
  }
  
  $("#browser-support").html(browserCompat);
});
