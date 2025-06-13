import {
  ElementType,
  ReactNode,
  ComponentPropsWithRef,
  JSX,
} from "react";
import clsx from "clsx";

// Универсальный тип пропсов для обобщённого компонента
type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & ComponentPropsWithRef<T>;

export function Bounded<T extends ElementType = "section">({
  as,
  className,
  children,
  ...rest
}: BoundedProps<T>): JSX.Element {
  const Component = as || "section";

  return (
    <Component
      {...rest}
      className={clsx(
        "px-6 ~py-10/16 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Component>
  );
}
