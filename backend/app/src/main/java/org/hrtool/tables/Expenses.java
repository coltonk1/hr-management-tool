package org.hrtool.tables;

import org.checkerframework.checker.units.qual.s;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expenses")
public class Expenses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String expense_name;
    private String expense_date;
    private String expense_category;
    private String expense_description;
    private double expense_amount;
    private int employee_id;
    private String expense_card_id;


    public Expenses(String name, String date, String category, double amount, String description, int employee_id, String expense_card_id) {
        setName(name);
        setDate(date);
        setCategory(category);
        setDescription(description);
        setEmployeeId(employee_id);
        setExpenseCardId(expense_card_id);
    }

    public Expenses(){}

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

    public void setAmount(double amount){
        this.expense_amount = amount;
    }
    public double getAmount(){
        return expense_amount;
    }

    public void setDescription(String description){
        this.expense_description = description;
    }
    public String getDescription(){
        return this.expense_description;
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
