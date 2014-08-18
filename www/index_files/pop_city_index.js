// JavaScript Document
/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity = ['北京|beijing|bj','上海|shanghai|sh', '重庆|chongqing|cq',  '深圳|shenzhen|sz', '广州|guangzhou|gz', '杭州|hangzhou|hz',
    '南京|nanjing|nj', '苏州|shuzhou|sz', '天津|tianjin|tj', '成都|chengdu|cd', '南昌|nanchang|nc', '三亚|sanya|sy','青岛|qingdao|qd',
    '厦门|xiamen|xm', '西安|xian|xa','长沙|changsha|cs','合肥|hefei|hf','西藏|xizang|xz', '内蒙古|neimenggu|nmg', '安庆|anqing|aq', '阿泰勒|ataile|atl', '安康|ankang|ak',
    '阿克苏|akesu|aks', '包头|baotou|bt', '北海|beihai|bh', '百色|baise|bs','保山|baoshan|bs', '长治|changzhi|cz', '长春|changchun|cc', '常州|changzhou|cz', '昌都|changdu|cd',
    '朝阳|chaoyang|cy', '常德|changde|cd', '长白山|changbaishan|cbs', '赤峰|chifeng|cf', '大同|datong|dt', '大连|dalian|dl', '达县|daxian|dx', '东营|dongying|dy', '大庆|daqing|dq', '丹东|dandong|dd',
    '大理|dali|dl', '敦煌|dunhuang|dh', '鄂尔多斯|eerduosi|eeds', '恩施|enshi|es', '福州|fuzhou|fz', '阜阳|fuyang|fy', '贵阳|guiyang|gy',
    '桂林|guilin|gl', '广元|guangyuan|gy', '格尔木|geermu|gem', '呼和浩特|huhehaote|hhht', '哈密|hami|hm',
    '黑河|heihe|hh', '海拉尔|hailaer|hle', '哈尔滨|haerbin|heb', '海口|haikou|hk', '黄山|huangshan|hs', '邯郸|handan|hd',
    '汉中|hanzhong|hz', '和田|hetian|ht', '晋江|jinjiang|jj', '锦州|jinzhou|jz', '景德镇|jingdezhen|jdz',
    '嘉峪关|jiayuguan|jyg', '井冈山|jinggangshan|jgs', '济宁|jining|jn', '九江|jiujiang|jj', '佳木斯|jiamusi|jms', '济南|jinan|jn',
    '喀什|kashi|ks', '昆明|kunming|km', '康定|kangding|kd', '克拉玛依|kelamayi|klmy', '库尔勒|kuerle|kel', '库车|kuche|kc', '兰州|lanzhou|lz',
    '洛阳|luoyang|ly', '丽江|lijiang|lj', '林芝|linzhi|lz', '柳州|liuzhou|lz', '泸州|luzhou|lz', '连云港|lianyungang|lyg', '黎平|liping|lp',
    '连成|liancheng|lc', '拉萨|lasa|ls', '临沧|lincang|lc', '临沂|linyi|ly', '芒市|mangshi|ms', '牡丹江|mudanjiang|mdj', '满洲里|manzhouli|mzl', '绵阳|mianyang|my',
    '梅县|meixian|mx', '漠河|mohe|mh', '南充|nanchong|nc', '南宁|nanning|nn', '南阳|nanyang|ny', '南通|nantong|nt', '那拉提|nalati|nlt',
    '宁波|ningbo|nb', '攀枝花|panzhihua|pzh', '衢州|quzhou|qz', '秦皇岛|qinhuangdao|qhd', '庆阳|qingyang|qy', '齐齐哈尔|qiqihaer|qqhe',
    '石家庄|shijiazhuang|sjz',  '沈阳|shenyang|sy', '思茅|simao|sm', '铜仁|tongren|tr', '塔城|tacheng|tc', '腾冲|tengchong|tc', '台州|taizhou|tz',
    '通辽|tongliao|tl', '太原|taiyuan|ty', '威海|weihai|wh', '梧州|wuzhou|wz', '文山|wenshan|ws', '无锡|wuxi|wx', '潍坊|weifang|wf', '武夷山|wuyishan|wys', '乌兰浩特|wulanhaote|wlht',
    '温州|wenzhou|wz', '乌鲁木齐|wulumuqi|wlmq', '万州|wanzhou|wz', '乌海|wuhai|wh', '兴义|xingyi|xy', '西昌|xichang|xc',  '襄樊|xiangfan|xf',
    '西宁|xining|xn', '锡林浩特|xilinhaote|xlht', '西双版纳|xishuangbanna|xsbn', '徐州|xuzhou|xz', '义乌|yiwu|yw', '永州|yongzhou|yz', '榆林|yulin|yl', '延安|yanan|ya', '运城|yuncheng|yc',
    '烟台|yantai|yt', '银川|yinchuan|yc', '宜昌|yichang|yc', '宜宾|yibin|yb', '盐城|yancheng|yc', '延吉|yanji|yj', '玉树|yushu|ys', '伊宁|yining|yn', '珠海|zhuhai|zh', '昭通|zhaotong|zt',
    '张家界|zhangjiajie|zjj', '舟山|zhoushan|zs', '郑州|zhengzhou|zz', '中卫|zhongwei|zw', '芷江|zhijiang|zj', '湛江|zhanjiang|zj'];

