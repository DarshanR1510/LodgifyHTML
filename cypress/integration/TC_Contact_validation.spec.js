/// <reference types="cypress"/>

import ContactPageValidation from "./PageClasses/contactPage_validation";

const cp = new ContactPageValidation();

describe("Test Suite - Contact Page Validation", () => {
  it("Contact page fields validation", () => {
    cy.fixture("contactData").then((personData) => {
      cp.visit(personData.Url);
      cp.FieldValidation();
      cp.SendValidation();
    });
  });
});
