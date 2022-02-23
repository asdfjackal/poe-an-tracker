/// <reference types="react-scripts" />

type Modifer = {
  name: string;
  description: string;
  rewards: string[];
  ingredients: string[] | never[];
  used_in: string[] | never[];
  extra: string | null;
  tier: number;
};

export { Modifier };
