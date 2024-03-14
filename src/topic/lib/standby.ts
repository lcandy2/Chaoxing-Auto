import {useSettingsStore} from "@topic/lib/store";

export default async function Standby(times: number = 1)  {
  const standbyTime = await useSettingsStore.getState().standbyTime;
  return new Promise(resolve => setTimeout(resolve, standbyTime * times));
}
