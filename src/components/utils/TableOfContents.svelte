<script>
    import { onMount, onDestroy } from 'svelte';
    export let headings = [];

    let active = headings[0]?.slug || '';

    function updateActiveHeading() {
        let newActive = active;
        for (let i = headings.length - 1; i >= 0; i--) {
            const el = document.getElementById(headings[i].slug);
            if (el) {
                const { top } = el.getBoundingClientRect();
                if (top <= 80) {
                    newActive = headings[i].slug;
                    break;
                }
            }
        }
        active = newActive;
    }

    function scrollToSlug(slug, event) {
        event.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', `#${slug}`);
        }
    }

    onMount(() => {
        window.addEventListener('scroll', updateActiveHeading);
        updateActiveHeading();
    });

    onDestroy(() => {
        window.removeEventListener('scroll', updateActiveHeading);
    });
</script>

<div class="sticky top-20 max-h-[calc(100vh-5rem)]">
    <h3
        class="text-lg font-semibold mb-4 text-secondary md:text-fourth dark:text-dark-secondary"
    >
        Contenido
    </h3>
    <ul class="space-y-2">
        {#each headings as heading}
            <li>
                <a
                    href={`#${heading.slug}`}
                    on:click={e => scrollToSlug(heading.slug, e)}
                    class={`block transition-all duration-300 ease-in-out ${
                        active === heading.slug
                            ? 'text-primary dark:text-dark-third font-medium translate-x-1 border-l-8 border-primary dark:border-dark-third pl-2'
                            : 'text-secondary md:text-fourth dark:text-dark-five hover:text-blue-400'
                    }`}
                >
                    {heading.text}
                </a>
            </li>
        {/each}
    </ul>
</div>
