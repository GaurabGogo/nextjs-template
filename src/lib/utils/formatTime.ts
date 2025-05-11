import { DateTime } from "luxon";

const formatTime = (
  time: string | Date,
  formatString: string = "hh:mm a ZZZZ",
  zone: string = "Asia/Kolkata"
): string => {
  const parsedTime =
    typeof time === "string"
      ? DateTime.fromFormat(time, "h:mm a", { zone })
      : DateTime.fromJSDate(time).setZone(zone);

  return parsedTime.toFormat(formatString);
};

export default formatTime;
