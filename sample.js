"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const password = zod_1.z.string().min(5).max(20);
let input = document.getElementById("input");
input.addEventListener("change", (e) => {
    let value = input.value;
    try {
        password.parse(value);
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            document.getElementById("valid").innerHTML =
                "</span style='color: red;'>" + err.message + "</span>";
        }
    }
});
