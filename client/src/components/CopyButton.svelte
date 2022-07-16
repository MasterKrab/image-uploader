<script lang="ts">
  export let imageUrl = "";

  let buttonCopyText: string = "Copy Link";

  const requestClipboardPermisions = async () => {
    const { state } = await navigator.permissions.query({
      name: "clipboard-write" as PermissionName,
    });
    return state == "granted" || state == "prompt";
  };

  const setButtonCopyText = (text: string) => {
    buttonCopyText = text;

    setTimeout(() => {
      buttonCopyText = "Copy Link";
    }, 1500);
  };

  const handleCopyUrl = () => {
    if (requestClipboardPermisions()) {
      navigator.clipboard
        .writeText(imageUrl)
        .then(() => setButtonCopyText("Copied!"))
        .catch(() => setButtonCopyText("Error"));
    } else {
      setButtonCopyText("Error");
    }
  };
</script>

<button
  on:click={handleCopyUrl}
  class="button"
  class:button--error={buttonCopyText === "Error"}>{buttonCopyText}</button
>

<style lang="scss">
  .button {
    font-size: 0.5rem;
    width: 75px;

    &--error {
      border-color: var(--error);
      background-color: var(--error);
    }
  }
</style>
