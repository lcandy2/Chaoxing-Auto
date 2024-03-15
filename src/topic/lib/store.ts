import {create} from "zustand";
import {combine, createJSONStorage, persist} from "zustand/middleware";
import GMStorage from "@topic/lib/hooks/gm-storage";
import {CurrentPage, CurrentStatus, TopicDetail} from "@topic/lib/types";

export const useLogStore = create(combine(
    {
      logItems: <Array<string>>[]
    }, (set) => ({
      addLogItem: (item: string) => {
        set((state) => ({logItems: [...state.logItems, item]}));
      }
    })
));

export const useSettingsStore = create(persist(combine(
    {
      standbyTime: <number>200,
      countTimes: <number>1,
      _hasHydrated: <boolean>false,
    }, (set) => ({
      setStandbyTime: (time: number) => {
        set({standbyTime: time});
      },
      setCountTimes: (times: number) => {
        set({countTimes: times});
      },
      setHasHydrated: (state: boolean) => {
        set({
          _hasHydrated: state
        });
      }
    })
), {
  name: "topic_settings",
  storage: createJSONStorage(() => GMStorage),
  onRehydrateStorage: () => (state: any) => {
    if (state) {
      state.setHasHydrated(true)
    }
  }
}));

export const useStatusStore = create(combine(
    {
      running: <boolean>false,
      currentStatus: <CurrentStatus>null,
      currentPage: <CurrentPage>null,
      topicDetail: <TopicDetail>{},
    }, (set) => ({
      setRunning: (running: boolean) => {
        set({running});
      },
      setCurrentStatus: (currentStatus: CurrentStatus) => {
        set({currentStatus});
      },
      setCurrentPage: (currentPage: CurrentPage) => {
        set({currentPage});
      },
      setTopicDetail: (topicDetail: TopicDetail) => {
        set({topicDetail});
      }
    })
));
