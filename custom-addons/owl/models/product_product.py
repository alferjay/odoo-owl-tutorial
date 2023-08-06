from odoo import models


class ProductProduct(models.Model):
    _inherit = 'product.product'

    def getFavoriteProducts(self):
        products = self.search([('available_in_pos', '=', True), ('product_tag_ids.name', '=', 'Favorite')])
        return products.ids
