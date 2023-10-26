/** @odoo-module */

import { registry } from "@web/core/registry"
const { Component, onWillStart, onMounted, useRef, useState } = owl
import { loadJS, loadCSS } from "@web/core/assets"

export class ExternalLibraries extends Component {
    setup(){
        this.phone = useRef("phone")
        this.file = useRef("file")
        this.iti
        this.state = useState({ phoneValid: undefined })

        onWillStart(async ()=>{
            //await loadJS("https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js")
            //await loadCSS("https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/css/intlTelInput.css")

            await loadJS("/owl/static/src/lib/intl-tel-input/build/js/intlTelInput.min.js")
            await loadCSS("/owl/static/src/lib/intl-tel-input/build/css/intlTelInput.css")

            await loadJS("https://unpkg.com/filepond@^4/dist/filepond.js")
            await loadCSS("https://unpkg.com/filepond@^4/dist/filepond.css")

            await loadCSS("https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css")
            await loadJS("https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js")
        })

        onMounted(()=>{
            console.log("intlTelInput", intlTelInput)
            this.iti = intlTelInput(this.phone.el, {
                //allowDropdown: false,
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js",
            })

            console.log("FilePond", FilePond)

            FilePond.registerPlugin(FilePondPluginImagePreview);

            FilePond.create(this.file.el, {
                allowMultiple: true,
                server: {
                    process: './filepond/process',
                    fetch: null,
                    revert: './filepond/revert',
                },
            })
        })
    }

    validate(){
        //console.log("this.iti", this.iti)
        const number = this.iti.getNumber()
        const country = this.iti.getSelectedCountryData()

        console.log("number, country ==>", number, country)

        if (this.iti.isValidNumber()){
            console.log("Phone is valid")
            this.state.phoneValid = true
        } else {
            console.log("Phone is not valid")
            this.state.phoneValid = false
        }
    }
}

ExternalLibraries.template = "owl.ExternalLibraries"

registry.category("actions").add("owl.ExternalLibraries", ExternalLibraries)