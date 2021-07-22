<section class="loader" role="alert">
  <p class="loader__text">Uploading</p>
  <div class="loader__bar" aria-hidden="true" />
</section>

<style lang="scss">
  @keyframes loading {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(400%);
    }
  }

  .loader {
    background-color: var(--card-bg);
    max-width: 402px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0.75rem;
    text-align: center;
    padding: 2.25rem 2rem;
    margin-left: auto;
    margin-right: auto;
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
</style>
