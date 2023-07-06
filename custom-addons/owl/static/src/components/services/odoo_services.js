/** @odoo-module */

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog"
import { routeToUrl } from "@web/core/browser/router_service"
import { browser } from "@web/core/browser/browser"

const { Component, useSubEnv, useState } = owl

export class OwlOdooServices extends Component {
    setup(){
        console.log("Owl Odoo Services")
        this.display = {
            controlPanel: {"top-right": false, "bottom-right": false}
        }

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })

        this.cookieService = useService("cookie")
        console.log(this.cookieService)

        if (this.cookieService.current.dark_theme == undefined){
            this.cookieService.setCookie("dark_theme", false)
        }

        const router = this.env.services.router

        this.state = useState({
            dark_theme: this.cookieService.current.dark_theme,
            get_http_data: [],
            post_http_data: [],
            rpc_data: [],
            orm_data: [],
            bg_success: router.current.search.bg_success,
            user_data: null,
            company_data: null,
        })

        const titleService = useService("title")
        titleService.setParts({zopenerp: "AJScript", odoo: "Media", any:"Tutorials"})
        console.log(titleService.getParts())
    }

    showNotification(){
        const notification = this.env.services.notification
        notification.add("This is a sample notification.", {
            title: "Odoo Notification Service",
            type: "info", //info, warning, danger, success
            sticky: true,
            className: "p-4",
            buttons: [
                {
                    name: "Notification Action",
                    onClick: ()=>{
                        console.log("This is notification action")
                    },
                    primary: true,
                },
                {
                    name: "Show me again",
                    onClick: ()=>{
                        this.showNotification()
                    },
                    primary: false,
                }
            ]
        })
    }

    showDialog(){
        const dialog = this.env.services.dialog
        dialog.add(ConfirmationDialog, {
            title: "Dialog Service",
            body: "Are you sure you want to continue this action?",
            confirm: ()=>{
                console.log("Dialog Confirmed.")
            },
            cancel: ()=>{
                console.log("Dialog Cancelled")
            }
        }, {
            onClose: ()=> {
                console.log("Dialog service closed....")
            }
        })
        console.log(dialog)
    }

    showEffect(){
        const effect = this.env.services.effect
        console.log(effect)
        effect.add({
            type: "rainbow_man",
            message: "This is an awesome odoo effect service."
        })
    }

    setCookieService(){
        if (this.cookieService.current.dark_theme == 'false'){
            this.cookieService.setCookie("dark_theme", true)
        } else {
            this.cookieService.setCookie("dark_theme", false)
        }

        this.state.dark_theme = this.cookieService.current.dark_theme

        this.cookieService.deleteCookie("test")
    }

    async getHttpService(){
        const http = this.env.services.http
        console.log(http)
        const data = await http.get('https://dummyjson.com/products')
        console.log(data)
        this.state.get_http_data = data.products
    }

    async postHttpService(){
        const http = this.env.services.http
        console.log(http)
        const data = await http.post('https://dummyjson.com/products/add', {title: 'BMW Pencil',})
        console.log(data)
        this.state.post_http_data = data
    }

    async getRpcService(){
        const rpc = this.env.services.rpc
        const data = await rpc("/owl/rpc_service", {limit: 15})
        console.log(data)
        this.state.rpc_data = data
    }

    async getOrmService(){
        const orm = this.env.services.orm
        const data = await orm.searchRead("res.partner", [], ['name', 'email'])
        console.log(data)
        this.state.orm_data = data
    }

    getActionService(){
        const action = this.env.services.action
        action.doAction({
            type: "ir.actions.act_window",
            name: "Action Service",
            res_model: "res.partner",
            domain:[],
            context:{search_default_type_company: 1},
            views:[
                [false, "list"],
                [false, "form"],
                [false, "kanban"],
            ],
            view_mode:"list,form,kanban",
            target: "current"
        })
    }

    getRouterService(){
        const router = this.env.services.router
        console.log(router)
        let { search } = router.current
        search.bg_success = search.bg_success == "1" ? "0" : "1"
        console.log(router.current)
        browser.location.href = browser.location.origin + routeToUrl(router.current)
    }

    getUserService(){
        const user = this.env.services.user
        console.log(user)
        this.state.user_data = JSON.stringify(user)
    }

    getCompanyService(){
        const company = this.env.services.company
        console.log(company)
        this.state.company_data = JSON.stringify(company)
    }
}

OwlOdooServices.template = "owl.OdooServices"
OwlOdooServices.components = { Layout }

registry.category("actions").add("owl.OdooServices", OwlOdooServices)