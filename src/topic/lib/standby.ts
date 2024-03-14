export default async function Standby(times: number = 1)  {

  return new Promise(resolve => setTimeout(resolve, standbyTime * times));
}
