describe("Pizza Order Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  const getTextBox = () => {
    return cy.get("#special-instructions");
  };

  const getOrderLink = () => {
    return cy.get('[href="/pizza"]');
  };

  const getPepperoni = () => {
    return cy.get("#pepperoni-input");
  };

  const getCheese = () => {
    return cy.get("#cheese-input");
  };

  const getPineapple = () => {
    return cy.get("#pineapple-input");
  };

  const getOnions = () => {
    return cy.get("#onions-input");
  };

  const getSubmit = () => {
    return cy.get("#submit-button");
  };

  it("can type in input box", () => {
    getOrderLink().click();
    getTextBox()
      .should("have.value", "")
      .type("testing 1 2 3")
      .should("have.value", "testing 1 2 3")
      .clear();
  });

  it("can select multiple toppings", () => {
    getOrderLink().click();
    getPepperoni().should("not.be.checked").check().should("be.checked");
    getCheese().should("not.be.checked").check().should("be.checked");
    getPineapple().should("not.be.checked").check().should("be.checked");
    getOnions().should("not.be.checked").check().should("be.checked");
  });

  it("can submit form", () => {
    getOrderLink().click();
    getSubmit().should("be.disabled");
    cy.get("#name-input").type("test");
    getSubmit().should("be.disabled");
    cy.get("select").select("Small");
    getSubmit().should("be.disabled");
    cy.get("#bbq-select").click();
    getSubmit().should("not.be.disabled");
    getPineapple().check();
    getSubmit().should("not.be.disabled");
    cy.get("#special-instructions").type("none");
    getSubmit().should("not.be.disabled").click();
    getSubmit().should("be.disabled");
  });
});
