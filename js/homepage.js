var globalUser;
var questArray = [1,2,3,4,5];
var numOfQuests = questArray.length;
var currentQuest = 1;
var index;



firebase.auth().onAuthStateChanged(function(user){
    globalUser = user;
    console.log(globalUser);
});

// loads first quest
$(document).ready(function () {
    index = 0;
    loadQuest(currentQuest);
 })
 var questAddress;
// loads quest
function loadQuest(questId) {

    console.log("loading quest" + questId);
    var questRef = firebase.database().ref("quests/" + questId);
    questRef.on("value", function(snap) {
        // grab quest info from firebase
        var questName = JSON.stringify(snap.val().name);
        // remove quotation marks
        questName = questName.substring(1, questName.length -1);

        var questCost = JSON.stringify(snap.val().cost);

        var questDescription = JSON.stringify(snap.val().description);
        questDescription = questDescription.substring(1, questDescription.length -1);

        var questEcoRating = JSON.stringify(snap.val().ecoRating);

        var questImgLink = JSON.stringify(snap.val().imgLink);
        questImgLink = questImgLink.substring(1, questImgLink.length -1);

        var questLink = JSON.stringify(snap.val().link);
        questLink = questLink.substring(1, questLink.length -1);

        var questLocation = JSON.stringify(snap.val().location);
        questLocation = questLocation.substring(1, questLocation.length -1);

        var questTags = JSON.stringify(snap.val().tags);
        questTags = questTags.substring(1, questTags.length -1);

        questAddress = JSON.stringify(snap.val().address);
        questAddress = questAddress.substring(1, questAddress.length -1);

        // display quest info
        $("#questTitle").html(questName);
        $("#questDescription").html(questDescription);
        $("#questLocation").html(questLocation);
        $("#questImgLink").attr("src", questImgLink);
        $("#questLink").attr("href", questLink);
        $("#questTags").html(questTags);
        callRoute(questAddress);
        console.log(currentQuest + ": " + questAddress);


        // display number of stars based on questEcoRating (1-3)
        if(questEcoRating == 1) {
            $("#ecoTwo").css("display", "none");
            $("#ecoThree").css("display", "none");
        } else if(questEcoRating == 2) {
            $("#ecoTwo").css("display", "inline-block");
            $("#ecoThree").css("display", "none");
        } else {
            $("#ecoTwo").css("display", "inline-block");
            $("#ecoThree").css("display", "inline-block");
        }

        // change colour of dollar signs based on questCost
        if(questCost == 0) {
            $("#costOne").attr("src", "../images/dollar_sign_grey.png")
            $("#costTwo").attr("src", "../images/dollar_sign_grey.png")
            $("#costThree").attr("src", "../images/dollar_sign_grey.png")
        } else if(questCost == 1) {
            $("#costOne").attr("src", "../images/dollar_sign_green.png")
            $("#costTwo").attr("src", "../images/dollar_sign_grey.png")
            $("#costThree").attr("src", "../images/dollar_sign_grey.png")
        } else if(questCost == 2) {
            $("#costOne").attr("src", "../images/dollar_sign_green.png")
            $("#costTwo").attr("src", "../images/dollar_sign_green.png")
            $("#costThree").attr("src", "../images/dollar_sign_grey.png")
        } else {
            $("#costOne").attr("src","../images/dollar_sign_green.png")
            $("#costTwo").attr("src","../images/dollar_sign_green.png")
            $("#costThree").attr("src","../images/dollar_sign_green.png")       
        }
    })
 }

var indexRedone = () => {
  if(index >= numOfQuests) {
      index = 0;
  } else if(index < 0) {
      index = numOfQuests - 1;
  } else {
      
  }
};

  $( "#save_button" ).click(function() {
    var now = new Date().toString(' MMMM d yyyy');;
    firebase.database().ref("users/"+ globalUser.uid + "/favourites/" + (currentQuest)).update({
        "questID" : currentQuest,
    	"savedDate" : now
    });
    
    let index = questArray.indexOf(currentQuest);
    currentQuest = questArray[index + 1];
    console.log(globalUser.uid);
    loadQuest(currentQuest);

  });

  $('#rightArrow').click(function(){
    index++;
    indexRedone();
    currentQuest = questArray[index];
    loadQuest(currentQuest);
  });
  
  $('#leftArrow').click(function() {
    index--;
    indexRedone();
    currentQuest = questArray[index];
    loadQuest(currentQuest);
  });
  