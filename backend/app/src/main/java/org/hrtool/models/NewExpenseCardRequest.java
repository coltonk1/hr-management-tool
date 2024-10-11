package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NewExpenseCardRequest {
    @NotBlank(message = "Card number is required")
    private String expense_card_number;
    @NotBlank(message = "Expiration date is required")
    private String expense_card_expiration_date;
    @NotNull(message="Security pin is required")
    private int expense_card_security_code;
    @NotBlank(message="Issuance date is required")
    private String issuance_date;
    @NotBlank(message="Status is required")
    private String status;
    @NotNull(message="Spending limit is required")
    private int expense_card_limit;
    @NotNull(message="Employee Id is required")
    private int employee_id;
    

    public NewExpenseCardRequest(String expense_card_number, String expense_card_expiration_date, int expense_card_security_code, String issuance_date, String status, int expense_card_limit, int employee_id) {

        setCardNumber(expense_card_number);
        setExpirationDate(expense_card_expiration_date);
        setSecurityCode(expense_card_security_code);
        setIssuanceDate(issuance_date);
        setStatus(status);
        setSpendingLimit(expense_card_limit);
        setEmployeeId(employee_id);

    }

    public void setCardNumber(String expense_card_number){
        this.expense_card_number = expense_card_number;
    }
    public String getCardNumber(){
        return expense_card_number;
    }

    public void setExpirationDate(String expense_card_expiration_date){
        this.expense_card_expiration_date = expense_card_expiration_date;
    }
    public String getExpirationDate(){
        return expense_card_expiration_date;
    }

    public void setSecurityCode(int expense_card_security_code){
        this.expense_card_security_code = expense_card_security_code;
    }
    public int getSecurityCode(){
        return expense_card_security_code;
    }

    public void setIssuanceDate(String issuance_date){
        this.issuance_date = issuance_date;
    }
    public String getIssuanceDate(){
        return issuance_date;
    }
    
    public void setStatus(String status){
        this.status = status;
    }
    public String getStatus(){
        return status;
    }

    public void setSpendingLimit(int expense_card_limit){
        this.expense_card_limit = expense_card_limit;
    }
    public int getSpendingLimit(){
        return expense_card_limit;
    }

    public void setEmployeeId(int employee_id){
        this.employee_id = employee_id;
    }
    public int getEmployeeId(){
        return employee_id;
    }
    
}