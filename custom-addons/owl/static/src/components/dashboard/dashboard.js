/** @odoo-module */

import { registry } from "@web/core/registry"
import { Layout } from "@web/search/layout"
import { getDefaultConfig } from "@web/views/view"
import { useService } from "@web/core/utils/hooks"

const { Component, useSubEnv, useState, onWillStart } = owl

export class OwlDashboard extends Component {
    setup(){
        console.log("Owl Odoo Dasboard")
        this.display = {
            controlPanel: {"top-right": false, "bottom-right": false}
        }

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })

        this.dashboard_service = useService("owlDashboardService")
        console.log(this.dashboard_service)
        this.dashboard_data = useState(this.dashboard_service.dashboard_data)
        this.simple_mail = useService("simpleMailService")
//        this.dashboard_data = useState({})

//        onWillStart(async ()=>{
//            this.dashboard_data = await this.dashboard_service.getDashboardData()
//            console.log("dashboard data == ", this.dashboard_data)
//        })
    }

    get owlBasicService(){
        const basicService = this.env.services.basicService
        return basicService
    }

    openSimpleMail(){
        this.simple_mail.open()
    }
}

OwlDashboard.template = "owl.Dashboard"
OwlDashboard.components = { Layout }

registry.category("actions").add("owl.Dashboard", OwlDashboard)