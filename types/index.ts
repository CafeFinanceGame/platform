import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

enum PlayerRole {
  COFFEE_COMPANY,
  MACHINE_COMPANY,
  MATERIAL_COMPANY
}

type Company = {
  owner: string;
  role: PlayerRole;
  energy: number;
}