<template>
    <div
        class="wall"
        id="main"
        ref="main"
    >
        <div class="result-btn">
            <router-link
                class="pure-button button-secondary"
                to="/"
            >返回抽奖</router-link>
        </div>
        <div class="result-content">
            <div class="page-title">获奖名单</div>
            <div
                :key="`result-${result.name}`"
                class="result-list"
                v-for="result in results"
            >
                <div class="result-title">{{result.name | resultTitle}}</div>
                <div class="result-item-list">
                    <div
                        :key="`result-item-${item.phone}`"
                        class="result-item"
                        v-for="item in result.list"
                    >{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./Result.ts"></script>
<style src="./Result.css" scoped></style>
