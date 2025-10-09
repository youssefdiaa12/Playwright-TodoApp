Feature: User Add to Cart Functionality

Background: 
Given User navigates to the application

Scenario Outline: User should be able to add a book to the cart after logging in

    Given User click on the login link
   
    When User enter the username as "<username>"
   
    And User enter the password as "<password>"
   
    And User search for a "<book>"

    When User adds the book to the cart
     
    Then The Cart badge should be updated

     Examples:
       | username        | password  | book       |
       | ortoni11      | Pass1234 | Rommies     |
       | testuser2      | password2 | The Simple Wild |