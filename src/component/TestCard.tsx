import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};
  

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card-wrapper">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
        <div className="px-6 py-4">
          <h1 className="text-xl">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};
