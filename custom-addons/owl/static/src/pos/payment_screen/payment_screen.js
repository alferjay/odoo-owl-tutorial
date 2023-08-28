/** @odoo-module */

import Registries from "point_of_sale.Registries"
import PaymentScreen from "point_of_sale.PaymentScreen"

const PaymentScreenInherit = (payment_screen) => class extends payment_screen {
    setup(){
        super.setup()
        console.log("Inherited Payment Screen")
    }

    addNewPaymentLine({ detail: paymentMethod }) {
        const payment_line = super.addNewPaymentLine({ detail: paymentMethod })
        console.log("Inherited add new payment line")
        return payment_line
    }

    go_next(){
        console.log("You clicked next from payment screen.")
    }
}

Registries.Component.extend(PaymentScreen, PaymentScreenInherit)