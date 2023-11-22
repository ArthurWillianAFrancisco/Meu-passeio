(function () {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ){
      console.log("Não consegimos conectar com sua camera");
      return;
    }
  
    // get page elements
    const video = document.querySelector("#video");
    //const btnPlay = document.querySelector("#btnPlay");
    //const btnPause = document.querySelector("#btnPause");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const btnChangeCamera = document.querySelector("#btnChangeCamera");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
    const devicesSelect = document.querySelector("#devicesSelect");
  
    // video constraints
    const constraints = {
      video: {
        height: 1080,
        aspectRatio:21/9
      }
    };
  
    // use front face camera
    let useFrontCamera = true;
  
    // current video stream
    let videoStream;
  
    // handle events
    // play
    /*btnPlay.addEventListener("click", function () {
      video.play();
      btnPlay.classList.add("is-hidden");
      btnPause.classList.remove("is-hidden");
    });
  
    // pause
    btnPause.addEventListener("click", function () {
      video.pause();
      //btnPause.classList.add("is-hidden");
      //btnPlay.classList.remove("is-hidden");
    });*/
  
    // take screenshot
    btnScreenshot.addEventListener("click", function () {
      const img = document.createElement("img");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      img.src = canvas.toDataURL("image/png");
      screenshotsContainer.prepend(img);
      console.log(img);
    }); 
    
  
    // switch camera
    btnChangeCamera.addEventListener("click", function () {
      useFrontCamera = !useFrontCamera;
  
      initializeCamera();
    });
  
    // stop video stream
    function stopVideoStream() {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    }
  
    // initialize
    async function initializeCamera() {
      stopVideoStream();
      constraints.video.facingMode = useFrontCamera ? "user" : "environment";
  
      try {
        videoStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = videoStream;
      } catch (err) {
        console.log("Desculpe não conseguimos acessar sua camera, verifique se você permitiu o acesso");
      }
    }
  
    initializeCamera();
  })();