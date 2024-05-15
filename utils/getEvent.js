const getEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/events", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default getEvents;