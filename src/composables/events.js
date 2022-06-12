import moment from "moment";

// map events
export const mapEvents = async (events) => {
  const newEvents = [];
  const map = {};
  events.forEach((event) => {
    if (map[event.name]) {
      map[event.name].push(event);
      newEvents[newEvents.length - 1].fights.push(event);
    } else {
      map[event.name] = [event];
      newEvents.push({
        name: event.name,
        id: event._id,
        dataTime: event.startTime,
        fights: [event],
      });
    }
  });

  const completedEvents = await newEvents
    .filter((x) => {
      const a = moment().format();
      const b = moment(x.dataTime).format();
      const result = moment(b).isBefore(moment(a));
      if (result) return x;
    })
    .reverse();

  const upcomingEvents = await newEvents.filter((x) => {
    const a = moment().format();
    const b = moment(x.dataTime).format();
    const result = moment(b).isAfter(moment(a));
    if (result) return x;
  });

  return [completedEvents, upcomingEvents];
};
