# Shiv Yoga Studio
Built with the MySQL, Express, React and NodeJS.

## Introduction
This is a small project build for the registration process of the customers who are interested in joining the YOGA CLASSES.
The users can simply register by submitting their basic details such as :-

* Mobile Number
* Full Name
* Date of Birth
* Email (optional)

They can also select the suitable batch from the available four batches, namely :-

1) Morning 1 - ( 06:00 AM to 07:00 AM )
2) Morning 2 - ( 07:00 AM to 08:00 AM )
3) Morning 3 - ( 08:00 AM to 09:00 AM )
4) Evening 1 - ( 05:00 PM to 06:00 PM )

The payment of ₹500 -/ per month has to be done and customers can select their batch every month.

## Work-Flow
 * When user enters mobile number the server checks whether the mobile number exists or not
 * If the user doesn’t exists, then the information is stored in the database
 * If the user exists, it checks whether the month in which the last payment was done and the current month is same or different
 * If monthStatus is the same then selected batch and "Payment Already Done!" message is displayed
 * If the month is different then the user can make payment for the current month and could also change batch for the upcoming sessions

## Technologies Used
This project was created using the following technologies :-

### Server
* Express
* Sequelize
* mysql2

### Database
* MySQL (hosted on railway)

## Setup

### Installation Command
`
npm install
`

### Start Command
`
npm run start
`

## Databse Design
This project consists of two Tables :-

### (1) Customers
This table is designed to store the basic details of the user. It consists of the following attributes :-
* Id ( primary key )
* fullName,
* monbileNo,
* DOB,
* email,
* batch and
* default timestamps

### (2) Payment
It stores the details of the amount paid, month in which the amount was paid, customerDetailId ( foriegn key ) , id (primary key) and the default timestamps.

## ER Diagram
Understanding Database Design in a graphical manner. The following ER-Diagram explains the relations between the tables and attributes.
![ER-Diagram_YogaTask](https://user-images.githubusercontent.com/60360732/207057631-98bec030-2dcb-4bad-89a9-a1035df130c1.jpg)

