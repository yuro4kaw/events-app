import { cn } from "@/utils/cn";
import Link from "next/link";

interface RegisteredUser {
  fullName: string;
  email: string;
  dateOfBirth: string; // або можна використовувати тип Date
  heardAbout: string;
  _id: string;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  registeredUsers,
  eventDate,
  organizer,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  registeredUsers?: RegisteredUser[];
  eventDate?: string;
  organizer?:string,
  id?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-[#18181b] dark:border-white/[0.2] bg-white dark:text-white border border-transparent justify-between flex",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="text-lg md:text-2xl font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="text-base md:text-xl font-sans font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>

        <div className="text-base md:text-xl font-sans font-normal text-neutral-600 dark:text-neutral-300">
          {eventDate}
        </div>

        <div className="text-base md:text-xl font-sans font-normal text-neutral-600 dark:text-neutral-300">
          {organizer}
        </div>
        <div className="flex gap-2">
        <Link href={`register/${id}`} className=" p-5 bg-blue-200 dark:bg-blue-950">Register</Link>
        <Link href={`event/${id}`} className=" p-5 bg-blue-200 dark:bg-blue-950">View</Link></div>
        <p>Registered already:{registeredUsers?.length}</p>
      </div>
    </div>
  );
};
