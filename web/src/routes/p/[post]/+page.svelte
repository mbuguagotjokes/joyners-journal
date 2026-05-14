<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageProps } from './$types';
    import { page } from '$app/state';
    import { getPostContent } from '$lib';
    import { openPopup } from '$lib/stores/popup.svelte';
    import PublishPost from '$lib/components/popup/PublishPost.svelte';

    let { data }: PageProps = $props();
    let html = $state("")

    onMount(async() => {
        let { post } = page.params

        if (post) {
            html = await getPostContent(post)
        }
    })
</script>

<svelte:head>
    <title>Post - J's Journal</title>
</svelte:head>

<div class="published-post">
    {#if html === "Post not found"}
    <div class="post-not-found">
        <h1 style="text-align: center;">Fortunatley or unfortunaley, your post could not be found</h1>
    </div>
    {:else}
    <div class="share">
        <button 
        onclick={() => {
            openPopup(PublishPost, { title: "Share post", slug: page.params.post as string })
        }}>Share Post</button>
    </div>
    <div class="post">
        {@html html}
    </div>
    {/if}
</div>

<style>
    .published-post {
        max-width: 100%;
        width: 100%;
        padding: 16px 0;
        font-size: smaller;
    }

    .post-not-found {
        height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: larger;
        color: var(--main);
    }

    .share {
        padding: 4px 0;
        border-bottom: color-mix(in srgb, var(--black) 20%, var(--white) 80%) solid .5px;
    }


    .post {
        width: 100%;
        max-width: 100%;
    }
</style>