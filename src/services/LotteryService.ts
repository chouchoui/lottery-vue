import { Member, members } from '@/assets/ts/Memeber';


export interface Award {
    name: string;
    count: number;
    members: Member[];
}

export class LotteryService {

    choosed: Member[] = [];

    constructor() {
        this.load();
    }

    load() {
        this.choosed = JSON.parse(localStorage.getItem('choosed')) || [];
    }


    getKey(item: Member) {
        return item.name + '-' + item.phone;
    }


    speed(): number[] {
        return [0.1 * Math.random() + 0.05, -(0.1 * Math.random() + 0.05)];
    }

    clear() {
        localStorage.clear();
        this.load();
    }


    lottery(award: Award): Promise<Member[]> {

        if (award.count <= award.members.length) {
            return Promise.reject('奖项人数已满');
        }

        const color = 'yellow';
        const ret = members
            .filter((m, index) => {
                const obj = Object.assign({}, m);
                obj.index = index;
                return !this.choosed.some((c) => c.phone === obj.phone);
            })
            .map((m) => {
                const obj = Object.assign({}, m);
                obj.score = Math.random();
                return obj;
            })
            .sort((a, b) => {
                return a.score - b.score;
            })
            .slice(0, 1)
            .map((m) => {
                const obj = Object.assign({}, m);
                obj.award = award.name;
                if (!this.choosed.some((c) => c.phone === obj.phone)) {
                    this.choosed.push(obj);
                }
                obj.color = color;
                return obj;
            });
        localStorage.setItem('choosed', JSON.stringify(this.choosed));
        return Promise.resolve(ret);
    }

}

const lotteryService = new LotteryService();
export default lotteryService;
