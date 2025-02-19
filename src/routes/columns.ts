import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
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
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },

    {
        id: "actions",
        cell: ({ row }) => {
        // You can pass whatever you need from `row.original` to the component
        return renderComponent(DataTableActions, { id: row.original.id });
        },
    },
];