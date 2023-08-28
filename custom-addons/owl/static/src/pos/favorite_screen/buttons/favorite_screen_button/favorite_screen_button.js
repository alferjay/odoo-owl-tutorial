odoo.define('point_of_sale.FavoriteScreenButton', function(require) {
    'use strict';

    const PosComponent = require('point_of_sale.PosComponent');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const Registries = require('point_of_sale.Registries');

    class FavoriteScreenButton extends PosComponent {
        setup() {
            super.setup();
            console.log("New Favorite Screen Button")
        }

        showFavoriteProduct(){
            this.showScreen('FavoriteProductScreen')
        }
    }
    FavoriteScreenButton.template = 'FavoriteScreenButton';

    ProductScreen.addControlButton({
        component: FavoriteScreenButton,
        position: ['after', 'OrderlineCustomerNoteButton'],
        condition: function(){
            //this.rpc
            //this.env.pos
            return true
        }
    });

    Registries.Component.add(FavoriteScreenButton);

    return FavoriteScreenButton;
});
