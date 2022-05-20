import { $host, $hostImg } from "./index";

export const fetchEvents = async () => {
  try {
    const { data } = await $host.get("api/v1/events/1");
    return data;
  } catch (error) {
    return { message: "somthing wrong" };
  }
};

export const fetchFights = async (id) => {
  try {
    const { data } = await $host.get(`api/v1/fights/${id}`);
    return data;
  } catch (error) {
    return { message: "no fight" }
  }
};

export const fetchFighterImg= async (firstName, lastName) => {
  try {
    const { data } = await $host.get(`${firstName} ${lastName}.png`);
    return data;
  } catch (error) {
    const { data } = await $host.get(`silhouette.png`);
    return data;
  }
};