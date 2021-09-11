import React from "react";
import AdCard from "./AdCard";

const AdDetails = () => {
  const Mailto = ({ email, subject, body, ...props }) => {
    return (
      <a href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}>
        {props.children}
      </a>
    );
  };

  return (
    <div>
      Ad details
      <AdCard />
      <Mailto email="test@test.se" subject="Hello" body="Hello world!">
        Contact
      </Mailto>
    </div>
  );
};

export default AdDetails;

// const Mailto = ({ email, subject = "", body = "", children }) => {
//   let params = subject || body ? "?" : "";
//   if (subject) params += `subject=${encodeURIComponent(subject)}`;
//   if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

//   return <a href={`mailto:${email}${params}`}>{children}</a>;
