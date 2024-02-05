import {getCookie} from "https://jscroot.github.io/cookie/croot.js";

export let URLGeoJson = "https://asia-southeast2-project3-403614.cloudfunctions.net/gischap4";
export let urlPostGCF = "https://asia-southeast2-gilartest.cloudfunctions.net/larcbgis4v2";
export let UrlLogin = "https://asia-southeast2-gilartest.cloudfunctions.net/zlogingis"
export let UrlRegister = "https://asia-southeast2-gilartest.cloudfunctions.net/zregisgis"
export let tableTag = "tr";
export let tableRowClass = "content is-small";
export let token = "gilar"
export let cookie = getCookie("Login")
export let tableTemplate = `
<td>#NAME#</td>
<td >#KORDINAT#</td>
<td>#TYPE#</td>
`
export const clickpopup = `
Long : #LONG#<br>
Lat  : #LAT#<br>
X   : #X#<br>
Y   : #Y#<br>
HDMS : #HDMS#<br>
`
