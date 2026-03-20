import { TablePage } from "@kottster/react";

export default ({ userRole }) => {
  return (
    <TablePage
      // override row actions
      rowActionOverrides={{
        delete: (action, params) => {
          // params.row, params.user, etc
          return {
            ...action,
            disabled: userRole !== "admin",
            tooltip:
              userRole !== "admin" ? "Only admin can delete" : action.tooltip,
          };
        },
        edit: (action, params) => ({
          ...action,
          disabled: userRole === "viewer",
          tooltip:
            userRole === "viewer" ? "Viewers cannot edit" : action.tooltip,
        }),
      }}
      // override columns
      columnOverrides={{
        status: (column, params) => ({
          ...column,
          visible: userRole === "admin" || userRole === "manager",
        }),
      }}
    />
  );
};
