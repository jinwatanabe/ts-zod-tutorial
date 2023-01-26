import { z } from "zod";
import { User } from "./types/user";

// User型をZodTypeに変換して型として使う
const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

const UserScheme = schemaForType<User>()(
  z.object({
    name: z
      .string()
      .min(1, { message: "名前が未入力です" })
      .max(20, { message: "名前は20文字以下で入力してください。" }),
    password: z.string().min(1, { message: "パスワードが未入力です" }),
  })
);

let name = document.getElementById("name")! as HTMLInputElement;
let password = document.getElementById("password")! as HTMLInputElement;
let button = document.getElementById("button")!;

button.addEventListener("click", (e) => {
  try {
    UserScheme.parse({ name: name.value, password: password.value });
    const user: User = { name: name.value, password: password.value };
    document.getElementById("user")!.innerHTML =
      "<span style='color: green;'>" + JSON.stringify(user) + "</span>";
  } catch (err) {
    if (err instanceof z.ZodError) {
      const message_list = err.issues.map((issue) => {
        return "<span style='color: red;'>" + issue.message + "</span>";
      });
      const message = message_list.join("<br>");
      document.getElementById("valid")!.innerHTML = message;
    }
  }
});
