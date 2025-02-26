import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react"; 
import { IIconProps } from "./Iconprops";
import "./Icon.css"

export const Icon = ({ name, ...props }: IIconProps & LucideProps) => {
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideProps>;
  return LucideIcon ? <LucideIcon {...props} /> : null;
};