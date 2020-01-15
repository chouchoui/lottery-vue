import { Component, Vue } from 'vue-property-decorator';
import { Member } from '@/assets/ts/Memeber';

interface ResultModel {
    name: string;
    list: Member[];
}

@Component({
    filters: {
        resultTitle: (value: string) => {
            return value.replace('result-', '');
        },
    },
})
export default class Result extends Vue {
    results: ResultModel[] = [];

    mounted() {
        let results: ResultModel[] = [];
        // 遍历(排除choosed)
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i).startsWith('result-')) {
                const result: ResultModel = {
                    name: '',
                    list: [],
                };
                result.name = localStorage.key(i);
                result.list = JSON.parse(localStorage.getItem(localStorage.key(i))) as Member[];
                results.push(result);
            }
        }


        results = results.sort((x, y) => x.list.length - y.list.length);
        this.results = results;
    }
}
