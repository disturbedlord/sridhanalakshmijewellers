import { TablePage } from "@kottster/react";
import { useState } from "react";

export default () => {
  const currentUrl = window.location.origin;

  // const baseURL = String(currentUrl).indexOf("localhost") > -1 ? "http://localhost:5000" : "https://dljs-backend.onrender.com";

  return (
    <TablePage
      columnOverrides={{
        image: (column) => ({
          ...column,

          label: "Product Image",

          // ✅ TABLE VIEW (image preview)
          render: (params) => {
            const baseUrl =
              String(currentUrl).indexOf("localhost") > -1
                ? "http://localhost:5000"
                : "https://dljs-backend.onrender.com";
            const imageValue = params?.image;

            const imageUrl = imageValue
              ? baseUrl + imageValue
              : `${baseUrl}/assets/error.ico`;

            return (
              <a href={imageUrl} target="_blank" rel="noreferrer">
                <img
                  src={imageUrl}
                  alt="product"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                  }}
                  onError={(e) => {
                    e.target.src = `${baseUrl}/assets/error.ico`;
                  }}
                />
              </a>
            );
          },

          fieldInput: {
            type: "custom",
            renderComponent: ({ value, updateFieldValue }) => {
              const baseUrl =
                String(currentUrl).indexOf("localhost") > -1
                  ? "http://localhost:5000"
                  : "https://dljs-backend.onrender.com";
              const [preview, setPreview] = useState(null);

              const handleChange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                // preview
                setPreview(URL.createObjectURL(file));

                // upload to backend
                const formData = new FormData();
                formData.append("file", file);
                console.log(file, formData);
                const res = await fetch(
                  `${baseUrl}/kottster/products/imageUpload`,
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const data = await res.json();

                // save filename in DB
                updateFieldValue("image", data.filename);
              };

              return (
                <div>
                  <input type="file" accept="image/*" onChange={handleChange} />

                  {/* Preview (new file) */}
                  {preview && (
                    <img src={preview} width={80} style={{ marginTop: 10 }} />
                  )}

                  {/* Existing image */}
                  {!preview && value && (
                    <img
                      src={baseUrl + value}
                      width={80}
                      style={{ marginTop: 10 }}
                    />
                  )}
                </div>
              );
            },
          },
        }),
      }}
    />
  );
};
