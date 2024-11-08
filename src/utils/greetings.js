import moment from 'moment'

export const greetingText = () => {
  const currentHour = moment().hour()
  const greeting =
    currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
        ? 'Good Afternoon'
        : 'Good Evening'
  return greeting
}
