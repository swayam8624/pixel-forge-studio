import { SiBlender, SiUnity, SiThreedotjs, SiTypescript, SiPython, SiCplusplus, SiReact, SiNodedotjs, SiFigma, SiOpengl, SiRust, SiGithub, SiLinkedin, SiYoutube, SiInstagram, SiX, SiItchdotio } from "react-icons/si";
import { TbBrandPython } from "react-icons/tb";
import type { IconType } from "react-icons";

export const skillIcons: Record<string, IconType> = {
  Blender: SiBlender,
  Unity: SiUnity,
  "Three.js": SiThreedotjs,
  TypeScript: SiTypescript,
  Python: SiPython,
  "C++": SiCplusplus,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Figma: SiFigma,
  GLSL: SiOpengl,
  Rust: SiRust,
  Pygame: TbBrandPython,
};

export const brandIcons = {
  github: SiGithub,
  linkedin: SiLinkedin,
  youtube: SiYoutube,
  instagram: SiInstagram,
  x: SiX,
  itch: SiItchdotio,
};
