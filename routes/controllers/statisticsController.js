import * as statisticsService from "../../services/statisticsService.js";

const showFiveUsersWithMostCreatedChores = async ({ render }) => {
  const usersWithMostCreatedChores = await statisticsService
    .findFiveUsersWithMostCreatedChores();

  render("statistics.eta", {
    mostCreatedChores: usersWithMostCreatedChores,
  });
};

export { showFiveUsersWithMostCreatedChores };
