function run() {
  
  var arrows = document.querySelectorAll(".arrow");
  var imgBox = document.querySelector(".imgBox");
  var server = 'http://localhost:8080';
  var imgBoxBg = imgBox.currentStyle || window.getComputedStyle(imgBox, false);
  
  imgBoxBg = imgBoxBg.backgroundImage.toString();
  imgBoxBg = imgBoxBg.slice(31, -2);
  
  
  arrows[0].onclick = function prevPhoto(ev) {
    ev.preventDefault();
    ajaxGet(server + '/getPhoto/?img=' + imgBoxBg + '&way=' + 'prev', function(data) {
      imgBox.style.backgroundImage = "url('/img/" + data.toString() + "')";
      imgBoxBg = data;
    });
  }

  arrows[1].onclick = function nextPhoto(ev) {
    ev.preventDefault();
    ajaxGet(server + '/getPhoto/?img=' + imgBoxBg + '&way=' + 'next', function(data) {
      imgBox.style.backgroundImage = "url('/img/" + data.toString() + "')";
      imgBoxBg = data;
    });
  }
  
  function ajaxGet(url, success) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url);

    xhr.onreadystatechange = function() {
      if (xhr.readyState > 3 && xhr.status === 200) {
        success(xhr.responseText);
      };
    }
  
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
    return xhr;
  }
  
} // end run


if (document.readyState !== 'loading') {
  run();
}
else if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', run);
}
else {
  document.attachEvent('onreadystatechange', function() {
    if (document.readyState === 'complete') {
      run();
    }
  });
}