import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableEmailButton from "./data-table-email-button.svelte";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
 id: string;
 amount: number;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
};
 
export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: ({ column }) =>
          renderComponent(DataTableEmailButton, {
            onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          }),
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },

    //A column for the Ellipsis buttons which can act as a menu
    // => I think selecting rows with checkbox and right click context menu is better
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //     // You can pass whatever you need from `row.original` to the component
    //     return renderComponent(DataTableActions, { id: row.original.id });
    //     },
    // },

    //A new column for hosting the checkbox
    {
        id: "select",
        header: ({ table }) =>
          renderComponent(Checkbox, {
            checked: table.getIsAllPageRowsSelected(),
            class: "checkbox",
            indeterminate:
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected(),
            onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
            "aria-label": "Select all",
          }),
        cell: ({ row }) =>
          renderComponent(Checkbox, {
            checked: row.getIsSelected(),
            class: "checkbox",
            onCheckedChange: (value) => row.toggleSelected(!!value),
            "aria-label": "Select row",
          }),
        enableSorting: false,
        enableHiding: false,
      },
];