Vcity.allCity = ['北京|PEK|BEIJING', '上海|SHA|SHANGHAI', '天津|TSN|TIANJIN', '重庆|CKG|CHONGQING', '大连|DLC|DALIAN', '青岛|TAO|QINGDAO', '西安|SIA|XIAN', '南京|NKG|NANJING', '苏州|SZV|SUZHOU', '杭州|HGH|HANGZHOU', '厦门|XMN|XIAMEN', '成都|CTU|CHENGDU', '深圳|SZX|SHENZHEN', '广州|CAN|GUANGZHOU', '三亚|SYX|SANYA', '济南|TNA|JINAN', '宁波|NGB|NINGBO', '沈阳|SHE|SHENYANG', '武汉|WUH|WUHAN', '阿坝州|ABA|ABAZHOU', '安吉|ANJ|ANJI', '安康|AKA|ANKANG', '安庆|AQG|ANQING', '鞍山|AOG|ANSHAN', '安顺|ANS|ANSHUN', '安图|ANT|ANTU', '安阳|AYN|ANYANG', '澳门|MFM|AOMEN', '白山|BAS|BAISHAN', '蚌埠|BFU|BANGBU', '保定|BAD|BAODING', '宝鸡|BAJ|BAOJI', '保山|BSD|BAOSHAN', '保亭|BUT|BAOTING', '包头|BAV|BAOTOU', '巴彦淖尔|BYZ|BAYANNAOER', '北戴河|BDH|BEIDAIHE', '北海|BHY|BEIHAI', '北京|PEK|BEIJING', '本溪|BEX|BENXI', '滨州|BIZ|BINZHOU', '沧州|CAZ|CANGZHOU', '长春|CGQ|CHANGCHUN', '常德|CGD|CHANGDE', '昌吉|CHJ|CHANGJI', '长沙|CSX|CHANGSHA', '常熟|CHS|CHANGSHU', '常州|CZX|CHANGZHOU', '潮州|CZH|CHAOZHOU', '承德|CHD|CHENGDE', '成都|CTU|CHENGDU', '郴州|CEZ|CHENZHOU', '赤峰|CIF|CHIFENG', '池州|CZU|CHIZHOU', '重庆|CKG|CHONGQING', '滁州|CUZ|CHUZHOU', '慈溪|CIX|CIXI', '从化|COH|CONGHUA', '大理|DLU|DALI', '大连|DLC|DALIAN', '丹东|DDG|DANDONG', '丹阳|DYA|DANYANG', '儋州|DAZ|DANZHOU', '大庆|DAQ|DAQING', '大同|DAT|DATONG', '大冶|DYE|DAYE', '德清|DEQ|DEQING', '德阳|DEY|DEYANG', '德州|DZO|DEZHOU', '东莞|DGM|DONGGUAN', '东台|DOT|DONGTAI', '东阳|DYN|DONGYANG', '东营|DOY|DONGYING', '都江堰|DOJ|DOUJIANGYAN', '敦煌|DNH|DUNHUANG', '鄂尔多斯|ERD|EERDUOSI', '峨眉山|EMS|EMEISHAN', '恩施|ENH|ENSHI', '肥城|FCG|FEICHENG', '奉化|FEH|FENGHUA', '凤凰县|FHX|FENGHUANGXIAN', '佛山|FUO|FOSHAN', '福鼎|FUD|FUDING', '福清|FUQ|FUQING', '阜阳|FUG|FUYANG', '富阳|FUY|FUYANG', '福州|FOC|FUZHOU', '赣州|GZH|GANZHOU', '高邮|GAY|GAOYOU', '广安|GUA|GUANGAN', '广元|GUY|GUANGYUAN', '广州|CAN|GUANGZHOU', '贵港|GUG|GUIGANG', '桂林|KWL|GUILIN', '贵阳|KWE|GUIYANG', '哈尔滨|HRB|HAERBIN', '海安|HAA|HAIAN', '海口|HAK|HAIKOU', '海螺沟|HLG|HAILUOGOU', '海宁|HAI|HAINING', '海盐|HAY|HAIYAN', '邯郸|HDN|HANDAN', '杭州|HGH|HANGZHOU', '汉中|HZG|HANZHONG', '鹤壁|HEB|HEBI', '合肥|HFE|HEFEI', '横店|HDA|HENGDIAN', '衡水|HSU|HENGSHUI', '衡阳|HNY|HENGYANG', '和田|HTN|HETIAN', '河源|HEY|HEYUAN', '菏泽|HZE|HEZE', '淮安|HUA|HUAIAN', '怀化|HUH|HUAIHUA', '淮南|HUI|HUAINAN', '黄山|TXN|HUANGSHAN', '黄石|HUS|HUANGSHI', '呼和浩特|HET|HUHEHAOTE', '惠州|HUZ|HUIZHOU', '葫芦岛|HLD|HULUDAO', '湖州|HZO|HUZHOU', '佳木斯|JMU|JIAMUSI', '建德|JID|JIANDE', '江都|JDU|JIANGDOU', '江门|JIM|JIANGMEN', '江阴|JIY|JIANGYIN', '江油|JYO|JIANGYOU', '胶南|JNA|JIAONAN', '焦作|JZU|JIAOZUO', '嘉善|JAS|JIASHAN', '嘉兴|JIX|JIAXING', '嘉峪关|JGN|JIAYUGUAN', '揭阳|JYN|JIEYANG', '吉林|JIL|JILIN', '即墨|JMO|JIMO', '济南|TNA|JINAN', '晋城|JIC|JINCHENG', '景德镇|JDZ|JINGDEZHEN', '井冈山|JGS|JINGGANGSHAN', '靖江|JIJ|JINGJIANG', '荆州|JZG|JINGZHOU', '金华|JHA|JINHUA', '集宁|JIN|JINING', '济宁|JNG|JINING', '晋江|JJN|JINJIANG', '金坛|JIT|JINTAN', '缙云|JYU|JINYUN', '晋中|JZO|JINZHONG', '锦州|JNZ|JINZHOU', '吉首|JSH|JISHOU', '九江|JIU|JIUJIANG', '酒泉|CHW|JIUQUAN', '九寨沟|JZH|JIUZHAIGOU', '济源|JYA|JIYUAN', '开封|KAF|KAIFENG', '凯里|KAL|KAILI', '开平|KAP|KAIPING', '喀纳斯|KNS|KANASI', '喀什|KHG|KASHEN', '克拉玛依|KLY|KELAMAYI', '库尔勒|KRL|KUERLE', '昆明|KMG|KUNMING', '昆山|KUS|KUNSHAN', '莱芜|LAW|LAIWU', '莱西|LXI|LAIXI', '莱阳|LAY|LAIYANG', '廊坊|LAF|LANGFANG', '兰溪|LAX|LANXI', '兰州|LHW|LANZHOU', '拉萨|LXA|LASA', '乐清|LEQ|LEQING', '乐山|LSA|LESHAN', '连城|LIC|LIANCHENG', '连云港|LYG|LIANYUNGANG', '连州|LHO|LIANZHOU', '聊城|LCN|LIAOCHENG', '辽阳|LIY|LIAOYANG', '丽江|LJG|LIJIANG', '临安|LIA|LINAN', '临海|LHA|LINHAI', '临沂|LYI|LINYI', '丽水|LIS|LISHUI', '六安|LAN|LIUAN', '柳州|LZH|LIUZHOU', '溧阳|LYN|LIYANG', '龙岩|LOY|LONGYAN', '漯河|LUH|LUOHE', '洛阳|LYA|LUOYANG', '庐山|LUZ|LUSHAN', '泸州|LZO|LUZHOU', '马鞍山|MAA|MAANSHAN', '满洲里|MAZ|MANZHOULI', '茂名|MAM|MAOMING', '梅州|MZU|MEIZHOU', '绵阳|MIG|MIANYANG', '牡丹江|MDG|MUDANJIANG', '南昌|KHN|NANCHANG', '南充|NAO|NANCHONG', '南戴河|NDH|NANDAIHE', '南京|NKG|NANJING', '南宁|NNG|NANNING', '南通|NTG|NANTONG', '南阳|NNY|NANYANG', '内江|NEJ|NEIJIANG', '宁波|NGB|NINGBO', '宁德|NID|NINGDE', '盘锦|PAJ|PANJIN', '攀枝花|PZI|PANZHIHUA', '蓬莱|PEL|PENGLAI', '平湖|PIH|PINGHU', '萍乡|PIX|PINGXIANG', '平遥|PYO|PINGYAO', '邳州|PIZ|PIZHOU', '莆田|PUT|PUTIAN', '濮阳|PUY|PUYANG', '千岛湖|QIH|QIANDAOHU', '启东|QID|QIDONG', '青岛|TAO|QINGDAO', '清远|QYN|QINGYUAN', '青州|QIZ|QINGZHOU', '秦皇岛|SHP|QINHUANGDAO', '钦州|QZO|QINZHOU', '琼海|QHA|QIONGHAI', '齐齐哈尔|NDG|QIQIHAER', '泉州|QUZ|QUANZHOU', '曲阜|QUF|QUFU', '曲靖|QUJ|QUJING', '衢州|JUZ|QUZHOU', '日照|RIZ|RIZHAO', '荣成|ROC|RONGCHENG', '如皋|RUG|RUGAO', '瑞安|RUA|RUIAN', '瑞丽|RUL|RUILI', '三门峡|SAM|SANMENXIA', '三明|SMI|SANMING', '三亚|SYX|SANYA', '上海|SHA|SHANGHAI', '商丘|SHQ|SHANGQIU', '上饶|SHR|SHANGRAO', '上虞|SYU|SHANGYU', '汕头|SWA|SHANTOU', '汕尾|SHW|SHANWEI', '韶关|HSC|SHAOGUAN', '韶山|SHS|SHAOSHAN', '邵武|SWU|SHAOWU', '绍兴|SHX|SHAOXING', '邵阳|SYG|SHAOYANG', '嵊州|SZU|SHENGZHOU', '沈阳|SHE|SHENYANG', '深圳|SZX|SHENZHEN', '石家庄|SJW|SHIJIAZHUANG', '石狮|SHI|SHISHI', '十堰|SYA|SHIYAN', '寿光|SHG|SHOUGUANG', '顺德|SHD|SHUNDE', '绥芬河|SUF|SUIFENHE', '遂宁|SUN|SUINING', '苏州|SZV|SUZHOU', '泰安|TAA|TAIAN', '太仓|TAC|TAICANG', '台山|TSA|TAISHAN', '泰顺|TSH|TAISHUN', '太原|TYN|TAIYUAN', '台州|TAZ|TAIZHOU', '泰州|TZU|TAIZHOU', '唐山|TAS|TANGSHAN', '腾冲|TCH|TENGCHONG', '天津|TSN|TIANJIN', '天水|TIS|TIANSHUI', '天台|TTA|TIANTAI', '天柱山|TZS|TIANZHUSHAN', '铁岭|TIL|TIELING', '通化|TNH|TONGHUA', '同里|TOL|TONGLI', '通辽|TGO|TONGLIAO', '铜陵|TOG|TONGLING', '桐庐|TLU|TONGLU', '桐乡|TOX|TONGXIANG', '吐鲁番|TUL|TULUFAN', '万宁|WAN|WANNING', '潍坊|WEF|WEIFANG', '威海|WEH|WEIHAI', '文登|WED|WENDENG', '温岭|WEG|WENLING', '温州|WNZ|WENZHOU', '武汉|WUH|WUHAN', '芜湖|WHU|WUHU', '吴江|WJI|WUJIANG', '乌鲁木齐|URC|WULUMUQI', '五台山|WTS|WUTAISHAN', '无锡|WUX|WUXI', '武义|WYI|WUYI', '武夷山|WUS|WUYISHAN', '婺源|WUY|WUYUAN', '五指山|XZS|WUZHISHAN', '梧州|WUZ|WUZHOU', '厦门|XMN|XIAMEN', '西安|SIA|XIAN', '襄樊|XFN|XIANGFAN', '香港|HKG|XIANGGANG', '香格里拉|XIG|XIANGGELILA', '象山|XSH|XIANGSHAN', '湘潭|XIT|XIANGTAN', '咸阳|XIY|XIANYANG', '西昌|XIC|XICHANG', '兴城|XEN|XINGCHENG', '邢台|XNT|XINGTAI', '西宁|XNN|XINING', '新乡|XIX|XINXIANG', '信阳|XYA|XINYANG', '新沂|XIN|XINYI', '忻州|XIU|XINZHOU', '西双版纳|JHG|XISHUANGBANNA', '宿迁|XIQ|XIUQIAN', '宿州|XIO|XIUZHOU', '宣城|XUC|XUANCHENG', '徐州|XUZ|XUZHOU', '雅安|YAA|YAAN', '亚布力|YBL|YABULI', '延安|ENY|YANAN', '盐城|YNZ|YANCHENG', '雁荡山|YAD|YANDANGSHAN', '阳江|YAJ|YANGJIANG', '阳朔|YAH|YANGSHUO', '扬州|YZO|YANGZHOU', '延吉|YNJ|YANJI', '烟台|YNT|YANTAI', '兖州|YZH|YANZHOU', '宜宾|YBP|YIBIN', '宜昌|YIH|YICHANG', '宜春|YIC|YICHUN', '银川|INC|YINCHUAN', '营口|YIK|YINGKOU', '鹰潭|YIT|YINGTAN', '义乌|YIW|YIWU', '宜兴|YIX|YIXING', '益阳|YIY|YIYANG', '仪征|YIZ|YIZHENG', '永康|YOK|YONGKANG', '岳阳|YUY|YUEYANG', '榆林|UYN|YULIN', '玉林|YUL|YULIN', '运城|YUC|YUNCHENG', '余姚|YUA|YUYAO', '枣庄|ZAZ|ZAOZHUANG', '张家港|ZHJ|ZHANGJIAGANG', '张家界|DYG|ZHANGJIAJIE', '张家口|ZJK|ZHANGJIAKOU', '张掖|ZHY|ZHANGYE', '漳州|ZHZ|ZHANGZHOU', '湛江|ZHA|ZHANJIANG', '肇庆|ZHQ|ZHAOQING', '郑州|CGO|ZHENGZHOU', '镇江|ZJA|ZHENJIANG', '中山|ZIS|ZHONGSHAN', '舟山|HSN|ZHOUSHAN', '珠海|ZUH|ZHUHAI', '诸暨|ZJI|ZHUJI', '驻马店|ZHM|ZHUMADIAN', '株洲|ZHO|ZHUZHOU', '淄博|ZIB|ZIBO', '遵义|ZYI|ZUNYI'];

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */

