export const convertSeconds = (seconds) => {
  let hours = parseInt(seconds / 3600)
  if(hours===24){hours=0}
  if(hours===25){hours=1}
  const minutes = parseInt(seconds % 3600 / 60)
  return `${hours.toString().length > 1 ? hours : `0${hours}`}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`
}