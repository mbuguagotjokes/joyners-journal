<script lang="ts">
    import { onMount } from "svelte";
    import QRCodeStyling  from "qr-code-styling"
    import { page } from "$app/state";
    import { sendLocalNotification } from "$lib/stores/notifications.svelte";

    let { slug }: {
        slug: string
    } = $props()

    let qrurl = $state("")

    let link = $state("")

    onMount(async() => {
        let rl = page.url.origin + "/p/" + slug
        try {
            let sl = await fetch("https://stnr.mbuguaaaaaa.xyz/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: rl })
            })

            let response = await sl.json();
            if (sl.ok) {
                link = response.data
                console.log(link)
                const qrCode = new QRCodeStyling({
                    width: 200,
                    height: 200,
                    data: link,
                    dotsOptions: {
                        color: "#02010A",
                        type: "rounded",
                    },
                    backgroundOptions: {
                        color: "#fff",
                    },
                });
        
                // Get Base64
                qrCode.getRawData("svg").then((blob) => {
                    const reader = new FileReader();
        
                    reader.onloadend = () => {
                        const base64 = reader.result;
                        qrurl = base64?.toString() as string
                    };
        
                    reader.readAsDataURL(blob);
                });
            } else {
                sendLocalNotification("warning", "Failed to shorten link, using link as is", 6000)
                link = rl
            }
        } catch (error) {
            sendLocalNotification("warning", "Unable to shorten link, using link as is", 6000)
            link = rl
        }

    })
</script>

{#if link}
    <section class="publish">
        <img src={qrurl} alt="">
        
        <span>{qrurl === "" ? "" : "Scan the QRCode or"} <a href="{link}">click this link!</a></span>
        <button
            type="button"
            onclick={async() => {
                try {
                    await navigator.clipboard.writeText(link)
                    sendLocalNotification("success", "Copied to clipboard succesfully")
                } catch (error) {
                    // Fallback for mobile/http
                    const textarea = document.createElement("textarea");
                    textarea.value = link
                    
                    textarea.style.position = "fixed";
                    textarea.style.left = "-9999px";
                    
                    document.body.appendChild(textarea);
                    
                    textarea.focus();
                    textarea.select();
                    
                    const successful = document.execCommand("copy");
                    
                    document.body.removeChild(textarea);
                    
                    if (!successful) {
                        sendLocalNotification("error", "Failed to copy to clipboard")
                    }
                    sendLocalNotification("success", "Copied to clipboard succesfully")
                }
            }}
        >Copy link</button>
    </section>
{/if}


<style>
    .publish {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
        height: 100%;
    }
</style>