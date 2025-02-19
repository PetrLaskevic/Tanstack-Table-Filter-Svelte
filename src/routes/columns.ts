import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableEmailButton from "./data-table-email-button.svelte";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type User = {
    uuid: string;
    createdAt: string;
    username: string;
    email: string;
    elo: number;
    wins: number;
    draws: number;
    losses: number;
};

 
export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "username",
        header: "Uživatelské jméno",
    },
    {
        accessorKey: "email",
        header: ({ column }) =>
          renderComponent(DataTableEmailButton, {
            onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          }),
    },
    {
        accessorKey: "elo",
        header: "ELO",
    },
    {
        accessorKey: "wins",
        header: "Výhry",
    },
    {
        accessorKey: "draws",
        header: "Remízy",
    },
    {
        accessorKey: "losses",
        header: "Prohry",
    },


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