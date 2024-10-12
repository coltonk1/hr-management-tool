package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class NewExpenseRequest {
    @NotBlank(message = "Expense name must not be blank")
    private String expense_name;
    @NotBlank(message = "Date is required and must not be blank")
    private String expense_date;
    @NotBlank(message = "Category is required and must not be blank")
    private String expense_category;
    @NotNull(message = "Amount is required and must not be blank")
    private double expense_amount;
    @NotBlank(message = "Description is required and must not be blank")
    private String expense_description;
    @NotNull(message = "employee id is required and must not be blank")
    private int employee_id;
    @NotBlank(message = "Expense card id is required and must not be blank")
    private String expense_card_id;

    public NewExpenseRequest(String expense_name, String expense_date, String expense_category, double expense_amount,String expense_description, int employee_id, String expense_card_id) {
        setName(expense_name);
        setDate(expense_date);
        setCategory(expense_category);
        setAmount(expense_amount);
        setDescription(expense_description);
        setEmployeeId(employee_id);
        setExpenseCardId(expense_card_id);
    }

    public void setName(String name){
        this.expense_name = name;
    }
    public String getName(){
        return this.expense_name;
    }

    public void setDate(String date){
        this.expense_date = date;
    }
    public String getDate(){
        return this.expense_date;
    }

    public void setCategory(String category){
        this.expense_category = category;
    }
    public String getCategory(){
        return this.expense_category;
    }

    public void setDescription(String description){
        this.expense_description = description;
    }
    public String getDescription(){
        return this.expense_description;
    }

    public void setAmount(double amount){
        this.expense_amount = amount;
    }
    public double getAmount(){
        return this.expense_amount;
    }

    public void setEmployeeId(int employee_id){
        this.employee_id = employee_id;
    }
    public int getEmployeeId(){
        return this.employee_id;
    }

    public void setExpenseCardId(String expense_card_id){
        this.expense_card_id = expense_card_id;
    }
    public String getExpenseCardId(){
        return this.expense_card_id;
    }

    
}