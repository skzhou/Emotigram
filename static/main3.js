
// Check scroll position and add/remove background to navbar
function checkScrollPosition() {
    if($(window).scrollTop() > 50) {
      $(".fixed-header").addClass("scroll");
  } else {        
      $(".fixed-header").removeClass("scroll");
  }
}

$(document).ready(function () {   
    // Single page nav
    $('.fixed-header').singlePageNav({
        offset: 59,
        filter: ':not(.external)',
        updateHash: true        
    });

    checkScrollPosition();

    // nav bar
    $('.navbar-toggle').click(function(){
        $('.main-menu').toggleClass('show');
    });

    $('.main-menu a').click(function(){
        $('.main-menu').removeClass('show');
    });

    // hover animation
    // $('.emojis').hover(function () {
    //   $(this).addClass('animated bounce');
      
    // });






});

// $(window).on("scroll", function() {
// });






function checkScrollSection() {
  // $('#e11').animateCss('rubberBand');
  var curr_section = "section0";
  if($(this).scrollTop()<=$('#section1').position().top+300){
  //     console.log('');
    curr_section = "section1";
  }
  else if($(this).scrollTop()<=$('#section2').position().top+300){
  //     console.log('');
    curr_section = "section2";
  }
  else if($(this).scrollTop()<=$('#section3').position().top+300){
  //     console.log('');
    curr_section = "section3";
  }
  else if($(this).scrollTop()<=$('#section4').position().top+300){
  //     console.log('');
    curr_section = "section4";
  }
    else if($(this).scrollTop()<=$('#section5').position().top+300){
  //     console.log('');
    curr_section = "section5";
  }
    else if($(this).scrollTop()<=$('#section6').position().top+300){
  //     console.log('');
    curr_section = "section6";
  }
    else if($(this).scrollTop()<=$('#section7').position().top+300){
  //     console.log('');
    curr_section = "section7";
  }
    else if($(this).scrollTop()<=$('#section8').position().top+300){
  //     console.log('');
    curr_section = "section8";
  }
    else if($(this).scrollTop()<=$('#section9').position().top+300){
  //     console.log('');
    curr_section = "section9";
  }
  else if($(this).scrollTop()<=$('#section10').position().top+300){
  //     console.log('');
    curr_section = "section10";
  }
  console.log(curr_section);

  return curr_section;
}


var timer = null;
console.log(timer);
$(window).on('scroll', function() {
      checkScrollPosition();  
      $("body").css("background-position","500% " + ($(this).scrollTop() / 2) + "px");
    if(timer !== null) {
        console.log(timer);
        clearTimeout(timer);        
    }
    timer = setTimeout(function() {

          var section = checkScrollSection();

          var snap = takeSnapshot();

          // Show image. 
          // image.setAttribute('src', snap);
          // image.classList.add("visible");

          // Enable delete and save buttons
          // delete_photo_btn.classList.remove("disabled");
          // download_photo_btn.classList.remove("disabled");

          // Set the href attribute of the download button to the snap url.
          // download_photo_btn.href = snap;

          // Pause video playback of stream.
          // video.pause();

          $(function() {
              $.ajax({
                  url: '/upload',
                  data: {url: snap},
                  type: 'POST',
                  success: function(response) {
                      if (response.emotion == 'neutral') {

                        $("#"+section+ " > #mydiv > #e3").addClass('animated bounce');
                        setTimeout(function(){ $("#"+section+ " > #mydiv > #e3").removeClass('animated bounce');},1000)
                        console.log(response.emotion);
                        var str = $("#"+section+ " > #mydiv > #e8").text();
                        var num = parseInt(str);
                        num = num+1;
                        $("#"+section+ " > #mydiv > #e8").html(num.toString());
                      }
                      else if (response.emotion == 'happiness') {
                        $("#"+section+ " > #mydiv > #e1").addClass('animated bounce');
                        setTimeout(function(){ $("#"+section+ " > #mydiv > #e1").removeClass('animated bounce');},1000)
                        console.log(response.emotion);
                        var str = $("#"+section+ " > #mydiv > #e6").text();
                        var num = parseInt(str);
                        num = num+1;
                        $("#"+section+ " > #mydiv > #e6").html(num.toString());
                      }
                      else if (response.emotion == 'sadness') {
                        $("#"+section+ " > #mydiv > #e5").addClass('animated bounce');  
                        setTimeout(function(){ $("#"+section+ " > #mydiv > #e5").removeClass('animated bounce');},1000)
                        console.log(response.emotion);
                        var str = $("#"+section+ " > #mydiv > #e10").text();
                        var num = parseInt(str);
                        num = num+1;
                        $("#"+section+ " > #mydiv > #e10").html(num.toString());
                      }
                      else if (response.emotion == 'fear' || response.emotion == 'surprise') {
                        $("#"+section+ " > #mydiv > #e2").addClass('animated bounce');
                        setTimeout(function(){ $("#"+section+ " > #mydiv > #e2").removeClass('animated bounce');},1000)
                        console.log(response.emotion);
                        var str = $("#"+section+ " > #mydiv > #e7").text();
                        var num = parseInt(str);
                        num = num+1;
                        $("#"+section+ " > #mydiv > #e7").html(num.toString());
                      }
                      else if (response.emotion == 'anger') {
                        $("#"+section+ " > #mydiv > #e4").addClass('animated bounce');
                        setTimeout(function(){ $("#"+section+ " > #mydiv > #e4").removeClass('animated bounce');},1000)
                        console.log(response.emotion);
                        var str = $("#"+section+ " > #mydiv > #e9").text();
                        var num = parseInt(str);
                        num = num+1;
                        $("#"+section+ " > #mydiv > #e9").html(num.toString());
                      }

                  },
                  error: function(error) {
                      console.log(error);
                  }
              });

              
          });

    }, 500);
});



















