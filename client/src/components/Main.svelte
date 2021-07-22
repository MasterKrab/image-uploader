<script lang="ts">
  import Upload from "./Upload.svelte";
  import Loader from "./Loader.svelte";
  import Error from "./Error.svelte";

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
    const formData = new FormData(e.detail.form);
    sendFile(formData);
  };

  const handleDrop = (e: CustomEvent) => {
    const file: any = e.detail.dataTransfer.items[0].getAsFile();

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

  let dragover: boolean = false;

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
  <Error {errorMessage} />

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
    <Upload
      on:drop={handleDrop}
      on:draover={handleDragover}
      on:uploadFile={handleChange}
      isDragover={dragover}
    />
  {:else}
    <Loader />
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
