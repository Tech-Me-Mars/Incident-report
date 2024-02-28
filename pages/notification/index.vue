<template>
    <HeaderMenu class="flex justify-start items-center gap-5">
        <NuxtLink to="/">
            <TmmButtonBackPage />
        </NuxtLink>
        <p class="font-bold text-lg">การแจ้งเตือน</p>
    </HeaderMenu>

    <section class="p-3">
        <PageNotificationNotifydata />
    </section>
</template>