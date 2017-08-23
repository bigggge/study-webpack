/**
 * main.js
 *
 * Created by xiepan on 2016/11/22 上午9:48.
 */
// var greeter = require('./greeter.js');
// document.getElementById('root').appendChild(greeter());

import React from "react";
import {render} from "react-dom";
import Greeter from "./greeter";

import "./main.css"; //使用require导入css文件


render(<Greeter />, document.getElementById('root'));