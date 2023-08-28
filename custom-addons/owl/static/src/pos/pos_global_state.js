/** @odoo-module */

import Registries from "point_of_sale.Registries"
import { PosGlobalState } from "point_of_sale.models"

const PosGlobalStateInherit = (models) => class extends models {
    constructor(obj) {
        super(obj);
        console.log("Inherited PosGlobalState")
        this.favorite_products = this.getFavoriteProducts()
        this.popupMessage = ""
    }

    async getFavoriteProducts(){
        const data = await this.env.services.rpc({
            'model': 'product.product',
            'method': 'getFavoriteProducts',
            'args': [{}]
        })

        return data
    }

    async setFavoriteProducts(){
        this.favorite_products = await this.getFavoriteProducts()
    }
}

Registries.Model.extend(PosGlobalState, PosGlobalStateInherit)