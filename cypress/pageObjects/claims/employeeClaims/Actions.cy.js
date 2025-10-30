

export default class employeeClaimsActions{

    clickOnEmployeeClaimsLinkInNavbar(){
        cy.contains('a','Employee Claims').click();
        return this;
    }

    searchInReferanceId(id){
        cy.contains('div','Reference Id').parent()
          .find('input').clear().type(id);
        return this;
    }

    clickOnSearchButton(){
        cy.contains('button[type="submit"]','Search').click();
        return this;
    }

    clickOnViewDetails(){
        cy.contains('button[type="button"]',' View Details ').click();
        return this;
    }
    clickOnAction(name){
        cy.contains('button[type="button"]',name)
          .should('be.visible')
          .click();
        return this;
    }
    hiddenAction(){
        cy.contains('button[type="button"]','Back')
          .parent().find('button')
          .should('have.length','1');
        return this;
    }
    viewStatus(value){
    cy.contains('div','Status')
      .should('be.visible')
      .parent()
      .find('div').last()
      .find('input')                  
      .should('not.have.value','')    
      .invoke('val')
      .then((response) => {
          expect(response).to.equal(value); 
      });
    return this;
}


}