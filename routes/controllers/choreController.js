import * as choreService from "../../services/choreService.js";
import { validasaur } from "../../deps.js";

const choreValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  description: [validasaur.required, validasaur.minLength(1)],
  chorecoins: [validasaur.required, validasaur.isNumeric],
  due_date: [validasaur.required, validasaur.isDate],
};

const getChoreData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    title: params.get("title"),
    description: params.get("description"),
    chorecoins: params.get("chorecoins"),
    due_date: params.get("due_date"),
  };
};

const addChore = async ({ request, response, render, user }) => {
  const choreData = await getChoreData(request);

  const [passes, errors] = await validasaur.validate(
    choreData,
    choreValidationRules,
  );

  if (!passes) {
    console.log(errors);
    choreData.validationErrors = errors;
    render("chores.eta", choreData);
  } else {
    await choreService.addChore(
      user.id,
      choreData.title,
      choreData.description,
      choreData.chorecoins,
      choreData.due_date,
    );

    response.redirect("/chores");
  }
};


const claimChore = async ({ params, response, user }) => {
  await choreService.claimChore(params.id, user.id);

  response.redirect("/chores");
};

const completeChore = async ({ params, response, user }) => {
  await choreService.completeChore(params.id, user.id);

  response.redirect("/chores");
};

const listChores = async ({ render, user }) => {
  render("chores.eta", {
    availableChores: await choreService.listAvailableChores(),
    claimedChores: await choreService.listUserChores(user.id),
  });
};
export { addChore, claimChore, completeChore, listChores };