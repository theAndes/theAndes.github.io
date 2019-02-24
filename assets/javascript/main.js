window.onscroll = function () { myFunction() };

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    $(".top").slideDown("slow");
  } else {
    $(".top").hide();
    navbar.classList.remove("sticky");
  }
}
var text
$('.direction').on('click', function () {
  var top = $('.head')
  text = top.text();
  console.log(text);

  if ($(this).hasClass("down")) {
    console.log("You clicked Down");
    if (text == 'AE') {
      $('html,body').animate({
        scrollTop: $("#projects").offset().top - 60
      },
        'slow');
      top.text("Projects")

    }
    else if (text == "Projects") {
      $('html,body').animate({
        scrollTop: $("#art-2").offset().top - 60
      },
        'slow');
      top.text("Contact")

    }


  }
  else {
    console.log("You clicked UP");
    if (text == "Projects" || text == "AE") {
      $('html,body').animate({
        scrollTop: $("#art-1").offset().top - 60
      },
        'slow');
      top.text("AE")

    }
    else if (text == "Contact") {
      $('html,body').animate({
        scrollTop: $("#projects").offset().top - 60
      },
        'slow');
      top.text("Projects")

    }
  }
})






















// const targets = document.querySelectorAll('article.slide');
// const lazyLoad = target => {
//   const io = new IntersectionObserver((entries, observer) => {
//     console.log(entries)
//     entries.forEach(entry => {
//       console.log('😍');

//       if (entry.isIntersecting) {
//         const img = entry.target;
//         console.log(img);

//         const src = img.getAttribute('data-lazy');

//         img.setAttribute('src', src);
//         img.classList.add('fade');

//         observer.disconnect();
//       }
//     });
//   });

//   io.observe(target)
// };

// targets.forEach(lazyLoad);



//form stuff
// Initialize Firebase
var config = {
  apiKey: "AIzaSyA8nTa94tWnQvxGywE12v4wTn9vemi8ykQ",
  authDomain: "contact-form-74746.firebaseapp.com",
  databaseURL: "https://contact-form-74746.firebaseio.com",
  projectId: "contact-form-74746",
  storageBucket: "",
  messagingSenderId: "242604316800"
};
firebase.initializeApp(config);

//Ref input

var messagesRef = firebase.database().ref('messages');


//listen for form, submit form
document.getElementById('contact-form').addEventListener('submit',
  submitForm);

function submitForm(e){
  e.preventDefault();

  //Get Values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  var time = getFormattedDate();
  console.log(name, company, email, phone, message, time);

  saveMessage(name, company, email, phone, message,time);

  //Show alert

  document.querySelector('.alert').style.display = 'block';

  //hide alert after 3 secs

  setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';

  }, 3000)

  //reset form
  document.getElementById('contact-form').reset();


  
  
}
  
//get element function
function getInputVal(id){

  return document.getElementById(id).value;
}   




//save message to firebase

function saveMessage (name, company, email, phone, message,time){

  getFormattedDate();
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
      name:name,
      company:company,
      email:email,
      phone:phone,
      message:message,
      timeStamp: time,
  })

  
}

function getFormattedDate() {
  var date = new Date();

  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hour = (hour < 10 ? "0" : "") + hour;
  min = (min < 10 ? "0" : "") + min;
  sec = (sec < 10 ? "0" : "") + sec;

  var str = date.getFullYear() + "-" + month + "-" + day + "_" +  hour + ":" + min + ":" + sec;
  return str
}