import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { PostLogin, ResponseLogin } from "../js/controller/controller.js";
import { token, UrlLogin } from '../js/template/template.js';

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("formlogin");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    let data = PostLogin();
    postWithToken(UrlLogin, 'Authorization', 'Bearer ' + token, data, ResponseLogin);
  });
});
