<script>
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, children, ...restProps } = $props();
	console.log($state.snapshot(restProps))
</script>

<tr
	bind:this={ref}
	class={cn(
		"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
		className
	)}
	{...restProps}

>
	{@render children?.()}
</tr>


<!-- <tr
	bind:this={ref}
	class={cn(
		"hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
		className
	)}
	{...restProps}

	onclick={() => alert("Hurá")}
>
	{@render children?.()}
</tr> -->
