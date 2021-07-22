<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const handleDrop = ({ dataTransfer }) => dispatch("drop", { dataTransfer });
  const handleDragover = () => dispatch("dragover");
  const handleDragleave = () => dispatch("dragleave");
  const handleChange = (event: any) =>
    dispatch("uploadFile", { form: event.target.parentElement });

  export let isDragover: boolean;
</script>

<section class="card">
  <h1 class="title">Upload your image</h1>
  <h2 class="subtitle">File should be Jpeg, Png,...</h2>

  <div
    on:drop|preventDefault={handleDrop}
    on:dragover|preventDefault={handleDragover}
    on:dragleave|preventDefault={handleDragleave}
    class="drop-zone"
    class:drop-zone--dragover={isDragover}
  >
    <p class="drop-zone__text">Drag & Drop your image here</p>
  </div>

  <p class="separator">or</p>

  <form class="form">
    <label class="form__label" for="file"> Choose a file </label>
    <input
      on:change={handleChange}
      type="file"
      name="image"
      accept="image/jpeg, image/jpg, image/png, image/gif"
      id="file"
      class="form__input"
    />
  </form>
</section>

<style lang="scss">
  %button {
    background-color: var(--element-color);
    padding: 0.5rem 1rem;
    border: 1px solid var(--element-color);
    border-radius: 0.5rem;
    color: #fff;
    transition: background-color 0.25s, color 0.25s;
    cursor: pointer;

    @media screen and(min-width: 768px) {
      &:hover {
        background-color: #fff;
        color: var(--element-color);
      }
    }
  }

  .card {
    background-color: var(--card-bg);
    max-width: 402px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
    text-align: center;
    padding: 2.25rem 2rem;
    margin-left: auto;
    margin-right: auto;
    min-height: 469px;
  }
  .title {
    margin-top: 16px;
    color: var(--text-color);
    font-size: 1.125rem;
  }

  .subtitle {
    font-size: 0.625rem;
    color: var(--text-light);
  }

  .drop-zone {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-image: url(../assets/image.svg);
    background-repeat: no-repeat;
    background-position: center 35px;
    background-color: var(--drop-zone-bg);
    height: 218.9px;
    margin-top: 29px;
    margin-bottom: 19px;
    border: 1px dashed var(--element-color);
    border-radius: 0.75rem;
    font-size: 0.75rem;
    transition: background-color 0.25s;

    &--dragover {
      background-color: var(--drop-zone-bg-hover);
    }

    &__text {
      color: var(--text-light-2);
      margin-bottom: 40px;
    }
  }

  .separator {
    margin-bottom: 22px;
    color: var(--text-light-2);
  }

  .form {
    &__input {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    &__label {
      @extend %button;
    }
  }
</style>
