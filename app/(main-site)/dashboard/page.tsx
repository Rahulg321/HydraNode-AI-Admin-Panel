import db from "@/lib/db";
import React from "react";

const DashBoardPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  let users = await db.user.findMany();
  return (
    <section className="block-space container">
      <div>
        <h1>Hydranode Users</h1>
        <div>
          {users.map((e, index) => {
            return (
              <div key={e.id} className="flex gap-2">
                <div>{index + 1}</div>
                <span>{e.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DashBoardPage;
