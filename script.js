const server = 'http://localhost:5000';

const numsToLetters = {
  2:['A','B','C'],
  3:['D','E','F'],
  4:['G','H','I'],
  5:['J','K','L'],
  6:['M','N','O'],
  7:['P','Q','R','S'],
  8:['T','U','V'],
  9:['W','X','Y','Z']
}

let contacts, contactList, inputBox, switchButton;

window.onload = () => {
  contactList = document.getElementsByClassName("contact-list")[0];

  inputBox = document.getElementsByClassName("input-box")[0];
  inputBox.focus();
  inputBox.addEventListener('input', checkDash);

  switchButton = document.getElementsByClassName("form-check-input")[0];
  switchButton.addEventListener('click', checkDash);
}

fetch(server)
.then(res => res.json())
.then(out => {
  contacts = out;
  contacts.forEach(contact => addContact(contact));
})
.catch(err => console.log(err));

// Pull JSON from server and add to page as list of contacts
const addContact = (contact) => {
  let contactRow = document.createElement("div");
  contactRow.classList.add("contacts-row", "row", "border-bottom", "d-flex", "align-items-center");

  let contactImg = document.createElement("div");
  contactImg.classList.add("col-sm-2", "contact-img-col", "h-100");
  let img = document.createElement("img");
  img.src = "./assets/images/" + contact.image;
  img.classList.add("rounded-circle", "contact-img");
  contactImg.appendChild(img);

  let contactName = document.createElement("div");
  contactName.classList.add("col-sm-6", "contact-name");
  let name = document.createElement("div");
  name.classList.add("name");
  name.innerHTML = contact.name;
  contactName.appendChild(name);

  let contactNumber = document.createElement("div");
  contactNumber.classList.add("col-sm-4", "contact-phone");
  let number = document.createElement("div");
  number.classList.add("num");
  number.innerHTML = contact.phone;
  contactNumber.appendChild(number);

  contactRow.appendChild(contactImg);
  contactRow.appendChild(contactName);
  contactRow.appendChild(contactNumber);

  contactList.appendChild(contactRow);
}

// Called when a number on the keypad is clicked
const updateInput = (number) => {
  if (inputBox.value.length >= 12) return;
  inputBox.value += number;
  if (inputBox.value.length == 3 || inputBox.value.length == 7) inputBox.value += '-';
  if (document.getElementsByClassName("form-check-input")[0].checked) searchContactNumbers();
  else searchContactNames();
}

// Called when backspace button in input box is clicked
const backspace = () => {
  if (String(inputBox.value).charAt(inputBox.value.length-1) == '-') inputBox.value = String(inputBox.value).slice(0,-2);
  else inputBox.value = String(inputBox.value).slice(0,-1);
  if (document.getElementsByClassName("form-check-input")[0].checked) searchContactNumbers();
  else searchContactNames();
}

// Called when a number is typed. Checks for a '-' and calls appropriate search function
const checkDash = (e) => {
  if ((inputBox.value.length == 3 || inputBox.value.length == 7) && e.inputType != "deleteContentBackward") inputBox.value += '-';
  if (e.inputType == "deleteContentBackward" && (inputBox.value.length == 3 || inputBox.value.length == 7)) inputBox.value = String(inputBox.value).slice(0,-1);
  if (document.getElementsByClassName("form-check-input")[0].checked) searchContactNumbers();
  else searchContactNames();
}

// Called when the value in the input box changes. Hides contacts whose numbers don't match the input.
const searchContactNumbers = () => {
  let filter = inputBox.value;
  let contactRows = document.getElementsByClassName("contacts-row");
  for (let i = 0; i < contactRows.length; i++) {
    let num = contactRows[i].getElementsByClassName("num")[0];
    if (num.innerHTML.slice(0,filter.length) != filter) {
      contactRows[i].classList.replace("d-flex", "d-none");
    } else {
      if (contactRows[i].classList.contains("d-none")) {
        contactRows[i].classList.replace("d-none", "d-flex");
      }
    }
  }
}

// Called when the value in the input box changes. Hides contacts whose names don't match the input.
const searchContactNames = () => {
  let numValue = String(inputBox.value);
  let filter = []; // Array of arrays of the letters that match to each number in the input so far
  for (let i = 0; i < inputBox.value.length; i++) {
    if (numValue.charAt(i) != '-') {
      if (numsToLetters[numValue.charAt(i)]) filter.push(numsToLetters[numValue.charAt(i)]);
      else filter.push([]);
    }
  }
  let contactRows = document.getElementsByClassName("contacts-row");
  for (let i = 0; i < contactRows.length; i++) {
    let name = String(contactRows[i].getElementsByClassName("name")[0].innerHTML);
    let match = true;
    for (let j = 0; j < filter.length; j++) {
      if (!filter[j].includes(name.charAt(j).toUpperCase())) match = false;
    }
    if (!match) contactRows[i].classList.replace("d-flex", "d-none");
    else if (contactRows[i].classList.contains("d-none")) {
      contactRows[i].classList.replace("d-none", "d-flex");
    }
  }
}


