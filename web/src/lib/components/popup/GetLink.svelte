<script lang="ts">
    import { sendLocalNotification } from "$lib/stores/notifications.svelte";
    import { fade } from "svelte/transition";
    
    let { onSetLink, onClose, currentLink = "", onRemoveLink, selectedText }: 
    { 
        onSetLink: (data: { link: string, title?: string }) => void, 
        onClose: () => void, 
        onRemoveLink: () => void, 
        currentLink: string, 
        selectedText?: string
    } = $props()

    let value: string = $state(currentLink)
    // let st: string = $state(selectedText)

    function normalizeLink(value: string): string {
        const v = value.trim()
        if (v.includes('@')) return `mailto:${v}`
        if (v.startsWith('+') || /^\d/.test(v)) return `tel:${v}`
        if (!/^https?:\/\//i.test(v)) return `https://${v}`
        return v
    }
    function checkValidLink() {
        if (value.trim() == "") {
            sendLocalNotification("warning", "Please enter a url")
            return
        }
        onSetLink({ link: normalizeLink(value) })
        onClose()
    }


</script>

<div 
transition:fade
class="gl-root"
>
    <section>
        <button 
        onclick={onClose}
        title="close-popup"
        class="icon"
        type="button"
        onkeydown={(event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
    </section>
    <section>
        <!-- <div class="fe">
            <label for="selected">Selected text</label>
            <input type="text" name="seleceted" id="selected" placeholder="My blog" bind:value={st}>
        </div> -->
        <div class="fe">
            <label for="link">Enter a url, email or phone number (must start with +)</label>
            <input type="text" name="link" id="link" placeholder="https://google.com" bind:value={value}>
        </div>
        <div class="fe">
            <button type="button" onclick={checkValidLink}>Set link!</button>
            {#if currentLink}
                <button type="button" onclick={onRemoveLink}>Remove the link!</button>
            {/if}
        </div>
    </section>
</div>

<style>
    .gl-root {
        width: 100%;
        height: 100vh;

        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(5px);

    }
    
    section {
        width: 500px;
        max-width: 500px;
        min-width: 0px;
        background-color: var(--white);
        box-shadow: 0 0 0 2px var(--black);
    }
    
    section:first-child {
        margin: 5px 0;
        display: flex;
        justify-content: end;
        align-items: center;
    }
</style>