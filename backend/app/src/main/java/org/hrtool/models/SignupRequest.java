package org.hrtool.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SignupRequest {
    @NotBlank(message = "Username or email is required and must not be blank")
    private String username;
    @NotBlank(message = "Password is required and must not be blank")
    private String password;
    @NotBlank(message = "First name is required and must not be blank")
    private String first_name;
    @NotBlank(message = "Last name is required and must not be blank")
    private String last_name;
    @NotBlank(message = "SSN is required and must not be blank")
    private String ssn;
    @NotBlank(message = "Phone number is required")
    private String phone_number;
    @NotBlank(message = "Personal email is required")
    private String personal_email;
    @NotBlank(message = "Street address is required")
    private String street_address;
    @NotBlank(message = "City address is required")
    private String city_address;
    @NotBlank(message = "State address is required")
    private String state_address;
    @NotBlank(message = "Postal code address is required")
    private String postal_code_address;
    @NotBlank(message = "Birthday is required")
    private String birthday;
    @NotBlank(message = "Status is required")
    private String status;
    @NotBlank(message = "Hiring date is required")
    private String hiring_date;
    @NotNull(message = "Position Id is required")
    private int position_id;
    @NotNull(message = "Salary is required")
    private double salary;

    public SignupRequest(String username, String password, String first_name, String last_name, String ssn, String phone_number, String personal_email, String street_address, String city_address, String state_address, String postal_code_address, String birthday, String status, String hiring_date, int position_id, double salary){
        setUsername(username);
        setPassword(password);
        setFirstName(first_name);
        setLastName(last_name);
        setSSN(ssn);
        setPhoneNumber(phone_number);
        setPersonalEmail(personal_email);
        setStreetAddress(street_address);
        setCityAddress(city_address);
        setStateAddress(state_address);
        setPostalCodeAddress(postal_code_address);
        setBirthday(birthday);
        setStatus(status);
        setHiringDate(hiring_date);
        setPositionId(position_id);
        setSalary(salary);
    }



    // Getters and Setters
    public void setPhoneNumber(String phone_number){
        this.phone_number = phone_number;
    }
    public String getPhoneNumber(){
        return phone_number;
    }

    public void setPersonalEmail(String personal_email){
        this.personal_email = personal_email;
    }
    public String getPersonalEmail(){
        return personal_email;
    }

    public void setStreetAddress(String street_address){
        this.street_address = street_address;
    }
    public String getStreetAddress(){
        return street_address;
    }

    public void setCityAddress(String city_address){
        this.city_address = city_address;
    }
    public String getCityAddress(){
        return city_address;
    }

    public void setStateAddress(String state_address){
        this.state_address = state_address;
    }
    public String getStateAddress(){
        return state_address;
    }

    public void setPostalCodeAddress(String postal_code_address){
        this.postal_code_address = postal_code_address;
    }
    public String getPostalCodeAddress(){
        return postal_code_address;
    }

    public void setBirthday(String birthday){
        this.birthday = birthday;
    }
    public String getBirthday(){
        return birthday;
    }

    public void setStatus(String status){
        this.status = status;
    }
    public String getStatus(){
        return status;
    }

    public void setHiringDate(String hiring_date){
        this.hiring_date = hiring_date;
    }
    public String getHiringDate(){
        return hiring_date;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
    public void setFirstName(String first_name){
        this.first_name = first_name;
    }
    public void setLastName(String last_name){
        this.last_name = last_name;
    }
    public void setSSN(String ssn){
        this.ssn = ssn;
    }
    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
    
    public String getFirstName(){
        return first_name;
    }
    public String getLastName(){
        return last_name;
    }
    public String getSSN(){
        return ssn;
    }

    public void setPositionId(int position_id){
        this.position_id = position_id;
    }
    public int getPositionId(){
        return position_id;
    }

    public void setSalary(double salary){
        this.salary = salary;
    }
    public double getSalary(){
        return salary;
    }

}