<script lang="ts">
  import type {
    UploadDropEvent,
    UploadFileEvent,
  } from "../types/upload-events";
  import Error from "./Error.svelte";
  import Result from "./Result.svelte";
  import Upload from "./Upload.svelte";
  import Loader from "./Loader.svelte";

  let loading = false;
  let imageUrl: string;

  let errorMessage: string;

  const showError = (text: string) => {
    errorMessage = text;

    setTimeout(() => {
      errorMessage = "";
    }, 3000);
  };

  interface Data {
    state: false;
    message: string;
    image_url?: string;
  }

  const sendFile = async (formData: FormData) => {
    try {
      loading = true;
      const response = await fetch(
        "https://image-uploader-backend-234.herokuapp.com/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data: Data = await response.json();

      loading = false;

      if (data.state) imageUrl = data.image_url;
      else showError(data.message);
    } catch (error) {
      loading = false;
      showError("An error has ocurred");
      console.log(error);
    }
  };

  const handleChange = (e: CustomEvent<UploadFileEvent>) => {
    const formData = new FormData(e.detail.form);
    sendFile(formData);
  };

  const handleDrop = (e: CustomEvent<UploadDropEvent>) => {
    const file = e.detail.dataTransfer.items[0].getAsFile();

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
</script>

<main>
  <Error {errorMessage} />

  {#if imageUrl}
    <Result {imageUrl} />
  {:else if !loading}
    <Upload on:drop={handleDrop} on:uploadFile={handleChange} />
  {:else}
    <Loader />
  {/if}
</main>

<style lang="scss">
  main {
    width: 100%;
    margin-top: auto;
  }
</style>
