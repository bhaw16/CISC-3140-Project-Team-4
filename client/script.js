function validateForm() {
    var x = document.forms["ConcertForm"]["fname"].value;
    if (x == "") {
      alert("First Name Must Be Filled Out! ");
      return false;
    }
    var y = document.forms["ConcertForm"]["lname"].value;
    if (y == "") {
        alert("Last Name Must Be Filled Out! ");
        return false;
    }
    var z = document.forms["ConcertForm"]["email"].value;
    if(z == ""){
        alert("Email Must Be Filled Out! ");
        return false;
    }



    if(!z.endsWith('@gmail.com')){
        alert("This is an Invalid Email! Try Again!");
    }

    // currently trying to figure out how to subtract the current date from date of birth to figure out how old they are
    //purpose of that is to see if they're above the age of 14 to be able to even attend concerts

    let currentDate = new Date();

    let dateInput = document.getElementById('dob');
    let dateOfBirth = dateInput.value;

    let timeDifference = currentDate - dateOfBirth;

    let daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let yearsDifference = Math.floor(daysDifference / 365);

    
document.write(yearsDifference);



  }
function navigateToLogin() {
            window.location.href = 'login.html';
        }
