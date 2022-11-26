import * as choreService from "../../services/choreService.js";

const listAvailableChores = async ({ response }) => {
  const chores = await choreService.listAvailableChores();

  for (let i = 0; i < chores.length; i++) {
    delete chores[i].id;
    delete chores[i].user_id;
  }

  response.body = chores;
};

export { listAvailableChores };