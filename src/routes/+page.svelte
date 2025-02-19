	
<script lang="ts">
  import DataTable from "./data-table.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { columns } from "./columns.js";
 
//   let { data } = $props();




    type Payment = {
        id: string;
        amount: number;
        status: "pending" | "processing" | "success" | "failed";
        email: string;
    };
 
  let data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com"
    }
  ];
</script>
 

<ContextMenu.Root>
    <ContextMenu.Trigger><DataTable {data} {columns} /></ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item>Profile</ContextMenu.Item>
      <ContextMenu.Item>Billing</ContextMenu.Item>
      <ContextMenu.Item>Team</ContextMenu.Item>
      <ContextMenu.Item>Subscription</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Root>

