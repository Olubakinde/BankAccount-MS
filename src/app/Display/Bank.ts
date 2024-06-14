class Account {
    private balance: number;
    private accountNumber: string;

    constructor(accountNumber: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Invalid deposit amount.");
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Invalid withdrawal amount or insufficient funds.");
        }
    }

    getBalance(): number {
        return this.balance;
    }

    getAccountNumber(): string {
        return this.accountNumber;
    }

    transfer(amount: number, toAccount: Account): boolean {
        if (amount > 0 && amount <= this.balance) {
            this.withdraw(amount);
            toAccount.deposit(amount);
            console.log(
                `Transferred ${amount} to account ${toAccount.getAccountNumber()}.`,
            );
            return true;
        } else {
            console.log("Invalid transfer amount or insufficient funds.");
            return false;
        }
    }

    toString(): string {
        return `Account(${this.accountNumber}, Balance: ${this.balance})`;
    }
}

export class Bank {
    private accounts: Account[];

    constructor() {
        this.accounts = [];
    }

    createAccount(accountNumber: string, initialBalance: number = 0): void {
        const existingAccount = this.findAccount(accountNumber);
        if (!existingAccount) {
            const newAccount = new Account(accountNumber, initialBalance);
            this.accounts.push(newAccount);
            console.log(`Account ${accountNumber} created.`);
        } else {
            console.log("Account already exists.");
        }
    }

    findAccount(accountNumber: string): Account | undefined {
        return this.accounts.find(
            (account) => account.getAccountNumber() === accountNumber,
        );
    }

    deposit(accountNumber: string, amount: number): void {
        const account = this.findAccount(accountNumber);
        if (account) {
            account.deposit(amount);
        } else {
            console.log("Account not found.");
        }
    }

    withdraw(accountNumber: string, amount: number): void {
        const account = this.findAccount(accountNumber);
        if (account) {
            account.withdraw(amount);
        } else {
            console.log("Account not found.");
        }
    }

    getBalance(accountNumber: string): number {
        const account = this.findAccount(accountNumber);
        if (account) {
            console.log(
                `Balance for account ${accountNumber}: ${account.getBalance()}`,
            );
            return account.getBalance();
        } else {
            console.log("Account not found.");
            return 0; // or throw an error or return null to indicate account not found
        }
    }

    getBalancee(accountNumber: string): number {
        return this.getBalance(accountNumber);
    }

    transfer(
        fromAccountNumber: string,
        toAccountNumber: string,
        amount: number,
    ): void {
        const fromAccount = this.findAccount(fromAccountNumber);
        const toAccount = this.findAccount(toAccountNumber);
        if (fromAccount && toAccount) {
            fromAccount.transfer(amount, toAccount);
        } else {
            console.log("One or both accounts not found.");
        }
    }

    getAccount() {
        return this.accounts;
    }
}

// Working test cases

const bank = new Bank();
bank.createAccount("1234567890", 1000);
bank.deposit("1234567890", 500);
bank.withdraw("1234567890", 200);
bank.getBalance("1234567890");

bank.createAccount("0987654321");
bank.deposit("0987654321", 2000);
bank.getBalance("0987654321");
bank.withdraw("0987654321", 3000); // This will trigger "Invalid withdrawal amount or insufficient funds."

bank.transfer("1234567890", "0987654321", 300);
bank.getBalance("1234567890");
bank.getBalance("0987654321");
