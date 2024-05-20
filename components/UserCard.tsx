import React from "react";

const UserCard = ({
  id,
  fullName,
  email,
}: {
  id: string;
  fullName: string;
  email: string;
}) => {
  return (
    <li
      key={id}
      className="flex gap-4 bg-[#232323] p-4 border-[#4F4F4F] border rounded-lg"
    >
      <div className="size-12 text-3xl font-bold rounded-full bg-gray-500 flex justify-center items-center pointer-events-none select-none">
        {fullName && fullName.charAt(0).toUpperCase()}
      </div>
      <div>
        <h3 className="text-lg font-bold">{fullName}</h3>
        <p className="text-neutral-400">{email}</p>
      </div>
    </li>
  );
};

export default UserCard;
