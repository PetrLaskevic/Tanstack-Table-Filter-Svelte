	
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
 
  let data: Payment[] = $state([
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
  ]);

  //as these two variables are not used in any templating, I believe the warnings are not relevant
  let table: any; //reference to the table, not supposed to be reactive
  let selected: { //bound state from the table (there is an $effect inside updating this) = it is reactive although svelte complains
    property: true
  }

  function deleteUsers(){
    console.log("delete", $state.snapshot(selected));

    let rows = new Set(Object.keys(selected).map(Number));
    let newData : Array<number> = []
    // for(let rowIndex of Object.keys(selected)){
    //     //yes, terrible time complexity, this is just for demo
    //     data.splice(Number(rowIndex), 1);
    // }
    console.log("data before", $state.snapshot(data), rows);
    data = data.filter((value, index) => !rows.has(index))
    console.log("data after", $state.snapshot(data));
    table.toggleAllPageRowsSelected(false);
  }
  
</script>
 

<ContextMenu.Root>
    <ContextMenu.Trigger><DataTable bind:tableReference={table} bind:selectedRows={selected} {data} {columns} /></ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item onclick={deleteUsers}>Smazat</ContextMenu.Item>
      <ContextMenu.Item>Editovat</ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Root>

