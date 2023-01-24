export type Tag = {
  slug: {
    current: string;
    _type: "slug";
  };
  tag: string;
  tagColor: {
    alpha: number;
    hex: string;
    hsl: HLS;
    hsv: HSV;
    rgb: RGB;
    _type: "color";
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: "tag";
  _updatedAt: string;
};

type HLS = {
  a: number;
  h: number;
  l: number;
  s: number;
  type: "hslaColor";
};

type HSV = {
  a: number;
  h: number;
  s: number;
  v: number;
  type: "hsvaColor";
};

type RGB = {
  a: number;
  r: number;
  g: number;
  b: number;
  type: "rgbaColor";
};
