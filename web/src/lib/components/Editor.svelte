<script lang="ts">
    import { onMount } from "svelte";
    import Loading from "./Loading.svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import Highlight from "@tiptap/extension-highlight";
    import TextAlign from "@tiptap/extension-text-align";
    import DragHandle from "@tiptap/extension-drag-handle";
    import { Focus } from '@tiptap/extensions'
    import { Markdown } from '@tiptap/markdown'
    import Image from "@tiptap/extension-image";
    import GetLink from "./popup/GetLink.svelte";
    // import UploadIV from "./popup/UploadIV.svelte";

    let { content, getContent }: {
        content?: string, getContent: (output: string) => void
    } = $props()

    let e = $state<HTMLElement>()
    let draggable = $state<HTMLElement>()

    let editor: Editor | null  = $state(null);

    onMount(async () => {
        editor = new Editor({
            element: e,
            extensions: [
                StarterKit.configure({
                    link: {
                        autolink: false,
                    }
                }), 
                Highlight,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                    defaultAlignment: 'justify',
                }),
                DragHandle.configure({
                    render: () => { 
                        return draggable!
                    },
                    computePositionConfig: {
                        placement: 'left',
                        strategy: 'fixed',
                    },
                }), 
                Image.configure({
                    resize: {
                        enabled: true,
                        directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
                        minWidth: 50,
                        minHeight: 50,
                        alwaysPreserveAspectRatio: true,
                    }
                }),
                Focus,
                Markdown
            ],
            content: content || `riddle me this....`,
            autofocus: true,
            editable: true,
            injectCSS: false,
            onUpdate: ({ editor }) => {
                getContent(editor.getMarkdown())
            },
            editorProps: {
                attributes: {
                    class: "ed"
                }
            },
        })
    })

    let openGetLink = $state(false)
    let currentLink = $state("")

    function getLink() {
        openGetLink = true
        currentLink = editor?.getAttributes('link').href
    }

    // let openUploadImage = $state(false)
    let drg = $state(false)
    // let selectedText = $state<string>("")
    onMount(() => {
        if (editor) {
            getContent(editor.getMarkdown())
        }
    })

</script>

