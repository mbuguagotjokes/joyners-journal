<script>
    import { clearNotificationX, notifications } from "$lib/stores/notifications.svelte";
    import { fade, slide } from "svelte/transition";
</script>

{#if $notifications}
<div 
class="notifications"
>
    {#each $notifications as notification (notification?.id)}
        <div 
        class="notification {notification?.type}"
        transition:fade
        >
            <span><small>{@html notification?.message}</small></span>
            <button
            title="Close notification"
            class="icon transparent"
            onclick={() => {
                clearNotificationX(notification.id)
            }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    {/each}
</div>
{/if}

<style>
    .notifications {
        position: fixed;
        bottom: 0;
        right: 0;
        z-index: 1001;

        display: flex;
        flex-direction: column;
        align-items: end;
        gap: .5em;

        max-height: 50dvh;
        overflow-y: auto;

        margin: .5em;
        box-sizing: border-box;
    }

    .notification {
        margin: .1em;
        padding: .3em;
        border-radius: 0;
        box-shadow: 0 0 0 1.5 color-mix(in srgb, var(--black) 60%, var(--white) 40%);

        display: flex;
        gap: .5em;
        align-items: start;

        max-width: 300px;
        text-wrap: wrap;
    }

    .notification.info {
        background-color: var(--info);
        color: var(--white);
    }
    .notification.success {
        background-color: var(--success);
        color: var(--white);
    }
    
    .notification.warning {
        background-color: var(--warning);
        color: var(--white);
    }
    .notification.error {
        background-color: var(--error);
        color: var(--white);
    }
</style>