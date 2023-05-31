/** @odoo-module */

import { registry } from "@web/core/registry"
import { CharField } from "@web/views/fields/char/char_field"

class UsernameField extends CharField {
    setup(){
        super.setup()
        console.log("Char Field Inherited")
        console.log(this.props)
    }

    get emailDomain(){
        const { email } = this.props.record.data
        return email ? email.split('@')[1] : ''
    }
}

UsernameField.template = "owl.UsernameField"
UsernameField.supportedTypes = ["char"]
UsernameField.components = { CharField }

registry.category("fields").add("username", UsernameField)