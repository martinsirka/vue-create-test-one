<template>
    <div>
        <slot />
        <div class="pagination-row">
            <span v-for="(item, index) in new Array(10)" :key="index">
                <button class="pagination-button">{{ index + 1 }}</button>
            </span>
            <button class="pagination-button"> &lt; </button> 
            <button class="pagination-button"> &gt; </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .pagination-row {
        display: flex;
        justify-content: end;
        padding: 1.5rem;
    }

    .pagination-button {
        padding: 8px;
        margin: 2px;
        border-radius: 3px;
        font-size: 1em;
        cursor: pointer;
    }
</style>