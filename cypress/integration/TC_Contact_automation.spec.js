/// <reference types="cypress"/>

import ContactPage from "./PageClasses/contactPage_automation";

const cp = new ContactPage();

describe("Test Suite - Contact Page Automation", () => {
  it("Contact page automating form fill-up", () => {
    cy.fixture("contactData").then((personData) => {
      cp.visit(personData.Url);
      cp.Title();
      cp.Name(personData.PersonName);
      cp.Phone(personData.PhoneNumber, personData.SelectedCountry);
      cp.Email(personData.Email);
      cp.Guests(personData.Guests);
      cp.DatePicker(
        personData.StartMonth,
        personData.StartDate,
        personData.EndMonth,
        personData.EndDate
      );
      cp.Comment(personData.Comment);
      cp.Submit();
      cp.SendError();
    });
  });
});
