````markdown
# svelte5-rune-storage

**local storage persistence library for Svelte 5 Runes.**

`svelte5-rune-storage` allows you to manage local storage as if it were a regular variable (`$state`). It provides SSR safety, automatic JSON serialization, and real-time cross-tab synchronization out of the box with just one line of code.

## Key Features

- **Rune-native:** Built specifically for Svelte 5. No more `$store` syntax—use it like a standard reactive variable.
- **SSR Safe:** Fully compatible with SvelteKit and other SSR environments. No more `localStorage is not defined` errors.
- **Auto-Sync:** Keeps your data in sync across multiple browser tabs/windows automatically.
- **Deep Reactivity:** Automatically detects and persists changes within nested objects and arrays.
- **Type Safety:** Full TypeScript support with generics for a seamless developer experience and auto-completion.
- **Robust Error Handling:** Designed to prevent app crashes from corrupted JSON data or storage quota limits.

## Installation

```bash
npm install svelte5-rune-storage
```
````

## Usage

### Basic Usage (Strings, Numbers, etc.)

```svelte
<script lang="ts">
  import { PersistedState } from 'svelte5-rune-storage';

  // Key: 'user-name', Default Value: 'Elijah'
  const user = new PersistedState('user-name', 'Elijah');
</script>

<input bind:value={user.value} />
<p>Hello, {user.value}!</p>
```

### Managing Objects & Arrays (Deep Reactivity)

```svelte
<script lang="ts">
  import { PersistedState } from '@ejkx/rune-storage';

  const settings = new PersistedState('app-settings', {
    theme: 'light',
    fontSize: 16
  });
</script>

<button onclick={() => settings.value.theme = 'dark'}>
  Switch to Dark Mode
</button>
```

### Resetting State

```javascript
// Removes the key from local storage and reverts to initial value.
settings.reset();
```

## License

MIT License © [Elijah Kim](https://github.com/elijah-kim)
