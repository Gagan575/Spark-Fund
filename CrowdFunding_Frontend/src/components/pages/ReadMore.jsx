import { useState } from "react";

const ReadMore = ({ text, limit = 80, className = "" }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  return (
    <p className={className}>
      {expanded ? text : text.slice(0, limit)}
      {text.length > limit && (
        <span
          onClick={(e) => {
            e.preventDefault(); // important if inside Link
            e.stopPropagation(); // extra safety
            setExpanded(!expanded);
          }}
          style={{
            color: "rgb(212, 167, 98)",
            cursor: "pointer",
            marginLeft: "5px",
            fontWeight: "500",
          }}
        >
          {expanded ? " Read less" : "... Read more"}
        </span>
      )}
    </p>
  );
};

export default ReadMore;
