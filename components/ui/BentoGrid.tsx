import { UserInterface } from "@/hooks/useFetchEvent";
import { cn } from "@/utils/cn";
import { Button } from "@mantine/core";
import Link from "next/link";
import { FaArrowRight, FaUserCircle } from "react-icons/fa"; // Імпортуємо необхідну іконку
import { TbCircleArrowUpRight } from "react-icons/tb";

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
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
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
  color,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  registeredUsers?: UserInterface[];
  eventDate?: Date;
  organizer?: string;
  id?: string | React.ReactNode;
  color?: string;
}) => {
  const generateGradient = (color: string | undefined) => {
    return `radial-gradient(ellipse at 120% 120%, ${color} 10%, #232323 60%)`;
  };

  return (
    <div
      className={cn(
        "rounded-lg group/bento hover:shadow-xl transition duration-200 p-4 bg-[#18181b] text-white borderjustify-between flex m-0 border-[#4F4F4F] border",
        className
      )}
      style={{
        background: generateGradient(color),
        backdropFilter: "blur(200px)",
      }}
    >
      <div className="flex flex-col justify-between">
        <div>
          <p
            className="text-base md:text-lg font-sans font-bold"
            style={{ color: color }}
          >
            {organizer}
          </p>
          <h2 className={`text-2xl font-sans font-black text-white`}>
            {title}
          </h2>

          <p className="text-md md:text-base font-sans font-normal text-white mt-1">
            {description}
          </p>
        </div>

        <div>
          <p className="flex items-center gap-1 font-bold mb-2">
            <FaUserCircle size={20} />
            {registeredUsers?.length}
          </p>
          <div className="flex gap-4 mb-2">
            <Link
              href={`event/${id}`}
              className="bg-white rounded w-fit font-normal text-neutral-600 px-4 py-2 hover:scale-105 transition-all duration-300"
            >
              View
            </Link>
            <Link
              href={`register/${id}`}
              className="group flex gap-2 items-center bg-[#353535] rounded w-fit font-normal text-white px-4 py-2 hover:scale-105 transition-all duration-300"
            >
              Register{" "}
              <TbCircleArrowUpRight
                size={25}
                className="group-hover:rotate-45 transition-all"
              />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {eventDate ? (
              <>
                <p className="text-base font-sans font-normal text-neutral-300">
                  {new Date(eventDate).toLocaleDateString()}
                </p>
                <p className="text-base font-sans font-normal text-neutral-300">
                  {new Date(eventDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </>
            ) : (
              <p className="text-base  font-sans font-normal text-neutral-300">
                No event date available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
