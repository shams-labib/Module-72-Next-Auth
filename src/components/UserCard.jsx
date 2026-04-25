"use client";
import { useSession } from "next-auth/react";

const UserCard = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h1 className="font bold"> User - Client</h1>
      <div className="p-4 rounded  border-2">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
