from odoo import models


class ProductProduct(models.Model):
    _inherit = 'product.product'

    def getFavoriteProducts(self):
        products = self.search([('available_in_pos', '=', True), ('product_tag_ids.name', '=', 'Favorite')])
        return products.ids

    def mark_favorite(self):
        print("self ==>", self)
        tags = self.env['product.tag'].search([('name', '=', 'Favorite')], limit=1)

        self.product_tag_ids = [(4, tags.id)]

    def mark_not_favorite(self):
        print("self ==>", self)
        tags = self.env['product.tag'].search([('name', '=', 'Favorite')], limit=1)

        self.product_tag_ids = [(3, tags.id)]
