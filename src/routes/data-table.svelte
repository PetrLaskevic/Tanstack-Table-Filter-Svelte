<script lang="ts" generics="TData, TValue">
import { type ColumnDef, getCoreRowModel, type PaginationState, type SortingState, type ColumnFiltersState, type RowSelectionState, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/table-core";
import { 
    createSvelteTable,
    FlexRender,
} from "$lib/components/ui/data-table/index.js";
import * as Table from "$lib/components/ui/table/index.js";
import { Button } from "$lib/components/ui/button/index.js";
import Input from "$lib/components/ui/input/input.svelte";
import * as Select from "$lib/components/ui/select/index.js";
 
type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    tableReference: any;
    selectedRows: any
};
 
let { data, columns, tableReference = $bindable(), selectedRows = $bindable() }: DataTableProps<TData, TValue> = $props();

let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
let sorting = $state<SortingState>([]);
let columnFilters = $state<ColumnFiltersState>([]);
let rowSelection = $state<RowSelectionState>({});
// $inspect(rowSelection);

// selectedRows = $derived(rowSelection);
$effect(() => {
    selectedRows = rowSelection;
})
 
const table = createSvelteTable({
    get data() {
        return data;
    },
    columns,
    state: {
        get pagination() {
            return pagination;
        },
        get sorting() {
            return sorting;
        },
        get columnFilters() {
            return columnFilters;
        },
        get rowSelection() {
            return rowSelection;
        },
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onPaginationChange: (updater) => {
        if (typeof updater === "function") {
            pagination = updater(pagination);
        } else {
            pagination = updater;
        }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
});

tableReference = table;

function selectThisRowAndUnselectOthers(event, table, row){
    //On right click, we want to select the row if no rows are selected, 
    // but otherwise if there is a selection, we don't want to cancel it
    if(event.type == "contextmenu"){
        row.toggleSelected(true);
        return;
    }

    if (!event.target.closest('.checkbox')) {
        if(!(event.ctrlKey || event.shiftKey)){
             //unselect all rows
            table.toggleAllPageRowsSelected(false);
            //select this row in particular
            row.toggleSelected(true);
        }else{
            //if shift or ctrl is held down, it makes sense to select more rows, the same as checkbox
            row.toggleSelected(!row.getIsSelected());
        }
        
    }
    console.log("jupí");
   
}

let filterValue = $state("email");

const valuesToEN = {
  "Emailu": "email",
  "Uživatelského jména": "username",
  "ELO": "elo",
  "Výher": "wins",
  "Remíz": "draws",
  "Proher": "losses"
};

const valuesToCZ = {
  "email": "Emailu",
  "username": "Uživatelského jména",
  "elo": "ELO",
  "wins": "Výher",
  "draws": "Remíz",
  "losses": "Proher"
};


</script>
<p>{filterValue}</p>
<div>
    <div class="flex items-center py-4">
        <Input
        placeholder="Filtrovat podle..."
        value={(table.getColumn(filterValue).getFilterValue() as string) ?? ""}
        onchange={(e) => {
            table.getColumn(filterValue).setFilterValue(e.currentTarget.value);
        }}
        oninput={(e) => {
            table.getColumn(filterValue).setFilterValue(e.currentTarget.value);
        }}
        class="max-w-sm"
        />
        <!-- () => filterValue, (e) => filterValue = valuesToCZ[e] -->
        <Select.Root type="single" bind:value={filterValue}> 
            <Select.Trigger class="w-[180px]">{valuesToCZ[filterValue]}</Select.Trigger>
            <Select.Content>
              <Select.Item value="email">Emailu</Select.Item>
              <Select.Item value="username">Uživatelského jména</Select.Item>
              <Select.Item value="elo">ELO</Select.Item>
              <Select.Item value="wins">Výher</Select.Item>
              <Select.Item value="draws">Remíz</Select.Item>
              <Select.Item value="losses">Proher</Select.Item>
            </Select.Content>
          </Select.Root>
    </div>
    <div class="rounded-md border">
    <Table.Root>
        <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
            <Table.Row>
            {#each headerGroup.headers as header (header.id)}
                <Table.Head>
                {#if !header.isPlaceholder}
                    <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                    />
                {/if}
                </Table.Head>
            {/each}
            </Table.Row>
        {/each}
        </Table.Header>
        <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
            <Table.Row data-state={row.getIsSelected() && "selected"} onclick={(event) => selectThisRowAndUnselectOthers(event, table, row)} oncontextmenu={(event) => selectThisRowAndUnselectOthers(event, table, row)}>
            {#each row.getVisibleCells() as cell (cell.id)}
                <Table.Cell>
                <FlexRender
                    content={cell.column.columnDef.cell}
                    context={cell.getContext()}
                />
                </Table.Cell>
            {/each}
            </Table.Row>
        {:else}
            <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
                No results.
            </Table.Cell>
            </Table.Row>
        {/each}
        </Table.Body>
    </Table.Root>
    </div>


    <div class="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
  
  

    <div class="flex items-center justify-end space-x-2 py-4">
        <Button
        variant="outline"
        size="sm"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        >
        Previous
        </Button>
        <Button
        variant="outline"
        size="sm"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        >
        Next
        </Button>
    </div>
</div>