// References to all the element we will need.
var video = document.querySelector('#camera-stream');
    // image = document.querySelector('#snap'),
    // start_camera = document.querySelector('#start-camera'),
    // controls = document.querySelector('.controls'),
    // take_photo_btn = document.querySelector('#take-photo'),
    // delete_photo_btn = document.querySelector('#delete-photo'),
    // download_photo_btn = document.querySelector('#download-photo'),
    // error_message = document.querySelector('#error-message');

// The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options
navigator.getMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);


if(!navigator.getMedia){
  console.log("Your browser doesn't have support for the navigator.getUserMedia interface.");
}
else{

  // Request the camera.
  navigator.getMedia(
    {
      video: true
    },
    // Success Callback
    function(stream){

      // Create an object URL for the video stream and
      // set it as src of our HTLM video element.
      video.src = window.URL.createObjectURL(stream);

      // Play the video element to start the stream.
      video.play();
      // video.onplay = function() {
      //   showVideo();
      // };

    },
    // Error Callback
    function(err){
      displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
    }
  );

}



// Mobile browsers cannot play video without user input,
// so here we're using a button to start it manually.
// start_camera.addEventListener("click", function(e){

//   e.preventDefault();

//   // Start video playback manually.
//   video.play();
//   showVideo();

// });


// take_photo_btn.addEventListener("click", function(e){

//   e.preventDefault();

//   var snap = takeSnapshot();

//   // Show image. 
//   // image.setAttribute('src', snap);
//   // image.classList.add("visible");

//   // Enable delete and save buttons
//   delete_photo_btn.classList.remove("disabled");
//   download_photo_btn.classList.remove("disabled");

//   // Set the href attribute of the download button to the snap url.
//   download_photo_btn.href = snap;

//   // Pause video playback of stream.
//   video.pause();

//   $(function() {
//       $.ajax({
//           url: '/upload',
//           data: {url: snap},
//           type: 'POST',
//           success: function(response) {
//               console.log(response);
//           },
//           error: function(error) {
//               console.log(error);
//           }
//       });
//   });

// });


// delete_photo_btn.addEventListener("click", function(e){

//   e.preventDefault();

//   // Hide image.
//   image.setAttribute('src', "");
//   image.classList.remove("visible");

//   // Disable delete and save buttons
//   delete_photo_btn.classList.add("disabled");
//   download_photo_btn.classList.add("disabled");

//   // Resume playback of stream.
//   video.play();

// });



// function showVideo(){
//   // Display the video stream and the controls.

//   hideUI();
//   video.classList.add("visible");
//   controls.classList.add("visible");
// }


function takeSnapshot(){
  // Here we're using a trick that involves a hidden canvas element.  

  var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

  var width = video.videoWidth,
      height = video.videoHeight;

  if (width && height) {

    // Setup a canvas with the same dimensions as the video.
    hidden_canvas.width = width;
    hidden_canvas.height = height;

    // Make a copy of the current frame in the video on the canvas.
    context.drawImage(video, 0, 0, width, height);

    // Turn the canvas image into a dataURL that can be used as a src for our photo.
    return hidden_canvas.toDataURL('image/png');
  }
}


// function displayErrorMessage(error_msg, error){
//   error = error || "";
//   if(error){
//     console.log(error);
//   }

//   error_message.innerText = error_msg;

//   hideUI();
//   error_message.classList.add("visible");
// }


// function hideUI(){
//   // Helper function for clearing the app UI.

//   controls.classList.remove("visible");
//   start_camera.classList.remove("visible");
//   video.classList.remove("visible");
//   snap.classList.remove("visible");
//   error_message.classList.remove("visible");
// }













  // $(document).on('scroll', function() {
  //   if($(this).scrollTop()>=$('#theTarget').position().top){
  //     console.log('');
  //   }
  // })

