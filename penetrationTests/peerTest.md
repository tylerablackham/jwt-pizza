# Penetration Testing Report

## Peer Names
- Tyler Blackham
- Thomas Utrilla

## Self Attack

### Tyler Blackham
| Attack #1      | Successful                                                                                     |
|----------------|------------------------------------------------------------------------------------------------|
| Date           | December 4, 2025                                                                               |
| Target         | pizza-service.tab518.click                                                                     |
| Classification | Broken Access Control                                                                          |
| Severity       | 2                                                                                              |
| Description    | Authentication check succeeds when no password is submitted.                                   |
| Images         | ![No Password Given](no-password-given.png) <br/> Logged in as admin without using a password. |
| Corrections    | Fail authentication check if password is null/empty.                                           |

| Attack #2      | Successful                                                                                                                                                                                                                         |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date           | December 4, 2025                                                                                                                                                                                                                   |
| Target         | pizza-service.tab518.click                                                                                                                                                                                                         |
| Classification | Identification and Authentication Failures                                                                                                                                                                                         |
| Severity       | 2                                                                                                                                                                                                                                  |
| Description    | Admin, Diner, and Franchisee have weak passwords.                                                                                                                                                                                  |
| Images         | ![Weak Admin Password](weak-admin-password.png) <br/> ![Weak Diner Password](weak-diner-password.png) <br/> ![Weak Franchisee Password](weak-franchisee-password.png) <br/>  These accounts have weak and easy to guess passwords. |
| Corrections    | Change passwords to be more secure.                                                                                                                                                                                                |

| Attack #3      | Successful                                                                                                                                              |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| Date           | December 4, 2025                                                                                                                                        |
| Target         | pizza-service.tab518.click                                                                                                                              |
| Classification | Insecure Design                                                                                                                                         |
| Severity       | 3                                                                                                                                                       |
| Description    | I can edit a purchase request to change the price of the pizza.                                                                                         |
| Images         | ![Original Price](original-price.png) <br/> ![Altered Price](altered-price.png) <br/> I was able to decrease the amount I pay for a pizza significantly |
| Corrections    | Refactor Order router to check the database for the actual price                                                                                        |

### Thomas Utrilla

## Peer Attack

### Tyler Blackham (attacking Thomas Utrilla)

| Attack #1      | Unsuccessful                                                                                            |
|----------------|---------------------------------------------------------------------------------------------------------|
| Date           | December 6, 2025                                                                                        |
| Target         | pizza-service.pizza-store.click                                                                         |
| Classification | Identification and Authentication Failures                                                              |
| Severity       | 0                                                                                                       |
| Description    | Admin account might have weak passwords.                                                                |
| Images         | ![Weak Password Attack](weak-password-attack.png) <br/> The admin account does not have weak passwords. |
| Corrections    | Change passwords to be more secure.                                                                     |


| Attack #2      | Successful                                                                                       |
|----------------|--------------------------------------------------------------------------------------------------|
| Date           | December 6, 2025                                                                                 |
| Target         | pizza-service.pizza-store.click                                                                  |
| Classification | Broken Access Control                                                                            |
| Severity       | 2                                                                                                |
| Description    | Authentication check succeeds when no password is submitted.                                     |
| Images         | ![No Password Attack](no-password-attack.png) <br/> Logged in as admin without using a password. |
| Corrections    | Fail authentication check if password is null/empty.                                             |

| Attack #3      | Successful                                                                                                          |
|----------------|---------------------------------------------------------------------------------------------------------------------|
| Date           | December 6, 2025                                                                                                    |
| Target         | pizza-service.pizza-store.click                                                                                     |
| Classification | Insecure Design                                                                                                     |
| Severity       | 3                                                                                                                   |
| Description    | I can edit a purchase request to change the price of the pizza.                                                     |
| Images         | ![Edit Price Attack](edit-price-attack.png) <br/> I was able to decrease the amount I pay for a pizza significantly |
| Corrections    | Refactor Order router to check the database for the actual price                                                    |

| Attack #4      | Successful                                                                                                                                  |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| Date           | December 6, 2025                                                                                                                            |
| Target         | pizza-service.pizza-store.click                                                                                                             |
| Classification | Broken Access Control                                                                                                                       |
| Severity       | 2                                                                                                                                           |
| Description    | I can edit a edit user request to change the get a admin user token.                                                                        |
| Images         | ![Edit User Attack](edit-user-attack.png) <br/> I was able to change the email on the request to a@jwt.com and get an admin user auth token |
| Corrections    | Refactor edit user route to make sure the user email isn't already being used before doing anything.                                        |

### Thomas Utrilla (attacking Tyler Blackham)

## Combined Learning