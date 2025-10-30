export default class claimActions{


    clickOnClaimLinkInMenue(){
        cy.contains('span','Claim').click();
        return this;
    }

    clickOnSubmitClaimLinkInNavbar(){
        cy.contains('a','Submit Claim').click();
        return this;
    }

    selectAnEvent(eventName){
        cy.contains('div','Event').parent()
          .find('i').click();

        cy.contains('span',eventName).click();
        return this;
    }

    selectACurrency(currency){
        cy.contains('div','Currency').parent()
          .find('i').click();

        cy.contains('span',currency).click();
        return this;
    }

    clickOnCreateButton(){
        cy.contains('button[type="submit"]','Create').click();
        cy.url().should('include','/claim/submitClaim/id/');
        return this;  
    }

    clickOnSubmitButton(){
        cy.contains('button[type="button"]','Submit').click();
        return this;
    }
     getReferenceValue(){
        
    return cy.contains('div','Reference Id')
    .should('be.visible').parent().find('input')
    .should('not.have.value','')
    .invoke('val')
    .then((value) => {
        return value;
    });
}
}