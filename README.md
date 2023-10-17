# README

To start Frontend server (client) -
```
npm run dev
```
To start Backend server
```
rails s -p 3009
```

# Using Ngrok

Since a synchronization between Auth0's database and this project's is necesary to create a pantry automatically post registration, I have decided to implement Auth0's post registration flow. Since localhost is not accepted, Ngrok library is used get a domain. Since the free plan provides a random domain each time I start the server, which by the way is started with

```
ngrok http 3009
```

it is necessary to change the domain each time the server is served at config/environments/development.rb under config.hosts and under Auth0's Actions/Library/Sync with pantry-state rails

# 

Difference between Item and Pantry Item is that the latter is an Item that has been added to de pantry and therefore has special attributes (quantity, exp_date).
<!-- This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ... -->
