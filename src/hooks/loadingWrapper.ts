import { GetState, SetState } from "zustand";
import produce from "immer";

const AsyncFunction = (async () => {}).constructor;

const loadingWrapper =
  <T extends object>(set: SetState<T>, get: GetState<T>) =>
  async (cb: () => Promise<void>): Promise<void> => {
    const isAsyncFunction = cb instanceof AsyncFunction;
    const hasIsLoadingProperty = Object.keys(get()).includes("isLoading");

    if (isAsyncFunction && hasIsLoadingProperty) {
      setter(set)((state) => {
        //@ts-ignore
        state.isLoading = true;
      });
    }

    await cb();

    if (isAsyncFunction && hasIsLoadingProperty) {
      setter(set)((state) => {
        //@ts-ignore
        state.isLoading = false;
      });
    }
  };

export default loadingWrapper;

export const setter =
  <T extends object>(set: SetState<T>) =>
  (cb: (state: T) => void): void => {
    set(
      produce((state: T) => {
        cb(state);
      })
    );
  };
