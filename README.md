# Budgetr App Backend

## Introduction

The **Budgetr App** was created using Express and React. This app was developed to help organize financial transactions in order to keep you on budget.

## Initial Setup

### Setting up the backend:

1. **Fork the Repo**: Create a copy of this project's repository in your GitHub account.
2. **Clone the Fork**: Download your forked repository to your computer.
3. **Navigate to Directory**: Use command line to `cd` into the project folder.
4. **Install Dependencies**: Run `npm install` to set up project dependencies.
5. **Start Development Server**: Use `npm run dev` to launch the development environment.

### Setting up the frontend:

1. **Fork the Repo**: Create a copy of the [Budgetr front end](https://github.com/BSoto85/project-budgeting-app-frontend) in your GitHub account.
2. **Clone the Fork**: Download your forked repository to your computer.
3. **Navigate to Directory**: Use command line to `cd` into the project folder.
4. **Install Dependencies**: Run `npm install` to set up project dependencies.
5. **Start Development Server**: Use `npm run dev` to launch the server.

## User Stories and Features

- As a user, I’d like to view all of my transactions in one place.
- As a user, I want to see my transactions in descending order by date.
- As a user, I'd like to click on a transaction to see more details.
- As a user, I want to add transactions.
- As a user, I want to be able to edit my transactions.
- As a user, I’d like to delete transactions.

## Functionality

- The `Home` page greets you with all of your transactions.
- Click on the `Add Transaction` button to go to a form where you can add the details for your transaction.
- Click `Add` to add your transaction or click the `Cancel` button to cancel adding a transaction. This will bring you back to the home page.
- Clicking the `Details` button on a transaction will show you the full details for that transaction.
- In the **Details** view, you can `Edit` or `Delete` the current transaction, or click `Home` to go back to the home page.
- Clicking `Budgetr` in the navbar on any view will bring you to the home page.

## Extras

- **Total** displays in the navbar on all views.
- Radio button used to choose between 'Deposit' and 'Withdrawal'
- If the transaction is a withdrawal, the amount number will be <span style="color:red">red
  </span>. If the transaction is a withdrawal, the amount number will be <span style="color:darkgreen">green
  </span>.
- When the total for all transactions in the navbar is less than 0, the total amount number will be <span style="color:red">red</span>, <span style="color:yellow">yellow
  </span> if between 0 and 100, and <span style="color:darkgreen">green
  </span> if over 100.
- Transactions are sorted in descending order by date.
- The date shows in a human-readable format.
- Grid in home view changes from 3 columns on wider views, to 2 columns, and then to 1 column for mobile views.
- A helper.js file was ued to hold helper functions.
