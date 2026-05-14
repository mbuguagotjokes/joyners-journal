<script lang="ts">
    import { getPostContent, getPostSlug } from "$lib";
    import Editor from "$lib/components/Editor.svelte";
    import PublishPost from "$lib/components/popup/PublishPost.svelte";
    import { openPopup } from "$lib/stores/popup.svelte";
    import { onMount } from "svelte";

    let content = $state("")

    onMount(() => {

    })
</script>

<div class="home">
    <section class="ab">
        <p>Just start writing things, once your done hit publish.</p>
    </section>
    <section class="e">
        <Editor
        getContent={(output: string) => {
            content = output
        }}
        />
        <button
        onclick={() => {
            openPopup(PublishPost, { title: "Publish Post", slug: getPostSlug(content) })
        }}
        >Publish works</button>
    </section>
    <section class="publish">
    </section>
</div>

<style>
    .home {
        min-height: fit-content;
        padding: 16px 0;
        display: grid;
        grid-template-rows: min-content 1fr min-content;
    }

    .e {
        height: fit-content;
        max-width: 100%;
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .publish {
        width: 100%;
    }
</style>