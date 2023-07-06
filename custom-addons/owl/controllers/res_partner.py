from odoo import http


class ResPartner(http.Controller):
    @http.route('/owl/rpc_service', type='json', auth='user')
    def get_customers(self, limit):
        return http.request.env['res.partner'].search_read([], ['name', 'email'], limit=limit)

    @http.route('/owl/dashboard_service', type='json', auth='user')
    def dashboard_service(self):
        partner = http.request.env['res.partner']
        return {
            "partners": partner.search_count([]),
            "customers": partner.search_count([('is_company', '=', True)]),
            "individuals": partner.search_count([('is_company', '=', False)]),
            "locations": len(partner.read_group([], ['state_id'], ['state_id'])),
        }
