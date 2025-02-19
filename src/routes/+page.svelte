	
<script lang="ts">
  import DataTable from "./data-table.svelte";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { columns } from "./columns.js";
 
//   let { data } = $props();




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
 
  let data: User[] = $state([
    {
        "uuid": "67fda282-2bca-41ef-9caf-039cc5c8dd69",
        "createdAt": "2025-02-19T19:20:38.069Z",
        "username": "User123",
        "email": "email@example.com",
        "elo": 400,
        "wins": 0,
        "draws": 0,
        "losses": 0
    },
    {
        "uuid": "67tzj852-2bca-41ef-9caf-039cc5c8dd69",
        "createdAt": "2025-02-19T19:20:38.069Z",
        "username": "DragonSlayer69",
        "email": "epic@example.com",
        "elo": 400,
        "wins": 0,
        "draws": 0,
        "losses": 0
    },
    {
        "uuid": "89wer182-2b5a-41ef-9cgwgreaddgergd69",
        "createdAt": "2025-02-19T19:20:38.069Z",
        "username": "User456",
        "email": "piskvorky@example.com",
        "elo": 400,
        "wins": 0,
        "draws": 0,
        "losses": 0
    },
    {
        "uuid": "89wer182-2b5a-41ef-9cg547g6ergergd69",
        "createdAt": "2025-02-19T19:20:38.069Z",
        "username": "Thermos",
        "email": "text@example.com",
        "elo": 6969,
        "wins": 0,
        "draws": 0,
        "losses": 0
    },
    {
        "uuid": "89wer182-2b5a-41ef-9cg547g6ergergd69",
        "createdAt": "2025-02-19T19:20:38.069Z",
        "username": "GreatestPlayerAlive",
        "email": "greatest.player.alive@example.com",
        "elo": 700,
        "wins": 0,
        "draws": 0,
        "losses": 0
    },
  ]);

  //as these two variables are not used in any templating, I believe the warnings are not relevant
  let table: any; //reference to the table, not supposed to be reactive
  let selected: { //bound state from the table (there is an $effect inside updating this) = it is reactive although svelte complains
    property: true
  }

  let deletedUsersToBeSentToServer = [];

  function deleteUsers(){
    console.log("delete", $state.snapshot(selected));

    let rows = new Set(Object.keys(selected).map(Number));

    // data = data.filter((value, index) => !rows.has(index))

    //To build deletedUsersToBeSentToServer either traverse array twice with 2 filter calls
    deletedUsersToBeSentToServer = data
        .filter((_, index) => rows.has(index))
        .map(user => user.uuid);
    
    data = data.filter((_, index) => !rows.has(index));
    //Or do it with a for loop
 
    console.log(deletedUsersToBeSentToServer, $state.snapshot(data));
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

