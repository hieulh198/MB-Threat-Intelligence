import React from "react";

const Section: React.FC<any> = ({ title, children }) => {
  return (
    <section className="mb-4">
      <div className="pb-2 mb-2 border-bottom">{title}</div>
      <div>{children}</div>
    </section>
  );
};

export default Section;
