/**
 * greeter.js
 *
 * Created by xiepan on 2016/11/22 上午9:47.
 */
// var config = require('./config.json');
//
// module.exports = function () {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText+"111";
//     return greet;
// };
//Greeter,js
import React, {Component} from "react";
import config from "./config.json";

class Greeter extends Component {
    render() {
        return (
            <div>
                {config.greetText}
            </div>
        );
    }
}

export default Greeter