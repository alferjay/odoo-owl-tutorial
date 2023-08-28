/** @odoo-module */

import Registries from "point_of_sale.Registries"
import ProductScreen from "point_of_sale.ProductScreen"
const { onWillStart } = owl

const ProductScreenInherit = (product_screen) => class extends product_screen {
    setup(){
        super.setup()
        console.log("Product Screen Inherited")
        console.log("POS DB", this.env.pos.db)
        console.log("POS Services", this.env.services)
        this.favorite_products = []

        onWillStart(async ()=>{
//            const data = await this.env.services.rpc({
//                'model': 'product.product',
//                'method': 'search',
//                'kwargs': {
//                    'domain': [['available_in_pos', '=', true], ['product_tag_ids.name', '=', 'Favorite']]
//                }
//            })

//            const data = await this.env.services.rpc({
//                'model': 'product.product',
//                'method': 'getFavoriteProducts',
//                'args': [{}]
//            })

//            this.favorite_products = data
            this.favorite_products = await this.env.pos.favorite_products
//            console.log("RPC Data", data)
        })
    }

    get favoriteProducts(){
//        let products = this.env.pos.db.get_product_by_category(4);
        let products = this.env.pos.db.product_by_id;
        console.log("Products", products)
        let favorites = []
        this.favorite_products.forEach(p => favorites.push(products[p]))
        return favorites
    }
}

Registries.Component.extend(ProductScreen, ProductScreenInherit)