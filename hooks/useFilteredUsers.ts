import { useState } from "react";
import { UserInterface } from "@/hooks/useFetchEvent";

const useFilteredUsers = (users: UserInterface[]) => {
  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");

  const filteredUsers = users.filter((user) => {
    const fullName = user.fullName?.toLowerCase() || "";
    const email = user.email?.toLowerCase() || "";

    return (
      fullName.includes(searchName.toLowerCase()) &&
      email.includes(searchEmail.toLowerCase())
    );
  });

  return { searchName, setSearchName, searchEmail, setSearchEmail, filteredUsers };
};

export default useFilteredUsers;
