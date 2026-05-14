<script>
    import { closePopup, popupStore } from "$lib/stores/popup.svelte";
    import { fade } from "svelte/transition";
</script>

{#if $popupStore.isOpen}
<div 
class="popup" 
transition:fade
onclick={closePopup}
tabindex="0"
onkeydown={(event) => {
    if (event.key === "Escape") {
        closePopup()
    }
}}
role="button"
aria-label="popup-container"
>
    <section
    role="dialog"
    onclick={(event) => {
        event.stopPropagation()
    }}
    onkeydown={(event) => {
        if (event.key === "Escape") {
            closePopup()
        }
    }}
    tabindex="0"
    >
        <div class="head">
            <h4>{$popupStore.props?.title || "Popup"}</h4>
            <button 
            onclick={closePopup}
            title="close-popup"
            class="icon"
            onkeydown={(event) => {
                if (event.key === "Escape") {
                    closePopup()
                }
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
        <div class="popup-info">
            <svelte:component this={$popupStore.component} {...$popupStore.props}/>
        </div>
    </section>
</div>
{/if}

<style>
    .popup {
        width: 100dvw;
        max-width: 100dvw;
        height: 100dvh;
        box-sizing: border-box;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(1.5px);
        z-index: 1000;
    }

    section {
        display: flex;
        flex-direction: column;
        gap: .5em;
        width: 500px;
        min-width: 0;
        margin: 8px;
        max-width: 500px;
        height: 300px;
        min-height: 0px;
        max-height: 500px;
        background-color: var(--white);
    }

    .head {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: .5em;
        box-shadow: 0 0 0 2px var(--black);
    }

    h4 {
        margin: 0;
        color: var(--main);
    }

    .popup-info {
        max-height: 100%;
        height: 100%;
        overflow-y: auto;
        box-shadow: 0 0 0 2px var(--black);
    }
</style>