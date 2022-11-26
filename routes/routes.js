import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as choreController from "./controllers/choreController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as statisticsController from "./controllers/statisticsController.js";

import * as choreApi from "./apis/choreApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/chores", choreController.listChores);
router.post("/chores", choreController.addChore);
router.post("/chores/:id/claim", choreController.claimChore);
router.post("/chores/:id/complete", choreController.completeChore);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/api/chores", choreApi.listAvailableChores);

router.get(
  "/statistics",
  statisticsController.showFiveUsersWithMostCreatedChores,
);

export { router };