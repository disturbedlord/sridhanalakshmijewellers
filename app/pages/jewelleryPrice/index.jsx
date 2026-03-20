import { TablePage } from "@kottster/react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
export default () => {
  const currentUrl = window.location.origin;

  // const baseURL = String(currentUrl).indexOf("localhost") > -1 ? "http://localhost:5000" : "https://dljs-backend.onrender.com";

  return (
    <TablePage
      columnOverrides={{
        id: (column) => ({
          ...column,

          fieldInput: {
            type: "custom",
            props: {
              disabled: true, // 🔒 user cannot edit
            },
            renderComponent: ({ value, updateFieldValue }) => {
              useEffect(() => {
                if (!value) {
                  updateFieldValue("id", uuidv4());
                }
              }, []);

              return (
                <div style={{ fontSize: 12, color: "#666" }}>
                  {value ? `${value}` : "Generating..."}
                </div>
              );
            },
          },
        }),
        created_at: (column) => ({
          ...column,
          hidden: true,
        }),
      }}
    />
  );
};