{#if openGetLink}
<GetLink 
// selectedText={selectedText}
currentLink={currentLink}
onClose={() => {
    openGetLink = false
}}
onSetLink={(data) => {
    console.log(data)
    editor?.chain()?.setLink({ href: data.link, target: "_blank" }).run()
}} 
onRemoveLink={() => {
    editor?.chain()?.unsetLink()?.run()
    openGetLink = false
}}
/>
{/if}

<!-- {#if openUploadImage}
<UploadIV
onClose={() => {
    openUploadImage = false
}}

onSubmit={({ src, title }) => {
    editor?.commands.setImage({
        src,
        alt: title || "",
        title: title || ""
    })
}}
/>
{/if} -->

<button 
class="hd icon transparent"
bind:this={draggable}
aria-label="Draggable"
>
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 256 256"><path d="M104,60A12,12,0,1,1,92,48,12,12,0,0,1,104,60Zm60,12a12,12,0,1,0-12-12A12,12,0,0,0,164,72ZM92,116a12,12,0,1,0,12,12A12,12,0,0,0,92,116Zm72,0a12,12,0,1,0,12,12A12,12,0,0,0,164,116ZM92,184a12,12,0,1,0,12,12A12,12,0,0,0,92,184Zm72,0a12,12,0,1,0,12,12A12,12,0,0,0,164,184Z"></path></svg>
</button>


<div class="root">
    {#if editor == null}
    <Loading message="Please wait as the editor loads" />
    {:else}
    <div class="controls">
        <div class="nodes">
            <button 
            type="button"
            class="icon transparent {editor.isActive("paragraph") ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.focus()?.setParagraph().run()
            }}
            aria-label="Paragraph"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M208,40H96a64,64,0,0,0,0,128h40v40a8,8,0,0,0,16,0V56h24V208a8,8,0,0,0,16,0V56h16a8,8,0,0,0,0-16ZM136,152H96a48,48,0,0,1,0-96h40Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("heading", { level: 1 }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.focus()?.toggleHeading({ level: 1 }).run()
            }}
            aria-label="H1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm75.77,49a8,8,0,0,0-8.21.39l-24,16a8,8,0,1,0,8.88,13.32L216,127V208a8,8,0,0,0,16,0V112A8,8,0,0,0,227.77,105Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("heading", { level: 2 }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.focus()?.toggleHeading({ level: 2 }).run()
            }}
            aria-label="H2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm88,144H208l33.55-44.74a32,32,0,1,0-55.73-29.93,8,8,0,1,0,15.08,5.34,16.28,16.28,0,0,1,2.32-4.3,16,16,0,1,1,25.54,19.27L185.6,203.2A8,8,0,0,0,192,216h48a8,8,0,0,0,0-16Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("heading", { level: 3 }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.focus()?.toggleHeading({ level: 3 }).run()
            }}
            aria-label="H3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M152,56V176a8,8,0,0,1-16,0V124H48v52a8,8,0,0,1-16,0V56a8,8,0,0,1,16,0v52h88V56a8,8,0,0,1,16,0Zm73.52,90.63,21-30A8,8,0,0,0,240,104H192a8,8,0,0,0,0,16h32.63l-19.18,27.41A8,8,0,0,0,212,160a20,20,0,1,1-14.29,34,8,8,0,1,0-11.42,11.19A36,36,0,0,0,248,180,36.07,36.07,0,0,0,225.52,146.63Z"></path></svg>
            </button>
        </div>
        <div class="marks">
            <button
            type="button"
            class="icon transparent {editor.isActive("bold") ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setBold().run()
            }}
            aria-label="Bolden Text"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M178.48,115.7A44,44,0,0,0,148,40H80a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8h80a48,48,0,0,0,18.48-92.3ZM88,56h60a28,28,0,0,1,0,56H88Zm72,136H88V128h72a32,32,0,0,1,0,64Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("italics") ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setItalic()?.run()
            }}
            aria-label="Italisize Text"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 256 256"><path d="M200,56a8,8,0,0,1-8,8H157.77L115.1,192H144a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16H98.23L140.9,64H112a8,8,0,0,1,0-16h80A8,8,0,0,1,200,56Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("italic") ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setUnderline()?.run()
            }}
            aria-label="Underline Text"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M200,224a8,8,0,0,1-8,8H64a8,8,0,0,1,0-16H192A8,8,0,0,1,200,224Zm-72-24a64.07,64.07,0,0,0,64-64V56a8,8,0,0,0-16,0v80a48,48,0,0,1-96,0V56a8,8,0,0,0-16,0v80A64.07,64.07,0,0,0,128,200Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive("italic") ? "is-active" : ""}"
            onclick={getLink}
            aria-label="Add Link"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"></path></svg>
            </button>
            <!-- <button 
            // type="button"
            // class="icon transparent {editor.isActive("highlight") ? "is-active" : ""}"
            // onclick={() => { editor?.chain()?.toggleHighlight({ color: '#ffcc00' })?.run() }}
            // aria-label="Highlight"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M253.66,106.34a8,8,0,0,0-11.32,0L192,156.69,107.31,72l50.35-50.34a8,8,0,1,0-11.32-11.32L96,60.69A16,16,0,0,0,93.18,79.5L72,100.69a16,16,0,0,0,0,22.62L76.69,128,18.34,186.34a8,8,0,0,0,3.13,13.25l72,24A7.88,7.88,0,0,0,96,224a8,8,0,0,0,5.66-2.34L136,187.31l4.69,4.69a16,16,0,0,0,22.62,0l21.19-21.18A16,16,0,0,0,203.31,168l50.35-50.34A8,8,0,0,0,253.66,106.34ZM93.84,206.85l-55-18.35L88,139.31,124.69,176ZM152,180.69,83.31,112,104,91.31,172.69,160Z"></path></svg>
            </button> -->
        </div>
        <div class="align">
            <button 
            type="button"
            class="icon transparent {editor.isActive({ textAlign: "left" }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setTextAlign('left').run()
            }}
            aria-label="Align Left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,48H168a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm176,24H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm-48,40H40a8,8,0,0,0,0,16H168a8,8,0,0,0,0-16Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive({ textAlign: "center" }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setTextAlign('center').run()
            }}
            aria-label="Align Center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64ZM64,96a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16Zm152,40H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm-24,40H64a8,8,0,0,0,0,16H192a8,8,0,0,0,0-16Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive({ textAlign: "right" }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setTextAlign('right').run()
            }}
            aria-label="Align Right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64ZM216,96H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,40H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,40H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
            </button>
            <button 
            type="button"
            class="icon transparent {editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}"
            onclick={() => {
                editor?.chain()?.setTextAlign('justify').run()
            }}
            aria-label="Align Justify"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64ZM216,96H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,40H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,40H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
            </button>
        </div>
        <div class="o">
            <!-- <button 
            type="button"
            class="icon transparent {editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}"
            onclick={() => {
                openUploadImage = true
            }}
            aria-label="Upload Image"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136ZM85.66,77.66,120,43.31V128a8,8,0,0,0,16,0V43.31l34.34,34.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,77.66ZM200,168a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"></path></svg>
            </button> -->

        </div>
    </div>
    {/if}
    <div
    class="editor"
    bind:this={e}
    tabindex="0"
    role="dialog"
    onmouseenter={() => {
        draggable?.classList.remove("hd")
        draggable?.classList.remove("dragable")
    }}
    // onmousemove={() => {
    //     if (editor) {
    //         let { from, to } = editor?.state.selection
    //         selectedText = editor?.state.doc.textBetween(from, to, ' ');
    //     }
    // }}
    onmouseleave={() => {
        draggable?.classList.remove("dragable")
        draggable?.classList.remove("hd")
    }}
    >

    </div>
</div>

<style>
    .editor {
        width: 100%;
    }

    .hd {
        display: none;
    }

    :global(.dragable) {
        display: flex;
    }

    .root {
        /* padding: 12px; */
        display: flex;
        flex-direction: column;
        gap: 0;
        height: fit-content;
        /* max-height: 100%; */
        width: 100%;
        max-width: 100%;
        min-width: 0;
    }
    
    .root > div {
        box-shadow: 0 0 0 2px var(--black);
    }
    
    .controls  {
        display: flex;
        height: fit-content;
        width: 100%;
        gap: 12px;
        /* margin: 5px 0; */
    }
    
    .controls > * {
        display: flex;
    }

    .editor {
        margin: 0;
        max-width: 100%;
        width: 100%;
        height: 50vh;
        max-height: 70vh;
        overflow-y: auto;
        scrollbar-width: thin;
        margin: 5px 0;
    }

    :global(.ed) {
        padding: 3px;
        height: 100%;
        max-height: 70vh;
        max-width: 100%;
        width: 100%;
    }

    :global(.ed > *) {
        max-width: 100%;
        width: 100%;
    }

    :global(.ed:focus-visible, .ed:focus) {
        outline: none;
        padding: 3px;
    }
</style>