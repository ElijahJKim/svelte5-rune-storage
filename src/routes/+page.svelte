<script>
  import { persistedState } from "../lib/index.svelte";

  const count = persistedState("count", 0);
</script>

<button onclick={() => count.value++}>Click me</button>
<p>Count: {count.value}</p>
