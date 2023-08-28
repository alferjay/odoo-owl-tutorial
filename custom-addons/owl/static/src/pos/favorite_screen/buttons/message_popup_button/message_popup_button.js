odoo.define('point_of_sale.MessagePopupButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');

    class MessagePopupButton extends PosComponent {
        setup() {
            super.setup();
        }

        async showMessagePopup(){
            const { confirmed, payload } = await this.showPopup('MessagePopup')
            console.log("confirmed payload ==>", confirmed, payload)

            if (confirmed){
                this.env.pos.popupMessage = payload
            }
        }
    }
    MessagePopupButton.template = 'MessagePopupButton';

    Registries.Component.add(MessagePopupButton);

    return MessagePopupButton;
});
