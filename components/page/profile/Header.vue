<template>
  <HeaderMenu class="flex flex-col ">
    <div class="flex gap-5 items-center mb-5">
      <NuxtLink to="/">
        <TmmButtonBackPage />
      </NuxtLink>
      <p class="font-bold text-lg">PROFILE</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <TmmAvatar label="ประยุท" :size="50" src="https://mpics.mgronline.com/pics/Images/565000005465502.JPEG"></TmmAvatar>
      <div class="flex flex-col">
        <p class="font-medium">สวัสดี , พล.ต.ท ยิ่งยศ ใจดี</p>
        <a-tag class="w-[7rem] text-center rounded-full" color="orange">322 Points</a-tag>
      </div>
    </div>
  </HeaderMenu>
</template>