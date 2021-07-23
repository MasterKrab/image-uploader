<script>
  import CopyButton from "./CopyButton.svelte";
  export let imageUrl = "";
</script>

<section class="card">
  <h1 class="card__title">Uploaded Successfully!</h1>
  <img class="card__image" src={imageUrl} alt="" />

  <div class="image-url">
    <p class="image-url__text">{imageUrl}</p>
    <CopyButton {imageUrl} />
  </div>
</section>

<style lang="scss">
  .card {
    background-image: url(../assets/done.svg);
    background-repeat: no-repeat;
    background-position: center 40px;
    background-size: 35px;
    color: var(--text-color);

    &__title {
      margin-top: 50px;
      margin-bottom: 0;
    }

    &__image {
      margin-top: 25px;
      margin-bottom: 25px;
      border-radius: 0.75rem;
    }
  }

  .image-url {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--image-url);
    height: 34px;
    padding: 2px;
    border: 1px solid var(--image-url-border);
    border-radius: 0.5rem;

    &__text {
      max-width: 75%;
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 5px;
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
