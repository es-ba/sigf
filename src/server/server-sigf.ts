"use strict";

import { AppBackend } from "backend-plus";
import { emergeAppsigf } from "./app-sigf";

var Appsigf = emergeAppsigf(AppBackend)
new Appsigf().start();