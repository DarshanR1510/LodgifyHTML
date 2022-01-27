/// <reference types="cypress"/>

const pricing = require("../Locators/pricing.json");

class PricingPage {
  Visit(url) {
    cy.visit(url);
  }

  // page title verification
  Title() {
    cy.title().should(
      "eq",
      "Lodgify Pricing | Affordable Vacation Rental Software From $11"
    );
  }

  // Verifing the cookie banner and accept the cookie
  Cookie() {
    const cookiebanner = cy.get(pricing.CookieBanner);
    cookiebanner.should("be.visible");
    return this;
  }

  // Verifying Login button link redirects /login page
  LoginBtn() {
    cy.get(pricing.LoginBtn)
      .should("have.attr", "href")
      .and("contain", "https://www.lodgify.com/login");
    return this;
  }

  // adding rental count
  RentalCount(rentalamount) {
    const name = cy.get(pricing.RentalCount);
    name.clear();
    name.type(rentalamount).type("{enter}");
    return this;
  }

  // Scroll bar movement validation
  Scroll(rentalamount) {
    const scrollnudge = cy.get(pricing.ScrollNudge);
    scrollnudge
      .invoke("attr", "aria-valuenow")
      .should("eq", String(rentalamount));
    return this;
  }

  // selecting yearly plan
  YearlyPlan() {
    cy.get(pricing.Yearly).click();
    return this;
  }

  // Yearly package price validation
  StarterPrice() {
    cy.get(pricing.StarterPrice)
      .find(pricing.ValueLocator)
      .should("have.text", 64);
    return this;
  }

  ProfessionalPrice() {
    cy.get(pricing.ProfessionalPrice)
      .find(pricing.ValueLocator)
      .should("have.text", 375);
    return this;
  }

  UltimatePrice() {
    cy.get(pricing.UltimatePrice)
      .find(pricing.ValueLocator)
      .should("have.text", 525);
    return this;
  }

  // Currency difference and price amount changes verification
  CurrencyChangeTest(currency) {
    // Capturing starter pack price in dollar
    cy.get(pricing.StarterPrice)
      .find(pricing.ValueLocator)
      .invoke("text")
      .then(parseInt)
      .as("starterdollar");

    // Changing the currency
    const currencychange = cy.get(pricing.CurrencyBox);
    currencychange.select(currency);

    // Capturing starter pack price in new currency
    cy.get(pricing.StarterPrice)
      .find(pricing.ValueLocator)
      .invoke("text")
      .then(parseInt)
      .as("starterEG");

    // Verifing that USD price should be greater than GBP or EUR price
    cy.get("@starterdollar").then((starterdollar) => {
      cy.get("@starterEG").then((starterEG) => {
        expect(starterdollar).to.be.greaterThan(starterEG);
      });
    });

    //Verifing the currency sign after change
    if (currency == "€ EUR") {
      const currencysign = cy.get(pricing.EuroSign).last();
      currencysign.should("have.text", currency[0]);
    } else {
      const currencysign = cy.get(pricing.PDSign).last();
      currencysign.should("have.text", currency[0]);
    }

    return this;
  }

  // Verifying the Get Started button redirects to signup page
  GetStartedBtn() {
    cy.get(pricing.GetStartedBtn)
      .should("have.attr", "href")
      .and("contain", "https://www.lodgify.com/signup");
    return this;
  }

  FAQ1() {
    cy.get(pricing.Q1).click();
    cy.get(pricing.A1).should(
      "have.text",
      "For a website with more than 100 rentals or a complete custom web design,\n                        please contact us. Get in touch\n                    "
    );
    return this;
  }
}

export default PricingPage;
