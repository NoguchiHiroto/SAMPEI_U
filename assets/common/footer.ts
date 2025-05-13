import type { SFSymbol } from "expo-symbols";
export interface Tab {
  name: string;
  title: string;
  iconName: SFSymbol;
};

export const tabs: Tab[] = [
  {name: 'input', title: '入力', iconName: "house.fill"},
  {name: 'graph', title: 'グラフ', iconName: "house.fill"},
  {name: 'group', title: 'グループ', iconName: "house.fill"},
];

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}