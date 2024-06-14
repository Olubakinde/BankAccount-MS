import {
    BindValue,
    Click,
    EzComponent,
    EzDialog,
    Input,
    ValueEvent,
} from "@gsilber/webez";
import html from "./Display.component.html";
import css from "./Display.component.css";
import { Bank } from "./Bank";

export class DisplayComponent extends EzComponent {
    private createe1: string = "";
    private name: string = "";
    private amountt: number = 0;
    private bank: Bank;
    private depositnum: string = "";
    private depositam: number = 0;
    private withdrawnum: string = "";
    private withdrawam: number = 0;
    private checkbal: string = "";
    private transfrom: string = "";
    private transto: string = "";
    private amounttransfer: number = 0;

    @BindValue("display")
    private displayy: string = "";
    @BindValue("display")
    private valuee: string = "";
    @BindValue("transfer-dis")
    private transferr: string = "";
    @BindValue("display-dep")
    private depositt: string = "";
    @BindValue("display-with")
    private widthh: string = "";
    @BindValue("balance-result")
    private balres: string = "";

    constructor() {
        super(html, css);
        this.bank = new Bank();
    }

    @Input("create-account-number")
    create1(e: ValueEvent) {
        this.createe1 = e.value;
    }

    @Input("create-account-holder")
    namee(e: ValueEvent) {
        this.name = e.value;
    }

    @Input("create-account-balance")
    amount(e: ValueEvent) {
        this.amountt = Number(e.value);
    }

    @Click("submitt")
    creataccount() {
        if (this.createe1.length <= 9 || this.createe1.length > 10) {
            EzDialog.popup(
                this,
                `Account number must be exactly 10 digits`,
                "Account Info",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        if (this.bank.findAccount(this.createe1)) {
            EzDialog.popup(
                this,
                `Account ${this.createe1} exists`,
                "Successful",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (this.createe1 && this.name && this.amountt) {
            this.bank.createAccount(this.createe1, this.amountt);
            this.displayy = `Hi ${this.name}, Your Account ${this.createe1} was succesfully created`;
        } else {
            EzDialog.popup(
                this,
                `Your account was not successfully created`,
                "Empty Fields",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
    }

    @Input("deposit-account-number")
    deposit1(e: ValueEvent) {
        this.depositnum = e.value.toString();
    }

    @Input("deposit-amount")
    deposit2(e: ValueEvent) {
        this.depositam = Number(e.value);
    }

    getAccountbalance(accountNumber: string): number {
        const account = this.bank.findAccount(accountNumber);
        if (account) {
            return account.getBalance();
        }
        return 0; // or throw an error or return null to indicate account not found
    }

    @Click("depositt")
    deposit() {
        if (this.depositnum.length <= 9 || this.depositnum.length > 10) {
            EzDialog.popup(
                this,
                `Account number must be exactly 10 digits`,
                "Account Info",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        if (this.depositam <= 0) {
            EzDialog.popup(
                this,
                `Invalid deposit amount`,
                "Unsuccessful",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (!this.depositnum || !this.depositam) {
            EzDialog.popup(
                this,
                `Unsuccessful`,
                "Empty Fields",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (this.bank.findAccount(this.depositnum)) {
            this.bank.deposit(this.depositnum, this.depositam);
            this.depositt = `Deposited ${this.depositam}. New balance: ${this.getAccountbalance(this.depositnum)}`;
        } else {
            EzDialog.popup(
                this,
                `Account does not exist`,
                "Error Occurred",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
    }

    @Input("withdraw-account-number")
    input1(e: ValueEvent) {
        this.withdrawnum = e.value.toString();
    }

    @Input("withdraw-amount")
    input2(e: ValueEvent) {
        this.withdrawam = Number(e.value);
    }

    @Click("withdraww")
    withdraw() {
        if (this.withdrawnum.length <= 9 || this.withdrawnum.length > 10) {
            EzDialog.popup(
                this,
                `Account number must be exactly 10 digits`,
                "Account Info",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        if (!this.withdrawnum || !this.withdrawam) {
            EzDialog.popup(
                this,
                `Unsuccessful`,
                "Empty Fields",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        if (this.withdrawam <= 0) {
            EzDialog.popup(
                this,
                `Invalid withdrawal amount`,
                "Error Occurred",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }

        const account = this.bank.findAccount(this.withdrawnum);
        if (account) {
            if (this.withdrawam > account.getBalance()) {
                EzDialog.popup(
                    this,
                    `Insufficient funds`,
                    "Error Occurred",
                    ["Ok"],
                    "btn btn-primary",
                );
                return;
            }
            this.bank.withdraw(this.withdrawnum, this.withdrawam);
            this.widthh = `Withdrawn ${this.withdrawam}. New balance: ${this.getAccountbalance(this.withdrawnum)}`;
        } else {
            EzDialog.popup(
                this,
                `Account does not exist`,
                "Error Occurred",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
    }

    @Input("balance-account-number")
    input(e: ValueEvent) {
        return (this.checkbal = e.value);
    }

    @Click("Check")
    checkbaal() {
        if (this.checkbal.length <= 9 || this.checkbal.length > 10) {
            EzDialog.popup(
                this,
                `Account number must be exactly 10 digits`,
                "Account Info",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (!this.checkbal) {
            EzDialog.popup(
                this,
                `Empty Field`,
                "Error Occured",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (!this.bank.findAccount(this.checkbal)) {
            EzDialog.popup(
                this,
                `Account ${this.checkbal} does not exist`,
                "Error Occured",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        } else {
            this.balres = `Balance for account ${this.checkbal}: ${this.getAccountbalance(this.checkbal)}`;
        }
    }

    @Input("transfer-from-account-number")
    from(e: ValueEvent) {
        this.transfrom = e.value;
    }

    @Input("transfer-to-account-number")
    to(e: ValueEvent) {
        this.transto = e.value;
    }

    @Input("transfer-amount")
    amounttrans(e: ValueEvent) {
        this.amounttransfer = Number(e.value);
    }

    @Click("transfer")
    transfer() {
        const account = this.bank.findAccount(this.transfrom);
        if (account) {
            if (this.amounttransfer > account.getBalance()) {
                EzDialog.popup(
                    this,
                    `Insifficient fund or Invalid amount`,
                    "Error Occured",
                    ["Ok"],
                    "btn btn-primary",
                );
                return;
            }
        }
        if (this.amounttransfer < 0) {
            EzDialog.popup(
                this,
                `Insifficient fund or Invalid amount`,
                "Error Occured",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (!this.transfrom || !this.transto || !this.amounttransfer) {
            EzDialog.popup(
                this,
                `One or more Empty field`,
                "Error Occured",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
        if (
            !this.bank.findAccount(this.transfrom) ||
            !this.bank.findAccount(this.transto)
        ) {
            EzDialog.popup(
                this,
                `One or both accounts not found.`,
                "Error Occured",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        } else {
            this.bank.transfer(
                this.transfrom,
                this.transto,
                this.amounttransfer,
            );
            this.transferr = `You successfully transfered ${this.amounttransfer} to ${this.transto}`;
        }
    }
}
