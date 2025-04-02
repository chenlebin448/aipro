import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Search, Calendar, Clock, MapPin, User, Heart, Book, Sparkles, X } from 'lucide-react';
import { BaziAnalysis } from '../BaziAnalysis';

interface YinYangProps {
  onStartChat: (message: string) => void;
}

const CITIES = [
  { province: '北京市', cities: ['东城区', '西城区', '朝阳区', '海淀区', '丰台区', '石景山区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'] },
  { province: '天津市', cities: ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'] },
  { province: '上海市', cities: ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'] },
  { province: '重庆市', cities: ['渝中区', '江北区', '南岸区', '九龙坡区', '沙坪坝区', '大渡口区', '渝北区', '巴南区', '北碚区', '綦江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区', '城口县', '丰都县', '垫江县', '忠县', '云阳县', '奉节县', '巫山县', '巫溪县', '石柱土家族自治县', '秀山土家族苗族自治县', '酉阳土家族苗族自治县', '彭水苗族土家族自治县'] },
  { province: '广东省', cities: ['广州市', '深圳市', '珠海市', '汕头市', '佛山市', '韶关市', '湛江市', '肇庆市', '江门市', '茂名市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'] },
  { province: '浙江省', cities: ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'] },
  { province: '江苏省', cities: ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'] },
  { province: '四川省', cities: ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'] },
  { province: '湖北省', cities: ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州', '仙桃市', '潜江市', '天门市', '神农架林区'] },
  { province: '湖南省', cities: ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州'] },
  { province: '河北省', cities: ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市', '定州市', '辛集市'] },
  { province: '山西省', cities: ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'] },
  { province: '辽宁省', cities: ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'] },
  { province: '吉林省', cities: ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'] },
  { province: '黑龙江省', cities: ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'] },
  { province: '安徽省', cities: ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'] },
  { province: '福建省', cities: ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'] },
  { province: '江西省', cities: ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'] },
  { province: '山东省', cities: ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'] },
  { province: '河南省', cities: ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市', '济源市'] },
  { province: '广西壮族自治区', cities: ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'] },
  { province: '海南省', cities: ['海口市', '三亚市', '三沙市', '儋州市', '五指山市', '琼海市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'] },
  { province: '贵州省', cities: ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'] },
  { province: '云南省', cities: ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'] },
  { province: '西藏自治区', cities: ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市', '阿里地区'] },
  { province: '陕西省', cities: ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'] },
  { province: '甘肃省', cities: ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏回族自治州', '甘南藏族自治州'] },
  { province: '青海省', cities: ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'] },
  { province: '宁夏回族自治区', cities: ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市', '灵武市', '青铜峡市'] },
  { province: '新疆维吾尔自治区', cities: ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子市', '阿拉尔市', '图木舒克市', '五家渠市', '北屯市', '铁门关市', '双河市', '可克达拉市', '昆玉市', '胡杨河市'] },
  { province: '台湾省', cities: ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉义市', '新竹县', '苗栗县', '彰化县', '南投县', '云林县', '嘉义县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '金门县', '连江县'] },
  { province: '香港特别行政区', cities: ['中西区', '湾仔区', '东区', '南区', '油尖旺区', '深水埗区', '九龙城区', '黄大仙区', '观塘区', '荃湾区', '屯门区', '元朗区', '北区', '大埔区', '西贡区', '沙田区', '葵青区', '离岛区'] },
  { province: '澳门特别行政区', cities: ['花地玛堂区', '花王堂区', '望德堂区', '大堂区', '风顺堂区', '嘉模堂区', '圣方济各堂区', '路凼填海区'] }
];

export function YinYang({ onStartChat }: YinYangProps) {
  const [showAnalysis, setShowAnalysis] = React.useState(false);
  const [birthData, setBirthData] = React.useState<{
    gender: string;
    solarDate: string;
    lunarDate: string;
    time: string;
    place: string;
  } | null>(null);
  const [birthDate, setBirthDate] = React.useState('');
  const [birthTime, setBirthTime] = React.useState('');
  const [birthPlace, setBirthPlace] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showCityList, setShowCityList] = React.useState(false);
  const [gender, setGender] = React.useState<'male' | 'female' | ''>('');
  const [calendarType, setCalendarType] = React.useState<'solar' | 'lunar'>('lunar');

  const filteredCities = React.useMemo(() => {
    if (!searchTerm) return CITIES;
    const term = searchTerm.toLowerCase();
    return CITIES.map(province => ({
      province: province.province,
      cities: province.cities.filter(city => 
        city.toLowerCase().includes(term) || 
        province.province.toLowerCase().includes(term)
      )
    })).filter(province => province.cities.length > 0);
  }, [searchTerm]);

  const handleSelectCity = (province: string, city: string) => {
    setBirthPlace(`${province} ${city}`);
    setShowCityList(false);
    setSearchTerm('');
  };

  if (showAnalysis && birthData) {
    return (
      <BaziAnalysis
        birthData={birthData}
        onBack={() => setShowAnalysis(false)}
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-gray-50 relative flex items-center justify-center min-h-screen"
    >
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* 八卦图案 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[800px] h-[800px]">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-200/10 to-transparent origin-center"
                style={{
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </div>
        </div>

        {/* 五行文字装饰 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[600px] h-[600px]">
            {['金', '木', '水', '火', '土'].map((char, i) => {
              const angle = (i * Math.PI * 2) / 5;
              const radius = 250;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <motion.div
                  key={char}
                  className="absolute text-7xl font-bold text-gray-900/[0.03]"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.03, 0.06, 0.03],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.8,
                  }}
                >
                  {char}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 同心圆装饰 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-gray-200/10"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  left: `-${((i + 1) * 200) / 2}px`,
                  top: `-${((i + 1) * 200) / 2}px`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30 + i * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* 四角装饰 */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: 0, left: 0 },
            { top: 0, right: 0 },
            { bottom: 0, left: 0 },
            { bottom: 0, right: 0 }
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-32 h-32"
              style={pos}
            >
              <motion.div
                className="absolute w-full h-full border-2 border-gray-200/10"
                style={{
                  borderTopWidth: pos.top === 0 ? '2px' : '0',
                  borderBottomWidth: pos.bottom === 0 ? '2px' : '0',
                  borderLeftWidth: pos.left === 0 ? '2px' : '0',
                  borderRightWidth: pos.right === 0 ? '2px' : '0',
                  borderRadius: '1rem'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
              />
            </div>
          ))}
        </div>

        {/* 中心装饰 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-60 h-60 border-2 border-gray-200/20 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 relative flex flex-col items-center py-12 z-10">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 w-full">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 2,
                repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Icon 
                icon="mdi:yin-yang" 
                className="w-16 h-16 text-gray-900"
              />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 bg-clip-text text-transparent"
            >
              AI命理
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-gray-600"
          >
            传统命理与 AI 的跨时代融合
          </motion.p>
        </div>

        {/* Main Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative overflow-hidden border border-amber-100/50 w-full max-w-3xl mx-auto z-20"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-50 to-orange-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
          
          {/* Traditional Border */}
          <div className="absolute inset-0 border-2 border-amber-100/20 rounded-2xl"></div>
          <div className="absolute inset-[6px] border border-amber-50/30 rounded-xl"></div>
          
          {/* 传统装饰元素 */}
          <div className="relative">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 bg-clip-text text-transparent mb-6">八字命盘分析</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2 h-[26px]">
                  <label className="text-sm font-medium text-gray-700">出生日期</label>
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setCalendarType('solar')}
                      className={`px-6 py-1.5 text-xs rounded-md transition-all ${
                        calendarType === 'solar'
                          ? 'bg-white shadow-md text-gray-900 font-medium'
                         : 'text-gray-600 hover:bg-gray-50' 
                      }`}
                    >
                      阳历
                    </button>
                    <button
                      onClick={() => setCalendarType('lunar')}
                      className={`px-6 py-1.5 text-xs rounded-md transition-all ${
                        calendarType === 'lunar'
                          ? 'bg-white shadow-md text-gray-900 font-medium'
                         : 'text-gray-600 hover:bg-gray-50' 
                      }`}
                    >
                     农历
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={`w-full h-[38px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all ${
                      calendarType === 'lunar' ? 'bg-gray-50/50' : ''
                    }`}
                  />
                  {calendarType === 'lunar' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Icon 
                        icon="mdi:moon-waning-crescent" 
                        className="w-5 h-5 text-gray-400"
                      />
                    </div>
                  )}
                </div>
                {calendarType === 'lunar' && (
                  <p className="mt-1 text-xs text-gray-500">
                    八字排盘将使用农历日期进行计算
                  </p>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2 h-[26px]">
                  <label className="text-sm font-medium text-gray-700">出生时辰</label>
                  <div className="w-[124px]"></div>
                </div>
                <div className="relative">
                  <select
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    className="w-full h-[38px] pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all appearance-none bg-white"
                  >
                    <option value="">请选择时辰</option>
                    <option value="子时">子时 (23:00-1:00)</option>
                    <option value="丑时">丑时 (1:00-3:00)</option>
                    <option value="寅时">寅时 (3:00-5:00)</option>
                    <option value="卯时">卯时 (5:00-7:00)</option>
                    <option value="辰时">辰时 (7:00-9:00)</option>
                    <option value="巳时">巳时 (9:00-11:00)</option>
                    <option value="午时">午时 (11:00-13:00)</option>
                    <option value="未时">未时 (13:00-15:00)</option>
                    <option value="申时">申时 (15:00-17:00)</option>
                    <option value="酉时">酉时 (17:00-19:00)</option>
                    <option value="戌时">戌时 (19:00-21:00)</option>
                    <option value="亥时">亥时 (21:00-23:00)</option>
                  </select>
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Icon 
                    icon="mdi:chevron-down" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">出生地点</label>
                <div className="relative group">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowCityList(true);
                      }}
                      onFocus={() => setShowCityList(true)}
                      placeholder="搜索城市..."
                      className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all"
                    />
                    {searchTerm && (
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setBirthPlace('');
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X size={18} className="text-gray-400" />
                      </button>
                    )}
                  </div>
                  
                  {birthPlace && (
                    <div className="mt-2 px-3 py-2 bg-purple-50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-purple -500" />
                        <span className="text-sm text-purple-700">{birthPlace}</span>
                      </div>
                      <button
                        onClick={() => setBirthPlace('')}
                        className="p-1 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <X size={14} className="text-purple-500" />
                      </button>
                    </div>
                  )}

                  {showCityList && (
                    <div className="absolute w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-100 max-h-64 overflow-y-auto z-20">
                      <div className="p-2 space-y-2">
                        <div className="sticky top-0 bg-white p-2 border-b border-gray-100">
                          <div className="text-xs text-gray-500">
                            共 {filteredCities.reduce((acc, curr) => acc + curr.cities.length, 0)} 个城市
                          </div>
                        </div>
                        {filteredCities.map((province, index) => (
                          <div key={index}>
                            {province.cities.length > 0 && (
                              <>
                                <div className="sticky top-8 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-50/90 backdrop-blur-sm rounded z-10">
                                  {province.province}
                                </div>
                                <div className="mt-1 grid grid-cols-2 gap-1">
                                  {province.cities.map((city, cityIndex) => (
                                    <div
                                      key={cityIndex}
                                      onClick={() => handleSelectCity(province.province, city)}
                                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                    >
                                      <MapPin size={14} className="text-gray-400" />
                                      <span className="text-sm text-gray-600">{city}</span>
                                    </div>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                        {filteredCities.every(p => p.cities.length === 0) && (
                          <div className="text-center py-4 text-gray-500">
                            未找到相关城市
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">性别</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all appearance-none bg-white"
                  >
                    <option value="">请选择性别</option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                  <Icon 
                    icon="mdi:chevron-down" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!birthDate || !birthTime || !birthPlace || !gender) {
                  const missing = [];
                  if (!birthDate) missing.push('出生日期');
                  if (!birthTime) missing.push('出生时辰');
                  if (!birthPlace) missing.push('出生地点');
                  if (!gender) missing.push('性别');
                  alert(`请填写完整信息：${missing.join('、')}`);
                  return;
                }
                setBirthData({
                  gender: gender === 'male' ? '男' : '女',
                  solarDate: birthDate,
                  lunarDate: calendarType === 'lunar' ? birthDate : '待转换',
                  time: birthTime,
                  time: birthTime,
                  place: birthPlace
                });
                setShowAnalysis(true);
              }}
              className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white py-3 rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              开始分析
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}