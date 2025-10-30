/// <reference types ="cypress" />

import claimActions from "../../pageObjects/claims/submitClaim/Actions.cy";
import dataUtiles from "../../support/dataUtiles.cy";
import { employeeFactory } from "../../support/utils/factories/pim/employee/employeeFactory.cy";
import events from "./../../fixtures/events.json";
import currencies from "./../../fixtures/currency.json";
import expensesActions from "../../pageObjects/claims/addExpenses/Actions.cy";
import expenses from "./../../fixtures/expenses.json";
import employeeClaimsActions from "../../pageObjects/claims/employeeClaims/Actions.cy";
import actions from "../../fixtures/claimActions.json";
import sharedAssertions from "../../pageObjects/shared/Assertions.cy";
import submitClaimAssertions from "../../pageObjects/claims/submitClaim/Assertions.cy";

const datautiles = new dataUtiles();
const claimAction = new claimActions();
const expenseAction = new expensesActions();
const employeeClaimAction = new employeeClaimsActions();
const sharedAssertion = new sharedAssertions();
const cliamAssertion = new submitClaimAssertions();

describe("Check Submit Claim Functionality", () => {
  let employee;
  let user;
  let totalAmount;
  before(() => {
    cy.loginToOrangeHRM("Admin", "admin123");

    datautiles.addEmployee().then((emp) => {
      employee = emp;

      user = employeeFactory.addLoginDetails({
        empNumber: employee[0].empNumber,
      });

      datautiles.addLoginDetails(user);
      cy.logout();
    });
  });

  beforeEach(() => {
    cy.loginToOrangeHRM(`${user.username}`, `${user.password}`);
    totalAmount =0;
  });

  events.events.forEach((event, index) => {
    console.log("event = ", event);
    const rendomIndexOfCurrency = Math.floor(Math.random() * currencies.length);
    const randomCurrency = currencies[rendomIndexOfCurrency];
    const randomActionIndex = Math.floor(Math.random() * actions.length);
    const randomAction = actions[randomActionIndex];
    const selectedExpenses = [];
    let expenseText = [];
    const numberOfExpenses=3;
    for (let i = 0; i < numberOfExpenses; i++) {
      const randomExpenseIndex = Math.floor(Math.random() * expenses.length);
      const expense = expenses[randomExpenseIndex];
      selectedExpenses.push(expense);
      expenseText.push(expense.expenseType);
    }
    expenseText = expenseText.join(", ");

    it(`Validate that the Admin can ${randomAction.action} the employee's claim request for Event : ${event} using ${randomCurrency} Currency with expenses: ${expenseText}`, () => {
      claimAction
        .clickOnClaimLinkInMenue()
        .clickOnSubmitClaimLinkInNavbar()
        .selectAnEvent(event)
        .selectACurrency(randomCurrency)
        .clickOnCreateButton();



      claimAction
        .getReferenceValue()
        .should("not.be.empty")
        .then((id) => {

          console.log("claimId : ", id);

          cy.then(() => {
            
            selectedExpenses.forEach((randomExpense) => {
              
              totalAmount +=randomExpense.amount;
              expenseAction
                .clickOnAddExpensesButton()
                .clickOnExpenseTypeDropDown()
                .selectExpenseType(randomExpense.expenseType)
                .selectADate(randomExpense.date)
                .typeInAmount(randomExpense.amount)
                .typeInNote(randomExpense.note)
                .clickOnSaveButton();

              sharedAssertion
               .checkIfSuccessAlertIsApeare();
            });
            claimAction.clickOnSubmitButton();

            sharedAssertion
               .checkIfSuccessAlertIsApeare();


            cliamAssertion.hiddenSubmitButton()
            .confirmThatTheStatusIsSubmitted()
            .assertCurrencyIsCorrect(randomCurrency)
            .assertTotalAmount(totalAmount);

            cy.logout();
            cy.loginToOrangeHRM("Admin", "admin123");
            claimAction.clickOnClaimLinkInMenue();

            employeeClaimAction
              .searchInReferanceId(id)
              .clickOnSearchButton()
              .clickOnViewDetails();

              cliamAssertion.confirmThatTheStatusIsSubmitted();

              employeeClaimAction.clickOnAction(randomAction.action)
              .hiddenAction()
              .viewStatus(randomAction.Status);
          });
        });
    });
  });

    after(() => {
      cy.logout();
      cy.loginToOrangeHRM("Admin", "admin123");

      console.log('employee emp :', employee);
      datautiles.deleteEmployees([employee[0].empNumber]);


  });

  
});
