import { useEffect, useState } from "react";

const useEventStatus = (eventDate: Date | null) => {
  const [eventEnded, setEventEnded] = useState<boolean>(false);

  useEffect(() => {
    if (eventDate) {
      const eventDateTime = new Date(eventDate).getTime();
      const currentDateTime = new Date().getTime();
      setEventEnded(eventDateTime < currentDateTime);
    }
  }, [eventDate]);

  return eventEnded;
};

export default useEventStatus;
