import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import {GetDataForm,  ResponsePost} from "../js/controller/controller.js";
import { token, UrlRegister } from "../js/template/template.js";


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let data = GetDataForm();
        postWithBearer(UrlRegister, token, data, ResponsePost)
    });
});