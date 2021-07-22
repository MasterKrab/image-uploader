<script>
  import { fade } from "svelte/transition";

  export let errorMessage = "";
</script>

{#if errorMessage}
  <p transition:fade={{ duration: 200 }} class="error" role="alert">
    {errorMessage}
  </p>
{/if}

<style lang="scss">
  .error {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 1rem;
    color: var(--error);

    @media screen and(min-width: 350px) {
      font-size: 1.5rem;
    }
  }
</style>
