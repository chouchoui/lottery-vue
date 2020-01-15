<template>
    <div style="height:100vh">
        <div
            :class="mainClass"
            @click="closeMask"
            id="main"
            ref="main"
        >
            <div class="result-btn">
                <router-link
                    class="pure-button button-secondary"
                    to="/result"
                >获奖名单</router-link>
            </div>
            <canvas
                id="myCanvas"
                ref="myCanvas"
            >
                <ul>
                    <li
                        :key="`member-${item.phone}`"
                        v-for="item in members"
                    >
                        <a
                            :style="handleMemberColor(item)"
                            href="javascript:void(0)"
                        >{{item.name}}</a>
                    </li>
                </ul>
            </canvas>
        </div>
        <div
            @click="closeMask"
            class="result"
            id="result"
            v-show="showResult"
        >
            <template v-if="result.length !== 0">
                <span
                    :key="`result-${item.phone}`"
                    v-for="item in result"
                >{{item.name}}</span>
            </template>
            <template v-else>
                <span>已抽完</span>
            </template>
        </div>
        <div
            class="tools"
            id="tools"
        >
            <button
                :class="{ 'button-error': selected === item}"
                :key="`btn-${item.name}`"
                @click="onClick(item)"
                class="pure-button"
                v-for="item in btns"
                v-show="item.count>item.members.length"
            >{{item.name}}（{{item.count-item.members.length}}人）</button>
            <button
                :class="{'button-secondary': !running,
               'button-success': running}"
                @click="toggle"
                class="pure-button"
                v-show="selected.count>selected.members.length"
            >{{running?'停!':'开始'}}</button>
            <button
                @click="reset"
                class="pure-button button-warning"
            >重置</button>
        </div>
    </div>
</template>
<script src="./Home.ts"></script>
<style src="./Home.css" scoped></style>
