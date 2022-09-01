import create from "zustand";
import { combine } from "zustand/middleware";
import loadingWrapper, { setter } from "./loadingWrapper";

interface IStore {
  isLoading: boolean;
  count: number;
}

const initialState: IStore = {
  isLoading: false,
  count: 0,
};

const delay = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, ms)
  );

const useStore = create(
  combine(initialState, (set, get) => {
    const loader = (f: () => Promise<void>) => loadingWrapper(set, get)(f);

    return {
      fetchNetwork: () =>
        loader(async () => {
          await delay(2000);

          setter(set)((state) => {
            state.count += 1;
          });
        }),
    };
  })
);
export default useStore;
