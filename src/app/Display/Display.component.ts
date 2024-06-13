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
    protected createe1: string = "";
    protected name: string = "";
    protected amountt: number = 0;

    @BindValue("display")
    protected valuee: string = "";

    constructor() {
        super(html, css);
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
        const bank: Bank = new Bank();
        if (this.createe1 && this.name && this.amountt) {
            bank.createAccount(this.createe1, this.amountt);
            EzDialog.popup(
                this,
                `${this.name} your account has been succesfully created`,
                "Account Info",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        } else {
            EzDialog.popup(
                this,
                `Your account was not succesfully created`,
                "Fill in all required fields",
                ["Ok"],
                "btn btn-primary",
            );
            return;
        }
    }

    @Input("deposit-account-number")
    deposit1(e: ValueEvent) {
        return e.value.toString();
    }

    @Input("deposit-amount")
    deposit2(e: ValueEvent) {
        return Number(e.value);
    }

    deposit(e1: ValueEvent, e2: ValueEvent) {
        const bank: Bank = new Bank();
        const accountNumber = this.deposit1(e1);
        const amount = this.deposit2(e2);

        bank.deposit(accountNumber, amount);
    }

    @Input("withdraw-account-number")
    input1(e: ValueEvent) {
        return e.value.toString();
    }

    @Input("withdraw-amount")
    input2(e: ValueEvent) {
        return Number(e.value);
    }

    withdraw(e1: ValueEvent, e2: ValueEvent) {
        const bank = new Bank();
        const accountNumber = this.input1(e1);
        const amount = this.input2(e2);

        bank.withdraw(accountNumber, amount);
    }

    @Input("balance-account-number")
    input(e: ValueEvent) {
        const bank: Bank = new Bank();
        bank.getBalance(e.value);
    }
}
