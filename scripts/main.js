// No JavaScript code is required for this project.

//Listen for when the element with ID "gift" is clicked

var redirectURL = "https://steamcommunity.com/sharedfiles/filedetails/?id=3215057720";
var canRedirect = false;

function ready() {
    var gift = document.getElementById("gift");
    var letter = document.getElementById("letter");
    var scaler = document.getElementById("scaler");
    var player = document.getElementById("player");
    var volumeSlider = document.getElementById("volumeSlider");
    var countdownElement = document.getElementById("countdown");
    var playButton = document.getElementById("playbutton");
    gift.addEventListener("click", function() {
        //Change the text of the element with ID "gift" to "Thank you!"
        gift.className = "hidden";
        scaler.className = "hidden";
        letter.className = "";

        //Play the letter_open.wav sound
        var audio = new Audio("letter_open.ogg");
        audio.play();

        setTimeout(function() { //Make the text appear after 10s
            countdownElement.className = ""; 
            canRedirect = true;   
        }, 10000);

    });

    letter.addEventListener("click", function() {
        if (canRedirect) {
            countdownElement.innerHTML = "(Redirecting...)";
            document.location = redirectURL;
            
        }
    });

    volumeSlider.addEventListener("input", () => {
        player.volume = volumeSlider.value;

        if (player.volume == 0) {
            player.pause();
        } else {
            player.play();
        }
      });
      player.volume = 0.3;

      letter.click();

      document.addEventListener("click", function() {
        playButton.className = "hidden";
        player.play();
      });
}

//Run function when page is ready
document.addEventListener("DOMContentLoaded", ready);


