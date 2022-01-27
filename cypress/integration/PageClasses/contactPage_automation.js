/// <reference types="cypress"/>

const contact = require("../Locators/contact.json");
const monthNameList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// visit contact page
class ContactPage {
  visit(url) {
    cy.visit(url);
  }

  // page title verification
  Title() {
    cy.title().should("eq", "Contact");
  }

  // adding data in Name field
  Name(personname) {
    const name = cy.get(contact.PersonName);
    name.clear();
    name.type(personname);
    name.click();
    return this;
  }

  // adding data in phone field with country code and verifying the correct country is selected
  Phone(phonenumber, selectedcountry) {
    const phone = cy.get(contact.PhoneNumber);
    phone.click();
    phone.type(phonenumber);
    const phonecountry = cy.get(contact.PhoneCountry);
    phonecountry.should("have.attr", "alt").and("equal", selectedcountry);
    return this;
  }

  // adding email address
  Email(value) {
    const email = cy.get(contact.Email);
    email.clear();
    email.type(value);
    return this;
  }

  // adding guests count
  Guests(value) {
    const guests = cy.get(contact.Guests);
    guests.clear();
    guests.type(value);
    return this;
  }

  DatePicker(startmonth, startdate, endmonth, enddate) {
    //Clicking on Datepicker
    const dp = cy.get(contact.DatePicker);
    dp.click();

    //Moving to starting month
    cy.get(contact.FocusMonth)
      .invoke("text")
      .then((month2) => {
        const monthname = month2.split(" ");
        const monthindex = monthNameList.findIndex(
          (month) => month === monthname[0]
        );
        const StartingMonth = monthNameList.indexOf(startmonth) - monthindex;
        for (var i = 0; i < StartingMonth; i++) {
          cy.get(contact.NextMonthArrow).click();
        }
      });

    //Selecting start date
    cy.get(`[aria-label$=" ${startmonth} ${startdate}, 2022"]`).click();

    //Moving to ending month
    cy.get(contact.FocusMonth)
      .invoke("text")
      .then((month2) => {
        const monthname = month2.split(" ");
        const monthindex = monthNameList.findIndex(
          (month) => month === monthname[0]
        );
        const EndingMonth = monthNameList.indexOf(endmonth) - monthindex;
        for (var i = 0; i < EndingMonth; i++) {
          cy.get(contact.NextMonthArrow).click();
        }
      });

    //Selecting end date
    cy.get(`[aria-label$=" ${endmonth} ${enddate}, 2022"]`).click();

    //Selected dates verification
    var zero = (monthname) => {
      const MonthNumber = monthNameList.indexOf(monthname) + 1;
      if (MonthNumber < 10) {
        return "0" + MonthNumber;
      } else {
        return MonthNumber;
      }
    };

    cy.get(contact.ArrivalDate).should(
      "have.value",
      `${startdate}/${zero(startmonth)}/2022`
    );
    cy.get(contact.DepartureDate).should(
      "have.value",
      `${enddate}/${zero(endmonth)}/2022`
    );
  }

  Comment(value) {
    const comment = cy.get(contact.Comment);
    comment.clear();
    comment.type(value);
    return this;
  }

  Submit() {
    const Sbutton = cy.get(contact.Send);
    Sbutton.click();
  }

  SendError() {
    const errormsg = cy.get(contact.SendErrorConf);
    errormsg.should("be.visible");
  }
}

export default ContactPage;
