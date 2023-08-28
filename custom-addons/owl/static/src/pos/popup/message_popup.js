odoo.define('point_of_sale.MessagePopup', function (require){
    'use strict';

    const Registries = require('point_of_sale.Registries');
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const { useState, useRef, onMounted } = owl;

    class MessagePopup extends AbstractAwaitablePopup {
        setup(){
            super.setup()
            console.log("New Message Popup")
            this.state = useState({text_value: ''})
            this.txtRef = useRef('text-value')

            onMounted(()=>this.txtRef.el.focus())
        }

        confirm(){
            console.log("You confirmed message popup.")
            console.log("Text Value", this.state.text_value)
            super.confirm()
        }

        cancel(){
            console.log("You cancelled message popup.")
            super.cancel()
        }

        getPayload(){
            return this.state.text_value;
        }
    }

    MessagePopup.template = 'MessagePopup';
    Registries.Component.add(MessagePopup)

    return MessagePopup
})