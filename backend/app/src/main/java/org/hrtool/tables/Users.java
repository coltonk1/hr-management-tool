package org.hrtool.tables;

import org.checkerframework.checker.units.qual.s;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String first_name;
    private String last_name;
    private String phone_number;
    private String ssn;
    private String personal_email;
    private String street_address;
    private String city_address;
    private String state_address;
    private String postal_code_address;
    private Timestamp birthday;
    private String username;
    private String password;
    private String status;
    private Timestamp hiring_date;
    private int position_id;
    private double salary;
    
    
    

    public Users(String first_name, String last_name, String phone_number, String ssn, String personal_email, String street_address, String city_address, String state_address, String postal_code_address, Timestamp birthday, String username, String password, String status, Timestamp hiring_date, int position_id, double salary) {
        setFirstName(first_name);
        setLastName(last_name);
        setPhoneNumber(phone_number);
        setSSN(ssn);
        setPersonalEmail(personal_email);
        setStreetAddress(street_address);
        setCityAddress(city_address);
        setStateAddress(state_address);
        setPostalCodeAddress(postal_code_address);
        setBirthday(birthday);
        setUsername(username);
        setPassword(password);
        setStatus(status);
        setHiringDate(hiring_date);
        setPositionId(position_id);
        setSalary(salary);
    }
    
    
    public Users(){}

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

    public void setBirthday(Timestamp birthday){
        this.birthday = birthday;
    }
    public Timestamp getBirthday(){
        return birthday;
    }

    public void setStatus(String status){
        this.status = status;
    }
    public String getStatus(){
        return status;
    }

    public void setHiringDate(Timestamp hiring_date){
        this.hiring_date = hiring_date;
    }
    public Timestamp getHiringDate(){
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
