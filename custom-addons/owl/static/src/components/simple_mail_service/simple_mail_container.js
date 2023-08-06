/** @odoo-module */

const { Component, xml, useState } = owl

export class SimpleMailContainer extends Component {
    setup(){
//        console.log("This is a simple mail container.", this.props)
        this.state = useState(this.props.simple_mail)
    }
}

export class SimpleMail extends Component {
    setup(){
        console.log("This is simple mail component")
        this.state = useState({
            email_to: "",
            subject: "",
            message: "",
        })
    }
}

SimpleMail.template = "owl.SimpleMail"

SimpleMailContainer.template = xml`
    <div class="o_simple_mail_manager">
        <t t-if="state.isActive">
            <SimpleMail t-props="state"/>
        </t>
    </div>
`

SimpleMailContainer.components = { SimpleMail }