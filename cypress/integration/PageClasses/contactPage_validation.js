/// <reference types="cypress"/>

const contact = require("../Locators/contact.json");

class ContactPageValidation {
  visit(url) {
    cy.visit(url);
  }

  // Validating the error appearance when field left blank
  FieldValidation() {
    var errorvalidator = (fieldlocator, errorlocator, fieldname) => {
      const field = cy.get(fieldlocator);
      field.click({ force: true });
      cy.get(contact.ContactHeader).contains("Contact").click();
      cy.get(errorlocator)
        .parent()
        .should(($el) => expect($el).to.contain(`${fieldname} is mandatory`));
    };

    errorvalidator(contact.PersonName, contact.Nameerror, "Name");
    errorvalidator(contact.Email, contact.emailerror, "Email");
    errorvalidator(contact.Comment, contact.commenterror, "Comment");

    return this;
  }

  SendValidation() {
    cy.get(contact.Send).should("be.disabled");
  }
}

export default ContactPageValidation;
