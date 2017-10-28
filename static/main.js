const constraints =  { "video": { width: { exact: 320 }}};
var videoTag = document.getElementById('video-tag');
var imageTag = document.getElementById('image-tag');
var imageCapturer;

function start() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(gotMedia)
    .catch(e => { console.error('getUserMedia() failed: ', e); });
}

function gotMedia(mediastream) {
  videoTag.src = URL.createObjectURL(mediastream);
  document.getElementById('start').disabled = true;
  
  var videoTrack = mediastream.getVideoTracks()[0];
  imageCapturer = new ImageCapture(videoTrack);

  // Timeout needed in Chrome, see https://crbug.com/711524
  setTimeout(() => {
    const capabilities = videoTrack.getCapabilities()
    // Check whether zoom is supported or not.
    if (!capabilities.zoom) {
      return;
    }
  }, 500);
  
}

function takePhoto() {
  imageCapturer.grabFrame()
    .then((blob) => {

      var fd = new FormData();
      fd.append('data', blob);
      $.ajax({
          type: 'POST',
          url: '/upload',
          data: fd,
          processData: false,
          contentType: false
      }).done(function(data) {
             console.log(data);
      });


      console.log("taken: " + blob.type + ", " + blob.size + "B");
    })
    .catch((err) => { 
      console.error("takePhoto() failed: ", e);
    });
}

function processFrame(imageBitmap) {
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  canvas.getContext('2d').drawImage(imageBitmap, 0, 0);

  videoTrack.stop();
}
