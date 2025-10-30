export default class expensesActions{


    clickOnAddExpensesButton(){
        cy.url().should('include','/claim/submitClaim/id/');
        cy.contains('button[type="button"]' ,' Add ').click();
        return this;
    }

    clickOnExpenseTypeDropDown(){
        cy.get('form').contains('div','Expense Type').parent()
          .find('i').click();
          return this;
    }
        selectExpenseType(expenseType){
         cy.get('form').contains('div[role="option"]',expenseType)
            .click();
        return this;
    }

    selectADate(date){
         cy.get('form').contains('div','Date').parent()
          .find('input').clear().type(date);
        
          return this;
    }

    typeInAmount(cost){
         cy.get('form').contains('div','Amount').parent()
          .find('input').clear().type(cost);
        return this;
    }

    typeInNote(note){
         cy.get('form').contains('div','Note').parent()
          .find('textarea').clear().type(note);
        return this;
    }
    clickOnSaveButton(){
        cy.contains('button[type="submit"]','Save').click();
        return this;
    }

}