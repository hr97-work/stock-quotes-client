<template>
    <div class="loader"></div>
</template>
<style>
.loader {
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 50%;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}
</style>