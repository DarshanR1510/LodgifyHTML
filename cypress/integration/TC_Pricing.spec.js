/// <reference types="cypress"/>

import PricingPage from "./PageClasses/pricingPage";

const pp = new PricingPage();

describe("Test Suite - Pricing Page Validation", () => {
  it("Page visit and title verification", () => {
    cy.fixture("pricingData").then((pricingData) => {
      pp.Visit(pricingData.url);
      pp.Title();
      pp.Cookie();
      pp.LoginBtn();
      pp.GetStartedBtn();
    });
  });

  it("Rental and plan lenght selection, Scroll bar validation", () => {
    cy.fixture("pricingData").then((pricingData) => {
      pp.RentalCount(pricingData.rentalcount);
      pp.Scroll(pricingData.rentalcount);
      pp.YearlyPlan();
    });
  });

  it("Starter pack validation", () => {
    pp.StarterPrice();
  });

  it("Professional pack validation", () => {
    pp.ProfessionalPrice();
  });

  it("Ultimate pack validation", () => {
    pp.UltimatePrice();
  });

  it("Currency changes verification", () => {
    cy.fixture("pricingData").then((pricingData) => {
      pp.CurrencyChangeTest(pricingData.Euro); // Use 'Pound' for GBP selection and verification
    });
  });

  it("FAQ click working verification", () => {
    pp.FAQ1();
  });
});
