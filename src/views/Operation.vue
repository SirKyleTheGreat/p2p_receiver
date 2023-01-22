<script lang="ts">
import { defineComponent } from 'vue'
import Toast from '../utils/toastify'
import * as mqtt from "mqtt"
import { Peer, DataConnection } from "peerjs"

export default defineComponent({
  data() {
    return {
      // Peer WebRTC RELATED
      peer: undefined as Peer | undefined,
      conn: undefined as DataConnection | undefined,
      time: 0,
      // GAMEPAD RELATED
      joystick: {
        left: { axes: [0, 1] },
        right: { axes: [0, 1] }
      },
      pedal: []
    }
  },
  created() {
    // Peer WebRTC
    this.initPeerId();
    this.connectToPeer();
    // RUN CONTROLLER
    requestAnimationFrame(this.process)
  },
  methods: {
    // MQTT RELATED
    initPeerId() {
      this.peer = new Peer("peer-b", {
        host: "msi",
        port: 9000,
        key: "AWDSJILK",
        secure: false,
        path: "/",
      });
      // this.peer = new Peer("peer-b")
      this.peer.on("open", function (id) {
        Toast.makeToast("My peer ID is: " + id);
      });
    },

    connectToPeer() {
      this.peer?.on("connection", (conn) => {
        this.conn = conn;

        conn.on("data", (data) => {
          // Will print 'hi!'
          // this.conn?.send(data);
          const jsonMessage = JSON.parse(data as string);
          // console.log(jsonMessage)
          this.joystick.left.axes = jsonMessage.leftJoystick
          this.joystick.right.axes = jsonMessage.rightJoystick
          this.pedal = jsonMessage.pedal
          this.time = new Date().getTime() - jsonMessage.timestamp
        });

        this.conn?.on("open", () => {
          this.conn?.send("Offer Accepted");
        });
      });
    },


    process() {
      // navigator.getGamepads().forEach((gamepad) => this.processController(gamepad))
      requestAnimationFrame(this.process)
    },
  }
})
</script>

<template>
  <div class="absolute left-0 top-0 text-white p-2 bg-gray-800 rounded-br-md">
    <p>Latency: {{ time }} ms</p>
  </div>
  <div class="relative">
    <div class="grid grid-rows-4 grid-cols-6 gap-1 h-screen place-items-center">
      <div class="row-start-1 row-span-2 col-span-2">
        <div
          class="text-center text-white max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p class="text-1xl">Left Joystick</p>
          <div class="joystick__box">
            <svg style="width: 100%; height: 100%; position: absolute; z-index: 1">
              <g transform="translate(70 70) scale(0.8, 0.8)">
                <circle cx="0" cy="0" r="78.5" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></circle>
                <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="0" y1="0" :x2="joystick.left?.axes[0] ? joystick.left?.axes[0] * 0.785 : 0"
                  :y2="joystick.left?.axes[1] ? joystick.left?.axes[1] * 0.785 : 0" stroke="rgba(255, 255, 255, 1)"
                  stroke-width="1"></line>
                <circle :cx="joystick.left?.axes[0] ? joystick.left?.axes[0] * 0.785 : 0"
                  :cy="joystick.left?.axes[1] ? joystick.left?.axes[1] * 0.785 : 0" r="8" fill="rgba(255, 255, 255, 1)">
                </circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="row-start-1 col-start-5 row-span-2 col-span-2">
        <div
          class="text-center text-white max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p class="text-1xl">Right Joystick</p>
          <div class="joystick__box">
            <svg style="width: 100%; height: 100%; position: absolute; z-index: 1">
              <g transform="translate(70 70) scale(0.8, 0.8)">
                <circle cx="0" cy="0" r="78.5" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></circle>
                <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="-78.5" y1="0" x2="78.5" y2="0" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="0" y1="0" :x2="joystick.right?.axes[0] ? joystick.right?.axes[0] * 0.785 : 0"
                  :y2="joystick.right?.axes[1] ? joystick.right?.axes[1] * 0.785 : 0" stroke="rgba(255, 255, 255, 1)"
                  stroke-width="1"></line>
                <circle :cx="joystick.right?.axes[0] ? joystick.right?.axes[0] * 0.785 : 0"
                  :cy="joystick.right?.axes[1] ? joystick.right?.axes[1] * 0.785 : 0" r="8"
                  fill="rgba(255, 255, 255, 1)">
                </circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="row-start-3 col-start-2 col-span-2">
        <div
          class="text-center text-white max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p class="text-1xl">Left Paddle</p>
          <div class="joystick__box">
            <svg style="width: 100%; height: 100%; position: absolute; z-index: 1">
              <g transform="translate(70 70) scale(0.8, 0.8)">
                <!-- <circle cx="0" cy="0" r="78.5" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></circle> -->
                <rect x="-40" y="-78.5" width="80" height="157" fill="none" stroke="rgba(255, 255, 255, 1)"
                  stroke-width="1" />
                <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="0" y1="0" :y2="joystick.left?.axes[3] ? joystick.left?.axes[3] * 0.785 : 0"
                  stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <circle :cy="joystick.left?.axes[3] ? joystick.left?.axes[3] * 0.785 : 0" r="8"
                  fill="rgba(255, 255, 255, 1)">
                </circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="row-start-3 col-start-4 col-span-2">
        <div
          class="text-center text-white max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <p class="text-1xl">Right Paddle</p>
          <div class="joystick__box">
            <svg style="width: 100%; height: 100%; position: absolute; z-index: 1">
              <g transform="translate(70 70) scale(0.8, 0.8)">
                <!-- <circle cx="0" cy="0" r="78.5" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></circle> -->
                <rect x="-40" y="-78.5" width="80" height="157" fill="none" stroke="rgba(255, 255, 255, 1)"
                  stroke-width="1" />
                <line x1="0" y1="-78.5" x2="0" y2="78.5" stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <line x1="0" y1="0" :y2="joystick.right?.axes[3] ? joystick.right?.axes[3] * 0.785 : 0"
                  stroke="rgba(255, 255, 255, 1)" stroke-width="1"></line>
                <circle :cy="joystick.right?.axes[3] ? joystick.right?.axes[3] * 0.785 : 0" r="8"
                  fill="rgba(255, 255, 255, 1)">
                </circle>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.joystick__box {
  position: relative;
  height: 157px;
  width: 157px;
  display: inline-block;
  border: 10px solid rgba(0, 0, 0, 0);
}
</style>
