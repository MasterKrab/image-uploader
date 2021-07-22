<script lang="ts">
  import { fade } from "svelte/transition";

  let loading: boolean = false;
  let imageUrl: string;

  let errorMessage: string;

  const showError = (text: string) => {
    errorMessage = text;

    setTimeout(() => {
      errorMessage = "";
    }, 3000);
  };

  const sendFile = async (formData: any) => {
    try {
      loading = true;
      const data = await fetch(
        "https://image-uploader-backend-234.herokuapp.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await data.json();
      console.log(res);

      loading = false;

      if (res.state) imageUrl = res.image_url;
      else showError(res.message);
    } catch (error) {
      loading = false;
      showError("An error has ocurred");
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const form = e.target.classList.contains("form")
      ? e.target
      : e.target.parentElement;
    const formData = new FormData(form);
    sendFile(formData);
  };

  const handleDrop = (e: DragEvent) => {
    const file: any = e.dataTransfer.items[0].getAsFile();

    if (file.size > 2000000)
      return showError("File size must not be larger than 2mb");

    const regex = /jpeg|jpg|png|gif/;

    if (regex.test(file.type)) {
      const formData = new FormData();
      formData.append("image", file);
      sendFile(formData);
    } else {
      showError("File must ve a valid image");
    }
  };

  let dragover = false;

  const handleDragover = () => (dragover = true);

  const handleDragleave = () => (dragover = false);

  let buttonCopyText: string = "Copy Link";

  const requestClipboardPermisions = async () => {
    const { state } = await navigator.permissions.query({
      name: "clipboard-write",
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

<main>
  {#if errorMessage}
    <p transition:fade={{ duration: 200 }} class="error" role="alert">
      {errorMessage}
    </p>
  {/if}

  {#if imageUrl}
    <section class="result">
      <h1 class="result__title">Uploaded Successfully!</h1>
      <img class="result__image" src={imageUrl} alt="" />

      <div class="image-url">
        <p class="image-url__text">{imageUrl}</p>
        <button
          on:click={handleCopyUrl}
          class="image-url__button"
          class:image-url__button--error={buttonCopyText === "Error"}
          >{buttonCopyText}</button
        >
      </div>
    </section>
  {:else if !loading}
    <section class="card">
      <h1 class="title">Upload your image</h1>
      <h2 class="subtitle">File should be Jpeg, Png,...</h2>

      <div
        on:drop|preventDefault={handleDrop}
        on:dragover|preventDefault={handleDragover}
        on:dragleave|preventDefault={handleDragleave}
        class="drop-zone"
        class:drop-zone--dragover={dragover}
      >
        <p class="drop-zone__text">Drag & Drop your image here</p>
      </div>

      <p class="separator">or</p>

      <form on:change|preventDefault={handleChange} class="form">
        <label class="form__label" for="file"> Choose a file </label>
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/jpg, image/png, image/gif"
          id="file"
          class="form__input"
        />
      </form>
    </section>
  {:else}
    <section class="loader" role="alert">
      <p class="loader__text">Uploading</p>
      <div class="loader__bar" aria-hidden="true" />
    </section>
  {/if}
</main>

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

  main {
    width: 100%;
    margin-top: auto;
  }

  h1 {
    color: var(--text-color);
    font-size: 1.125rem;
  }

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

  .card,
  .loader,
  .result {
    background-color: var(--card-bg);
    max-width: 402px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
    text-align: center;
    padding: 2.25rem 2rem;
    margin-left: auto;
    margin-right: auto;
  }

  .card {
    min-height: 469px;
  }

  .title {
    margin-top: 16px;
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

  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(400%);
    }
  }

  .loader {
    text-align: left;

    &__text {
      margin-top: 0;
      margin-bottom: 30xp;
    }

    &__bar {
      position: relative;
      background-color: var(--bar-color);
      overflow-x: hidden;

      &,
      &::before {
        height: 6px;
        border-radius: 8px;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--element-color);
        width: 100.93px;
        animation: loading 2s ease infinite;
      }
    }
  }

  .result {
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

    &__button {
      @extend %button;
      font-size: 0.5rem;
      width: 75px;

      &--error {
        border-color: var(--error);
        background-color: var(--error);
      }
    }
  }
</style>
