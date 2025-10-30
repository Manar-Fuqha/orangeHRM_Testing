export default class sharedAssertions{

    checkIfSuccessAlertIsApeare(){
        cy.get('.oxd-toast-content--success')
            .should('be.visible') 
            .and('contain.text', 'Successfully Saved')
            .and('contain.text', 'Success');

        return this;
    }
}