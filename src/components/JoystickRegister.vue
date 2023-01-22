<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'JoystickRegister',
    props: {
        isLeft: Boolean
    }
})
</script>

<template>
    <div class="grid h-screen place-items-center">
        <div
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div :class="'flex mb-5 ' + (isLeft ? '' : 'justify-end')">
                <svg class="w-20 h-20 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="42" height="42">
                    <path
                        d="M20 7h-3V4c0-1.103-.897-2-2-2H9c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2h3v3c0 1.103.897 2 2 2h6c1.103 0 2-.897 2-2v-3h3c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zm0 8h-5v4h.001v1H9v-5H4V9h5V4h6v5h5v6z">
                    </path>
                    <path d="M8 14v-4l-3 2zm8 0 3-2-3-2zm-6-6h4l-2-3zm2 11 2-3h-4z"></path>
                    <circle cx="12" cy="12" r="2"></circle>
                </svg>
            </div>

            <h5 :class="
                'mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white ' +
                (isLeft ? '' : 'text-right')
            ">
                Move {{ isLeft ? 'Left' : 'Right' }} Joystick Forward
            </h5>
            <p :class="
                'mb-3 text-sm font-normal text-gray-500 dark:text-gray-400 ' +
                (isLeft ? '' : 'text-right')
            ">
                Configure {{ isLeft ? 'left' : 'right' }} joystick by making sure that the joystick is
                connected to the pc, then process to move the left joystick forward.
            </p>
        </div>
    </div>
</template>
