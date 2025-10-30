

export default class submitClaimAssertions{

    confirmThatTheStatusIsSubmitted(){
        cy.get('.oxd-table-loader', { timeout: 10000 }).should('not.exist');
         cy.contains('div','Status').should('be.visible').parent()
        .find('input').should('not.have.value','')
        .invoke('val')
        .then((value)=>{
            expect(value).to.eq('Submitted')
        });
        return this;
    }
    hiddenSubmitButton(){
        cy.contains('button[type="button"]','Back')
          .parent().find('button')
          .should('have.length','2');
        return this;
    }

    assertCurrencyIsCorrect(currency){
        cy.contains('div','Currency').should('be.visible').parent()
          .find('input')
          .should('not.have.value','')
          .invoke('val')
          .then((value)=>{
            expect(value).to.eq(currency)
          });
        
        cy.get('div[role="row"]').find('div').contains('Amount')
          .should('have.text',`Amount (${currency})`);
        
        cy.contains('p','Total Amount')
           .should('contain.text',currency);
        return this;
    }

    assertTotalAmount(total){
      cy.contains('p','Total Amount')
           .should('contain.text',total);
        return this;
    }

}