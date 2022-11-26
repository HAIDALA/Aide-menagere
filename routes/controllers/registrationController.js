import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  await userService.addUser(
    params.get("name"),
    params.get("address"),
    params.get("email"),
    await bcrypt.hash(params.get("password")),
  );

  response.redirect("/auth/login");
};

const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };