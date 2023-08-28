/** @odoo-module */

import { registry } from "@web/core/registry"
const { reactive } = owl

export const owlDashboardService = {
    dependencies:["rpc"],
    async start(env, { rpc }){
        let dashboard_data = reactive({})

        Object.assign(dashboard_data, await rpc("/owl/dashboard_service/"))

//        setInterval(async ()=>{
//            Object.assign(dashboard_data, await rpc("/owl/dashboard_service/"))
//        }, 5000)

        async function getDashboardData(){
            return await rpc("/owl/dashboard_service/")
        }
        return {
            dashboard_data,
            getDashboardData: getDashboardData,
        }
    }
}

registry.category("services").add("owlDashboardService", owlDashboardService)