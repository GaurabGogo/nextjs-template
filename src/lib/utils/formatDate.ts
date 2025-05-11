import { format } from "date-fns";

const formatDate = (date: string | Date, formatString: string): string => {
  return format(new Date(date), formatString);
};

export default formatDate;
