<script lang="ts">
    let about = ""
</script>

<svelte:head>
    <title>About - J's Journal</title>
</svelte:head>

<div class="about">
    <h1>About <span style="color: var(--main);">Joyner's Journal</span></h1>
    <p>
        Hi, <a href="http://mbuguaaaaaa.xyz/" target="_blank" rel="noopener noreferrer">Calvin</a> here. First of all i would like to thank you for taking an intrest in this project.
    </p>
    <small>For non-technical people, there is a glossary at the end of this description</small>
    <h3>The history of J's Journal</h3>
    <p>
        Ok, so what's the story here? At first i wanted to create some social network for debates and stuff (can't really put it into words) called Fabula as part of my final CS50 <sup>1</sup>
        project using flask <sup>2</sup> and raw HTML CSS and JS <sup>3</sup> and templating using Jinja2 of course but it proved hard to create something i had no idea of, so i put it to the side for a while 
        then i had the idea to create a private journal of some sorts that borrowed some things from Fabula and that is when i created the first ever version of this using the same frameworks and languages 
        hosted on Vercel hobby and supabase. It was good and crude, but good none the less considerign i spent three days on the project from start to finish. Thing is, it had no markdown/richtext functionality 
        (ability to add headers and links and images) so i started looking into how i am to do that, long story short, using flask proved to be slow in a way and though the codebase as not something massive, i realised
        if this thing needed to scale (which it didn't and it doesn't but who knows), i would have to write a lot of code and stuff and there is where i discovered Svelte and SvelteKit and i started working on this there 
        and i did two versions that look nothing like this, one using flask as the backend and the other using sveltekit (where libsql was the database) but i deleted them as they were trying too much. I later wanted for it to be 
        like an encrypted wallet for your journal entries by creating a desktop app using Golang and wails libsql being the database but that idea never matured really, don't know why and thats how we are here.
    </p>
    <h3>But how have we reached here and what is this website</h3>
    <p>
        Well, how this website works is that you go to the home page, write what you are writing and share to anyone you would like to without needing to login anywhere. I took great inspo from <a href="http://txt.fyi" target="_blank" rel="noopener noreferrer">txt.fyi</a> 
        where the idea is almost the same but the implimentation might differ as my database is the url itself meaning that your data is not stored on any servers where the closest thing to storage is your browser's history, meaning that this page here as you see it can be
         recreated in the editor producing the same results. <a href="./">Click me to see</a>. Though this website is crude, i will try my best 
        to make sure that you get the best expirience possible out of this project. If there is any issue, please visit my <a href="http://mbuguaaaaaa.xyz/contact?message=i have an issue with..." target="_blank" rel="noopener noreferrer">website</a> or <a href="mailto:calvinmbuguam@gmail.com">email(most likely email)</a> and thanks again for visiting
    </p>
</div>
<div class="glossary">
    <h3>Glossary</h3>
    <p>
        <small>
        1 - CS50, an into to <a href="http://cs50.harvard.edu/x/" target="_blank" rel="noopener noreferrer">computer science and programing course</a> by Harvard taught by <a href="https://cs.harvard.edu/malan/" target="_blank" rel="noopener noreferrer">David J. Malan</a>
        </small>
    </p>
    <p>
        <small>
        2 - Flask, a framework that is used to create websites and or api's using python 
        </small>
    </p>
    <p>
        <small>
        3 - HTML CSS JS, HTML (HyperText Markup Language) is the standard markup language used to structure, organize, and display content—such as text, images, and links—on a webpage, css is used to style that page and js is used to provide interactivity. 
        </small>
    </p>
</div>