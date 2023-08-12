import React from "react";
const Text = ({
  children,
  fontWeight,
  fontSize,
  color,
  marginBottom,
  marginRight,
  marginLeft,
  textAlign,
}) => {
  // Note: the suggested way to do this is using styled-component
  return (
    <div
      style={{
        fontWeight: `${fontWeight}`,
        fontSize: `${fontSize}`,
        color: `${color}`,
        textAlign: `${textAlign}`,
        marginBottom: `${marginBottom}`,
        marginRight: `${marginRight}`,
        marginLeft: `${marginLeft}`,
      }}
    >
      {children}
    </div>
  );
};

export default Text;
