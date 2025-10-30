import employeeApi from "./utils/api/pim/employee/employeeApi.cy";
import { employeeFactory } from "./utils/factories/pim/employee/employeeFactory.cy";

class dataUtiles{

    addEmployee(data={},length=1){
        const arr=[];
        for(let i=1;i<=length ;i++){
             employeeApi.addEmployee(
                                employeeFactory.createEmployee(data))
                     .then((response)=>{
             arr.push( response.body.data);
        })    
                
        }
         return cy.wrap(arr);


    }

    
}
export default dataUtiles;