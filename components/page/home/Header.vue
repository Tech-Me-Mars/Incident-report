<template>
    <HeaderMenu class="flex flex-col">
        <div class="flex justify-between mb-4">
            <TmmButton icon="mdi mdi-calendar-month text-lg text-gray-500"
                className="h-[2.5rem] w-[2.5rem] text-center flex items-center justify-center rounded-xl"></TmmButton>
                <a-badge count="2" color="red">
                    <NuxtLink to="/notification">
                <TmmButton icon="mdi mdi mdi-bell text-lg text-gray-500"
                    className="h-[2.5rem] w-[2.5rem] text-center flex items-center justify-center rounded-xl"></TmmButton>
            </NuxtLink>
  </a-badge>
            
        </div>
        <NuxtLink to="/profile">
            <HeaderProfile />
        </NuxtLink>
    </HeaderMenu>
</template>