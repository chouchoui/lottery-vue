import { Component, Vue } from 'vue-property-decorator';
import 'jquery-tagcanvas/tagcanvas.js';
import { Member, members } from '@/assets/ts/Memeber';
import lotteryService, { Award } from '@/services/LotteryService';
import groupBy from 'lodash/groupBy';

const awards: Award[] = [
    {
        name: '三等奖',
        count: 8,
        members: [],
    },
    {
        name: '二等奖',
        count: 4,
        members: [],
    },
    {
        name: '一等奖',
        count: 1,
        members: [],
    },
];

@Component
export default class Home extends Vue {

    $refs: {
        myCanvas: HTMLCanvasElement;
    };


    result: Member[] = [];

    selected: Award = awards[0];
    running: boolean = false;
    btns: Award[] = awards;

    members: Member[] = [];

    showResult: boolean = false;
    mainClass = {
        wall: true,
        mask: false,
    };

    reset() {
        if (confirm('确定要重置么？所有之前的抽奖历史将被清除！')) {
            lotteryService.clear();
            location.reload(true);
        }
    }

    onClick(item: Award) {
        this.closeMask();
        this.selected = item;
    }

    async toggle() {
        if (this.running) {
            TagCanvas.SetSpeed('myCanvas', lotteryService.speed());
            lotteryService.lottery(this.selected).then(async (result) => {
                this.result = result;
                TagCanvas.Reload('myCanvas');
                await this.$nextTick();
                this.initMembers();
                localStorage.setItem(`result-${this.selected.name}`, JSON.stringify(this.selected.members));
                this.showResult = true;
                this.mainClass.mask = true;
            }).catch((error: string) => {
                alert(error);
            });

        } else {
            this.closeMask();
            TagCanvas.SetSpeed('myCanvas', [5, 5]);
        }
        this.running = !this.running;
    }


    handleMemberColor(m: Member) {
        return {
            color: m.color || 'white',
        };
    }

    closeMask() {
        this.mainClass.mask = false;
        this.showResult = false;
    }

    initMembers() {
        const promise = new Promise((resolve) => {
            lotteryService.load();
            this.members = [];
            members.forEach((item, index) => {
                item.index = index;
                const color = lotteryService.choosed.some((c) => c.phone === item.phone) ? 'yellow' : 'white';
                item.color = color;
                this.members.push(item);
            });

            const group = groupBy(lotteryService.choosed, 'award');
            for (const key in group) {
                if (group.hasOwnProperty(key)) {
                    const element = group[key];
                    this.btns.find((i) => i.name === key).members = element;
                }
            }
            resolve();
        });
        return promise;
    }

    async mounted() {

        this.$refs.myCanvas.width = document.body.offsetWidth;
        this.$refs.myCanvas.height = document.body.offsetHeight;

        await this.initMembers();
        await this.$nextTick();
        TagCanvas.Start('myCanvas', '', {
            textColour: null,
            initial: lotteryService.speed(),
            dragControl: true,
            textHeight: 30,
            weight: true,
            weightMode: 'size',
            outlineMethod: 'none',
            wheelZoom: false,
        });
    }
}
