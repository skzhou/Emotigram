var cnvs = document.getElementById('cnvs'),
    ctx = cnvs.getContext('2d'),
    mirror = document.getElementById('mirror');


cnvs.width = mirror.width = window.innerWidth;
cnvs.height = mirror.height = window.innerHeight;

mirror.addEventListener('contextmenu', function (e) { });
mirror.addEventListener('contextmenu', function (e) {
    var dataURL = canvas.toDataURL('image/png');
    mirror.src = dataURL;
});