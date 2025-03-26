import { create } from 'zustand';

type State = {
  example: string;
  setExample: (example: string) => void;
};

export const useHomeStore = create<State>((set) => ({
  example: 'example',
  setExample: (example) => set({ example }),
}));

export const setExample = (example: string) =>
  useHomeStore.setState({ example });
