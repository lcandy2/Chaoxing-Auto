import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";
import GMStorage from "@topic/lib/hooks/gm-storage";
import {
  ActionFrameStatus,
  ActionFrameStatusStatus,
  ActionNewTopicStatus,
  CurrentPage,
  CurrentStatus,
  TopicDetail,
  TopicList,
} from "@topic/lib/types";

export const useLogStore = create(
  combine(
    {
      logItems: <Array<string>>[],
    },
    (set) => ({
      addLogItem: (item: string) => {
        set((state) => ({ logItems: [...state.logItems, item] }));
      },
    }),
  ),
);

export const useSettingsStore = create(
  persist(
    combine(
      {
        standbyTime: <number>1000,
        replyCountTimes: <number>1,
        newTopicCountTimes: <number>3,
        _hasHydrated: <boolean>false,
      },
      (set) => ({
        setStandbyTime: (time: number) => {
          set({ standbyTime: time });
        },
        setReplyCountTimes: (times: number) => {
          set({ replyCountTimes: times });
        },
        setNewTopicCountTimes: (times: number) => {
          set({ newTopicCountTimes: times });
        },
        setHasHydrated: (state: boolean) => {
          set({
            _hasHydrated: state,
          });
        },
      }),
    ),
    {
      name: "topic_settings",
      storage: createJSONStorage(() => GMStorage),
      onRehydrateStorage: () => (state: any) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    },
  ),
);

export const useStatusStore = create(
  combine(
    {
      currentStatus: <CurrentStatus>null,
      currentPage: <CurrentPage>null,
      isInActionFrame: <boolean>false,
      actionFrameStatus: <ActionFrameStatus>{},
      actionNewTopicStatus: <ActionNewTopicStatus>null,
      topicDetail: <TopicDetail>{},
      topicList: <TopicList[]>[],
    },
    (set) => ({
      setCurrentStatus: (currentStatus: CurrentStatus) => {
        set({ currentStatus });
      },
      setCurrentPage: (currentPage: CurrentPage) => {
        set({ currentPage });
      },
      setIsInActionFrame: (isInActionFrame: boolean) => {
        set({ isInActionFrame });
      },
      setActionFrameStatus: (actionFrameStatus: ActionFrameStatus) => {
        set({ actionFrameStatus });
      },
      setActionFrameStatusStatus: (
        actionFrameStatusStatus: ActionFrameStatusStatus,
      ) => {
        set((state) => ({
          actionFrameStatus: {
            ...state.actionFrameStatus,
            status: actionFrameStatusStatus,
          },
        }));
      },
      setActionFrameStatusIndex: (index: number) => {
        set((state) => ({
          actionFrameStatus: {
            ...state.actionFrameStatus,
            index,
          },
        }));
      },
      setActionFrameStatusTotal: (total: number) => {
        set((state) => ({
          actionFrameStatus: {
            ...state.actionFrameStatus,
            total,
          },
        }));
      },
      setActionFrameStatusSrc: (src: string) => {
        set((state) => ({
          actionFrameStatus: {
            ...state.actionFrameStatus,
            src,
          },
        }));
      },
      setActionNewTopicStatus: (actionNewTopicStatus: ActionNewTopicStatus) => {
        set({ actionNewTopicStatus });
      },
      setTopicDetail: (topicDetail: TopicDetail) => {
        set({ topicDetail });
      },
      setTopicList: (topicList: TopicList[]) => {
        set({ topicList });
      },
    }),
  ),
);
