/** @odoo-module */

import { registry } from "@web/core/registry"
import { SimpleMailContainer } from "./simple_mail_container"
const { reactive } = owl

export const simpleMailService = {
    dependencies:["orm", "user", "rpc","notification"],
    async start(env, { orm, user, rpc, notification }){
//        console.log("user service", user)
        const user_email = await orm.searchRead("res.partner", [["id", "=", user.partnerId]], ["email"])
//        console.log("user email", user_email)

        let simple_mail = reactive({
            isActive: false,
            open,
            close,
            send,
            email_from: user_email[0].email
        })

        registry.category("main_components").add("SimpleMailContainer", {
            Component: SimpleMailContainer,
            props: { simple_mail }
        })

        function open(){
            simple_mail.isActive = true
        }

        function close(){
            simple_mail.isActive = false
        }

        async function send(mail){
            console.log("Send simple mail service", mail)
            const data = {
                email_from: simple_mail.email_from,
                email_to: mail.email_to,
                subject: mail.subject,
                message: mail.message,
            }

            const new_email = await rpc("/owl/simple_mail", data)
            console.log(new_email)
            if (new_email){
                notification.add("Mail successfully sent", {type: "info"})
            } else {
                notification.add("Oooops! Something went wrong. Mail not sent.", {type: "danger"})
            }

            close()
        }

        return {
            open
        }
    }
}

registry.category("services").add("simpleMailService", simpleMailService)