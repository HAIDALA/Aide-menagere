import { executeQuery } from "../database/database.js";

const findFiveUsersWithMostCreatedChores = async () => {
  const res = await executeQuery(
    `SELECT users.name as name, count(*) as count FROM users
    JOIN chores ON users.id = chores.user_id
    GROUP BY users.name
    ORDER BY count DESC
    LIMIT 5`,
  );

  return res.rows;
};

export { findFiveUsersWithMostCreatedChores };