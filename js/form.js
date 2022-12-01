function validateForm() {
    let x = document.forms["myForm"]["fname"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
    if (x == "ironhack") {
        alert("You cannot be Ironhack, because I am Ironhack");
        return false;
    }
}

