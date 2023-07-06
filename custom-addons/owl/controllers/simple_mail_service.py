from odoo import http


class SimpleMailService(http.Controller):
    @http.route('/owl/simple_mail', type='json', auth='user')
    def send_simple_mail(self, **mail_data):
        mail = http.request.env['mail.mail']
        new_email = mail.create({
            'email_from': mail_data['email_from'],
            'email_to': mail_data['email_to'],
            'subject': mail_data['subject'],
            'body_html': mail_data['message'],
        }).send()

        if not new_email:
            return False

        return True
