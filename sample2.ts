import { z } from "zod";

const password = z
  .string()
  .min(5, { message: "5文字以上で入力してください。" })
  .max(20, { message: "20文字以下で入力してください。" });

let input = document.getElementById("input")! as HTMLInputElement;
input.addEventListener("change", (e) => {
  let value = input.value;
  try {
    password.parse(value);
  } catch (err) {
    if (err instanceof z.ZodError) {
      document.getElementById("valid")!.innerHTML =
        "<span style='color: red;'>" + err.issues[0].message + "</span>";
    }
  }
});
