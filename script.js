let url = 'http://localhost:5000';
let contacts;
let contactList = document.getElementsByClassName("contact-list");

fetch(url)
.then(res => res.json())
.then(out => {
  contacts = out;
  contacts.forEach(contact => addContact(contact));
})
.catch(err => console.log(err));

const addContact = (contact) => {
  console.log(contact);
  let contactRow = document.createElement("div");
  contactRow.classList.add("contacts-row", "row", "border-bottom", "d-flex", "align-items-center");

  let contactImg = document.createElement("div");
  contactImg.classList.add("col-sm-2", "contact-img-col");
  let img = document.createElement("img");
  img.src = "./assets/images/" + contact.image;
  img.classList.add("rounded-circle", "contact-img");
  contactImg.appendChild(img);

  let contactName = document.createElement("div");
  contactName.classList.add("col-sm-6", "contact-name");
  let name = document.createElement("div");
  // name.classList.add("contact-name");
  name.innerHTML = contact.name;
  contactName.appendChild(name);

  let contactNumber = document.createElement("div");
  contactNumber.classList.add("col-sm-4", "contact-phone");
  let number = document.createElement("div");
  // number.classList.add("contact-phone");
  number.innerHTML = contact.phone;
  contactNumber.appendChild(number);

  contactRow.appendChild(contactImg);
  contactRow.appendChild(contactName);
  contactRow.appendChild(contactNumber);

  contactList[0].appendChild(contactRow);
}