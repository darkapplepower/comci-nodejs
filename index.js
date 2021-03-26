const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
module.exports= class Comci{
    static async getTimeTable(schoolId, grade, cl, nextweek=false) {
        nextweek=1+ +!!nextweek;
        var scdata = await this.#scData();
        var base64 = Buffer.from(scdata + schoolId + "_0_"+nextweek, "utf-8").toString("base64");
        var url = await this.#getUrl();
        var data = await axios.get("http://comci.kr:4082" + url.split("?")[0] + "?" + base64);
        data = JSON.parse(data.data.replace(/\0/g, ""));
        var zaryo = await this.#searchVariableName();
        var result = {};
        result.수업시간 = JSON.parse(JSON.stringify(data.일과시간));
        result.시간표 = [[], [], [], [], [], []];
        var ord, dad, th, sb, na;
        console.log();
        for (let t = 1; t < 9; t++) {
            for (let we = 1; we < 7; we++) {
                ord = data[zaryo[0]][grade][cl][we][t];
                dad = data[zaryo[1]][grade][cl][we][t];
                th = Math.floor(dad / 100);
                sb = dad - th * 100;
                if (dad > 100) {
                    if (th < data[zaryo[3]].length) {
                        na = data[zaryo[4]][th].substr(0, 2);
                    } else {
                        na = "";
                    }
                    result.시간표[we - 1][t - 1] = (data[zaryo[5]][sb] + "(" + na + ")").toString()
                }
            }
        }
        return result;
    }
    static async getSchoolNumber(schoolName) {
        var url = await this.#getUrl();
        var str = "";
        schoolName = iconv.encode(schoolName, "euc-kr");
        for (let i = 0; i < schoolName.length; i++) {
            str += "%" + schoolName[i].toString(16).padStart(2, "0").toUpperCase();
        }
        var data = await axios.get(`http://comci.kr:4082${url}${str}`);
        data = JSON.parse(data.data.replace(/\0/g, ""));
        data = data["학교검색"].map(function (x) {
            return {
                name: `${x[2]}(${x[1]})`,
                number: x[3]
            };
        });
        return data;
    }
    static sortTable(timeTable){
        return ["월","화","수","목","금","토","일"].map(function(x,xx){
            if(Array.isArray(timeTable.시간표[xx])){
                return x+"\n"+timeTable.시간표[xx].map(function(y, yy){
                    return timeTable.수업시간[yy]+"|"+y;
                }).join("\n");
            }else{
                return x;
            }
        }).join("\n\n\n");
    }
    static async #getUrl() {
        var result = await this.#getHtml();
        result = result.slice(result.indexOf("url")).match(/\/([^\']+)/)[0];
        return result;
    }
    static async #searchVariableName() {
        var ret = [];
        var result = await this.#getHtml();
        var count;
        while (true) {
            count = result.indexOf("자료.자료");
            if (count === -1) {
                break;
            }
            ret.push(result.slice(count + 3, count + 8));
            result = result.slice(count + 8);
        }
        return ret;
    }
    static async #scData() {
        var result = await this.#getHtml();
        return result.slice(result.indexOf("sc_data('") + 8).match(/[^']+/)[0];
    }
    static async #getHtml() {
        var result = await axios.get("http://comci.kr:4082/st", {
            responseType: "arraybuffer"
        });
        result=iconv.decode(result.data, "euc-kr");
        result = cheerio.load(result);
        result = result("script")[1].children[0].data;
        return result;
    }
};