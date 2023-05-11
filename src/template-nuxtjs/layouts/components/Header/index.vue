<template>
    <div>
        <div class="header-container bg-gray-400 w-full h-14 shadow-lg flex items-center justify-between text-gray-700/70">
            <div class="header-left ml-5  flex gap-4 items-center  cursor-pointer">
                <div class="i-logos-rollbar-icon text-4xl"></div>
                <p class="text-3xl">LOGOS</p>
            </div>
            <div class="header-right mr-5 ">
                <div class="flex gap-4 cursor-pointer">
                    <div class="i-bell-icon hover:text-gray-700/90">
                        <span class="<sm:hidden">首页</span>
                        <div class="sm:hidden i-logos-vue text-2xl"></div>

                    </div>
                    <div class="i-user-icon hover:text-gray-700/90">
                        <span class="<sm:hidden">次页</span>
                        <div class="sm:hidden i-logos-react text-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>

const store=useStore();
const userIn=store.user.getUserInfo;
console.log('😓userIn:',userIn)
store.user.setuserInfo({name:'张三',age:18})
</script>