(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-h]$/i, reg3 = /^[i-p]$/i, reg4 = /^[q-z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},ABCDEFGH:{}, IJKLMNOP:{}, QRSTUVWXYZ:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCDEFGH[letter]) Vcity.oCity.ABCDEFGH[letter] = [];
                Vcity.oCity.ABCDEFGH[letter].push(match[1]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.IJKLMNOP[letter]) Vcity.oCity.IJKLMNOP[letter] = [];
                Vcity.oCity.IJKLMNOP[letter].push(match[1]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.QRSTUVWXYZ[letter]) Vcity.oCity.QRSTUVWXYZ[letter] = [];
                Vcity.oCity.QRSTUVWXYZ[letter].push(match[1]);
            }
            /* 热门城市 前16条 */
            if(i<16){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[1]);
            }
        }
    }
})();
/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">热门城市(支持汉字/拼音)</p>',
	'<div class="zimu_con">',
    '<ul>',
    '<li class="on">热门<b></b></li>',
    '<li>ABCDEFGH<b></b></li>',
    '<li>IJKLMNOP<b></b></li>',
    '<li>QRSTUVWXYZ<b></b></li>',
    '</ul>',
	'</div>'
	
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left-220 + 'px';
        div.style.top = inputPos.bottom + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a >' + oCity[key][sortKey[j]][i] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        Vcity._m.on(this.input,'focus',function(){
            that.input.select();
            if(that.input.value == '城市名') that.input.value = '';
        });
        Vcity._m.on(this.input,'blur',function(){
            if(that.input.value == '') that.input.value = '城市名';
        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li><b class="fl">' + match[1] + '</b><b class="fr">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on"><b class="fl">' + match[1] + '</b><b class="fr">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到数据 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};
