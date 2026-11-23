export const START = 30;
export const DAWN = 290;

export const districts = {
  shibuya: { name: '涩谷', ja: '渋谷', en: 'SHIBUYA', note: '末班电车的站外', color: '#f393b9', point: [73, 223], label: [-10, 24], route: 'mio' },
  shinjuku: { name: '新宿黄金街', ja: '新宿ゴールデン街', en: 'SHINJUKU', note: '最后一盏门灯', color: '#f1b778', point: [117, 92], label: [-12, -14], route: 'ren' },
  akihabara: { name: '秋叶原', ja: '秋葉原', en: 'AKIHABARA', note: '售货机旁的耳机', color: '#9fbbfa', point: [302, 107], label: [-89, 27], route: 'yui' },
  asakusa: { name: '浅草 · 隅田川', ja: '浅草・隅田川', en: 'ASAKUSA', note: '河风里的手写信', color: '#9fddc9', point: [382, 50], label: [-5, -13], route: 'suzu' },
  tower: { name: '东京塔', ja: '東京タワー', en: 'TOKYO TOWER', note: '灯灭后的坂道', color: '#f4b188', point: [262, 231], label: [14, 16] },
};

export const heroines = {
  mio: { name: '白石 澪', short: '澪', kana: 'しらいし みお', color: '#f393b9', district: 'shibuya', role: '摄影助理', bio: '替别人修了两年的照片，今夜只剩底片最后一格。' },
  ren: { name: '橘 莲', short: '莲', kana: 'たちばな れん', color: '#f1b778', district: 'shinjuku', role: '小酒馆店长', bio: '酒馆的钥匙还在她手里，店里的钟却已经交给了下一任主人。' },
  yui: { name: '七濑 结衣', short: '结衣', kana: 'ななせ ゆい', color: '#9fbbfa', district: 'akihabara', role: '音响维修学徒', bio: '随身带着录音器，总想从噪声里辨出一点值得留下的东西。' },
  suzu: { name: '雨宫 铃', short: '铃', kana: 'あまみや すず', color: '#9fddc9', district: 'asakusa', role: '旧书修复师', bio: '包里有本借了十一年的书，书中夹着一封写给母亲的信。' },
};

const narration = (text) => ({ text });
const line = (text, expression = 'neutral', pose = 'still', warm = false) => ({ text, expression, pose, warm, spoken: true });
const choice = (label, cost, affection, ...reply) => ({ label, cost, affection, reply });
const opening = (text, cost, ...reply) => choice(text, cost, 0, ...reply);

export const prologue = {
  district: 'shibuya',
  title: '门已经关了',
  lines: [
    narration('凌晨零点三十分，涩谷。闸机上最后一行绿色的字熄灭，我刚好踩着自己的倒影赶到。'),
    narration('白天，我替公司把工牌寄回去。晚上，我差点给自己订了去海边的票。此刻，两件事之间只隔着一座关了门的车站。'),
    narration('站员从玻璃后欠了欠身。「おつかれさまです。始発は四時五十分です。」'),
    narration('手机电量只剩百分之十二，够看地图。第一班车以前，在东京，脚就是时刻表。'),
  ],
  choices: [
    opening('沿着屋檐走到街角', 12, narration('我绕开水洼，雨从屋檐一滴一滴地落下来。有人在街角给胶卷相机上弦。')),
    opening('帮站员收起湿透的路牌', 22, narration('我们把路牌推到墙边。站员递来两张干纸巾，只收走了其中一张，说另一张我总会用得上。')),
  ],
};

export const routes = {
  mio: [
    {
      title: '最后一格',
      lines: [
        narration('便利店门口积着一掌宽的水。有人蹲在旁边，镜头跟水面几乎平行。'),
        line('先别动。你鞋尖旁边那块红色，是信号灯。再一步，它就散了。', 'resolve'),
        line('刚才忙着从客户的六百张照片里删掉闭眼的那张。抬头的时候，站外也只剩一张闭着眼的门。', 'wry'),
        line('我叫白石澪。这卷还剩一格。你要不要猜，我已经舍不得按多久了？', 'neutral', 'offer'),
      ],
      choices: [
        choice('替她挡住便利店刺眼的白光', 35, 3, narration('我站到灯和积水之间。风把塑料棚吹得像一张正要撕开的相纸。'), line('そう、それ。你别看镜头。等它自己在水里亮。', 'smile'), line('好。谢谢。剩下那一格，我突然没那么想留到以后了。', 'smile')),
        choice('轮流拍一张手机照片', 27, 1, line('手机也好。它不需要你先答应一张照片有多重要。', 'wry'), narration('我们的取景框各自亮了一下。澪把胶卷相机重新挂回胸前。')),
      ],
    },
    {
      title: '剪掉的那半张',
      lines: [
        narration('天桥下避风。澪从相机套里抽出一张有折痕的合照，把照片往我这边转。'),
        line('我妈拍的。她永远只拍到我一半，另一半是她没来得及收回去的指头。', 'wry', 'still', true),
        line('我替别人修片，第一个动作就是把这种地方剪掉。这张，我剪了二十一回，每回都撤销。', 'sad', 'still', true),
        line('如果是你呢？', 'neutral', 'offer', true),
      ],
      choices: [
        choice('请她指给我看照片里妈妈的位置', 27, 3, line('这儿。玻璃上有个影子。你看见了吗？', 'surprise', 'offer', true), line('原来取景框外面也可以是家。', 'smile', 'still', true)),
        choice('把照片还给她，去买两杯热茶', 13, 1, narration('她把纸角一一压平。等我把茶递过去时，那张照片已经回到相机套最里面。'), line('ありがとう。烫的东西总比我说话快。', 'sad', 'offer', true)),
      ],
    },
    {
      title: '一起洗出来',
      promiseChoice: 0,
      lines: [
        line('我约了九点看一间小暗房。没有雇主，也没有约片，就是我自己想去看。', 'resolve', 'hold', true),
        line('如果我拍得很差，可以第一个给你看吗？你不用说好看。', 'shy', 'hold', true),
        narration('她把相机翻过来，让我听见卷片杆很轻的一声。胶卷走到了底。'),
      ],
      choices: [
        choice('请她把洗照片的地址写给我', 29, 3, line('字会歪，因为我很高兴。……見ないで。等我写完。', 'smile', 'offer', true), narration('她在地址后画了一枚空的方框，预留给还没有拍到的画面。')),
        choice('约好各自拍下天亮的一刻', 12, 0, line('好呀。就从你站着的地方拍。', 'wry', 'still', true), narration('她向我晃了晃相机，快门盖还好好地盖着。')),
      ],
    },
    {
      title: '空白相框',
      requiresPromise: true,
      lines: [
        narration('澪把一张拍废的拍立得举到灯前。上面只有一块浅灰，左上角还有她的指纹。'),
        line('这张我本来要扔掉。其实它挺像你刚才替我挡灯的时候。只记得站在那里，记不得你穿了什么。', 'shy', 'hold', true),
        line('要不要替它背面写一句？我送你。', 'smile', 'offer', true),
      ],
      choices: [
        choice('写下「比末班车晚一点」', 16, 0, line('好。我也要一张空白的，写「比第一班车早一点」。', 'smile', 'hold', true)),
        choice('把拍立得夹进车票一起收好', 8, 0, narration('车票比相纸窄一截，两张叠在一起，正好露出那枚指纹。')),
      ],
    },
    {
      title: '焦点在这里',
      requiresPromise: true,
      lines: [
        narration('天桥的楼梯上，澪把背包垫在第二级台阶上，让相机可以自己站稳。'),
        line('我妈拍那张的时候，喊我往左。我以为左边有更好的光。后来才知道，她是想挤进来。', 'tender', 'hold', true),
        line('这次也给我留一点地方。你站这儿，我去按定时。……あ、待って。你想站哪边？', 'laugh', 'hold', true),
      ],
      choices: [
        choice('站进画面，叫她也别再往边上让', 14, 2, line('听见了。两个人都要留全。那我过来啦。', 'shy', 'wave', true), narration('定时灯连闪三下，澪在最后一下赶到我旁边。')),
        choice('一起对着玻璃里的倒影试拍', 8, 1, line('这样一来，连我举着相机的手也在里面。好，别动。', 'tender', 'hold', true)),
      ],
    },
    {
      title: '显影盘里还空着',
      requiresPromise: true,
      lines: [
        narration('澪把看暗房的地址抄了两份。她那张剪掉了一角，我这张还完整。'),
        line('以前别人问我会不会拍照，我都说我会修。那两个字说得好快，根本来不及害怕。', 'uneasy', 'reflect', true),
        narration('我说，白天寄走工牌的时候，快递单上也问我做什么。我照着工牌填完，才想起那份工作已经结束了。'),
        line('你愿意陪我进去吗？也许第一张洗出来的只有一片灰。我们可以拿一张废纸，在旁边记下是怎么弄错的。', 'hopeful', 'offer', true),
      ],
      choices: [
        { ...choice('答应陪她进暗房，一起洗第一张', 12, 2, line('那我带两条围裙。黑的给你，另一条我总算找到理由拆封了。', 'relieved', 'hold', true)), followUp: true },
        choice('请她先独自看看，约好在站前拍照', 7, 0, line('好啊。有一扇门我想自己推。推完了就回站前找你。', 'relieved', 'still', true)),
      ],
    },
  ],
  ren: [
    {
      title: '本日休業',
      lines: [
        narration('黄金街最窄的那条巷子里，一位女人踮着脚，从门外摘下一串灯笼。'),
        line('打烊了。要是你是来催物业费的，建议你明天再生气。', 'wry', 'crossed'),
        line('哦，也没赶上？我数着抽屉里的零钱，数到第三遍，听见巷口最后一拨上车的人走了。'),
        line('橘莲。今天算前店主。钥匙明早才交，进来吧，白开水还是免费的。', 'smile', 'offer'),
      ],
      choices: [
        choice('和莲一起把六把椅子翻到桌上', 36, 3, line('第六把要小心，右后腿比别处短。那是我爸以前最喜欢的位置。', 'surprise'), line('よいしょ。行，你抬得挺稳。站末班车里也能把别人扶住的那种。', 'smile')),
        choice('留在门边喝完那杯水', 27, 1, line('好。用那个矮杯，杯口缺了一点的是我自己的。', 'neutral', 'offer'), narration('莲把一把快散架的椅子往里踢了踢，给我让出半步。')),
      ],
    },
    {
      title: '给常客的账单',
      lines: [
        line('我爸把记账本叫通讯录。有人欠钱，有人只欠一张没寄到的明信片。', 'wry', 'crossed', true),
        line('他走了以后，我把每条裂缝都补过，想象把缝填完他就会推门。明天接手的人说要拆掉吧台。', 'sad', 'still', true),
        line('我该拿走一块木头吗？那个钉子总勾破我袖子。', 'neutral', 'offer', true),
      ],
      choices: [
        choice('提议在旧账本里写下吧台的样子', 26, 3, narration('我按住被夜风掀起的账页。莲画了个粗糙的长方形，又添上那颗钉子。'), line('账单最后一栏：「橘莲，欠自己一个星期的假」。啧，写大一点。', 'wry', 'offer', true)),
        choice('找块布把木片包起来', 14, 1, narration('她剥下一小块翘起的漆，用旧擦杯布包好。'), line('放我右边口袋。左边留给钥匙。', 'neutral', 'offer', true)),
      ],
    },
    {
      title: '锁门的人',
      promiseChoice: 0,
      lines: [
        line('我订了上野的早饭，七点。地址查好了，还偷偷看过店员几点把蒸笼搬出来。', 'smile', 'still', true),
        line('先声明啊，我只会煮茶泡饭。别指望有人每天给你开店。', 'wry', 'crossed', true),
        narration('她把钥匙插进门锁，转到一半停住。'),
        line('我数到三，你陪我听一声？', 'resolve', 'hold', true),
      ],
      choices: [
        choice('陪她锁门，答应一起等第一笼包子', 28, 3, line('いち、に、さん。……咔。就这点动静啊。', 'surprise', 'still', true), line('走吧。两个人的话，可以点两种馅。', 'smile', 'offer', true)),
        choice('把门前一小段路留给她自己走', 12, 0, line('行。我的意思是，真的行。おやすみ。', 'smile', 'still', true), narration('我走到巷口才听见锁舌响。紧接着，比那更轻的，是一串脚步。')),
      ],
    },
    {
      title: '巷口的冰箱',
      requiresPromise: true,
      lines: [
        narration('巷口还剩一台冰箱嗡嗡响。莲从围裙的夹层里掏出一枚五百日元硬币。'),
        line('我爸每次下班都买这个。买完说是请我的，结果总喝掉一半。', 'wry', 'hold', true),
        line('今夜我请客。先挑你爱喝的，再挑我爱喝的。拿好，烫。', 'shy', 'offer', true),
      ],
      choices: [
        choice('请莲教我用两罐咖啡和旧店碰杯', 15, 0, line('别敲罐口，里面会溅。碰这儿。……おつかれ、二人とも。', 'smile', 'hold', true)),
        choice('揣一罐在口袋里暖手', 8, 0, line('聪明。反正等到站台上，谁喝了才算谁的。', 'wry', 'crossed', true)),
      ],
    },
    {
      title: '背面的招牌',
      requiresPromise: true,
      lines: [
        narration('装店门招牌的纸箱已经打好了包。莲把封箱胶带撕开，只够从里面抽出一块木板。'),
        line('翻过来。第一天试营业，我爸写的是「店主不在」。我在吧台站了一整天，他照样这么写。', 'laugh', 'hold', true),
        line('那会儿我真生气。今天想想，也许他只是希望我早点出去玩。你有笔吗？', 'tender', 'offer', true),
      ],
      choices: [
        choice('把笔递给莲，请她签上自己的名字和日期', 13, 2, line('好。写完借我一下你肩膀。这块木头比看上去沉。', 'shy', 'hold', true)),
        choice('替她按住翘起的纸箱边', 8, 1, line('多按十秒。こっち、こっち。行了，到家我再拆一回。', 'resolve', 'hold', true)),
      ],
    },
    {
      title: '一把备用钥匙',
      requiresPromise: true,
      lines: [
        narration('莲从钥匙圈上挑下一把没配齿的小铜片，摊在手心给我看。'),
        line('我爸第一次带我来，说有把备用的。其实他只是想给我一件响起来像钥匙的东西。', 'nostalgic', 'offer', true),
        line('我想从早饭店给接手的人写张纸条。后门最下面那块木板会进水，她开店第一天用不着自己发现。你陪我写吗？', 'hopeful', 'hold', true),
      ],
      choices: [
        { ...choice('约好吃完早饭一起送交接信', 12, 2, line('好。写完我还想问她，改天能不能来坐一回第六把椅子。', 'relieved', 'offer', true)), followUp: true },
        choice('把铜片还给她，约好只管吃早饭', 7, 0, line('成交。两笼都上来之前，我一句开店的话都不讲。', 'laugh', 'crossed', true)),
      ],
    },
  ],
  yui: [
    {
      title: '左声道',
      lines: [
        narration('秋叶原整条街的卷帘门都落下来。唯一还嗡嗡响着的，是一家旧电器店旁的售货机。'),
        line('停。听左边。不是我左边，是你左边。那个低音，每十一秒跳一次。', 'resolve', 'offer'),
        line('七濑结衣。店里的返修机今晚终于通电，我把测试做了十七遍。第十八遍，末班车没了。', 'wry'),
        line('借你一边耳机。手指碰到插头的时候，千万别道歉，噪声音量太大我听不见。', 'smile', 'offer'),
      ],
      choices: [
        choice('戴上耳机，等机器完整地跳一次', 37, 3, narration('十一秒里，一辆卡车远去，两罐热咖啡落下来。嗡声终于轻轻偏了一次。'), line('你刚才也抬眉毛了。よし，双人盲测通过。', 'smile', 'offer')),
        choice('买一罐热咖啡给她测滚落声', 27, 1, line('叮、咚。你选的这罐比我那罐低一个全音。', 'surprise'), narration('结衣在袖口擦掉罐底的水，打开录音器重新录了一遍。')),
      ],
    },
    {
      title: '空白的十七秒',
      lines: [
        line('我哥搬走前寄过一段录音。没有“保重”，只有钥匙落进瓷碗的声音。', 'neutral', 'still', true),
        line('我把合租房墙上所有钉子拔了，连碗也收了。现在我每天路过一整面干干净净的墙。', 'sad', 'still', true),
        line('我想采一段这里的声音寄给他。可录音一开，我就纠结第一秒应该放什么。', 'resolve', 'offer', true),
      ],
      choices: [
        choice('请她先收一段两个人都不开口的声音', 29, 3, narration('我们并排坐下，呼吸和远处的货车被录成了两条细细的线。'), line('标记：空白十七秒，有人和我一起听。……这标签太长了。很好。', 'smile', 'offer', true)),
        choice('帮她把钥匙落进空咖啡罐', 12, 1, line('脆一点，还是这个方向。听，碗的尾音差不多。', 'resolve', 'offer', true)),
      ],
    },
    {
      title: '按下发送',
      promiseChoice: 0,
      lines: [
        line('我常常把最后一步说成“再做一次测试”。店长已经拿这事写过三次维修备注。', 'wry', 'crossed', true),
        line('这一段我取名叫《给你》。不做第十九次了。', 'resolve', 'hold', true),
        line('能把你那边的耳机先还我一下吗？我想听听你会怎么给我倒数。', 'neutral', 'offer', true),
      ],
      choices: [
        choice('陪她按下发送，再听一遍凌晨的录音', 27, 3, line('发送成功。嗯？这么小一声？等一下，我把它记下来。', 'surprise', 'offer', true), line('再借你一边。左声道我特地给你留了位置。', 'smile', 'still', true)),
        choice('让她在准备好时自己发出录音', 11, 0, line('了解。给一条消息留一点静音，好像也不坏。', 'smile', 'still', true)),
      ],
    },
    {
      title: '临时片尾',
      requiresPromise: true,
      lines: [
        line('想不想玩个测试？随便哼两个音。我要找一个比售货机更容易记住的开机音。', 'smile', 'hold', true),
        narration('我哼完，结衣用指甲在录音机背面轻轻弹了一下。'),
        line('现在是三个音。把最后那个算我一半，可以吧？', 'shy', 'hold', true),
      ],
      choices: [
        choice('请她把三个音高逐个弹出来', 16, 0, line('叮、叮、咚。欸，前两个原来这么接近。比我们刚见面时站得近。', 'smile', 'still', true)),
        choice('把这一版存在她的录音器里', 8, 0, line('存好了。文件名？先用你手机上的名字。', 'wry', 'offer', true)),
      ],
    },
    {
      title: '左右互换',
      requiresPromise: true,
      lines: [
        narration('结衣把耳机拔出来，录音器的小扬声器立刻发出很轻的风声。'),
        line('小时候我哥老说我把左右戴反。我当然知道。把另一边扣到床垫里，他就能边写作业边听我的那边。', 'tender', 'hold', true),
        line('现在可以外放。给我选一个音量？再大一点也行，这条巷子是我们的。', 'laugh', 'wave', true),
      ],
      choices: [
        choice('把音量转过一格，录下我们跟着哼的三音', 14, 2, line('试听通过。第二遍的时候我们再唱齐。第一遍给我留着。', 'shy', 'hold', true)),
        choice('把录音器放在两个人中间一起听', 8, 1, line('左右声道重叠了。こういうのも、いいね。', 'tender', 'hold', true)),
      ],
    },
    {
      title: '一分钟，原样保留',
      requiresPromise: true,
      lines: [
        narration('录音器弹出“空间不足”。结衣把拇指悬在删除键上，屏幕列着十七段几乎一模一样的测试。'),
        line('我以为总会有一个完美版本。其实这十七次里，每次跑掉的东西都不一样。', 'uneasy', 'hold', true),
        line('我想做一份可以寄给别人听的夜间地图。留一分钟给这里？就从我按键的咔哒声开始。', 'hopeful', 'offer', true),
      ],
      choices: [
        { ...choice('留下原声，约好用始发车补完这份地图', 12, 2, line('行，你报地点，我按键。卡壳也接着说，我们的地图可以有死胡同。', 'relieved', 'hold', true)), followUp: true },
        choice('请她把剩下的一分钟留给自己', 7, 0, line('那我留给自己。要是哪天忘了这里长什么样，就从这声咔哒开始找。', 'tender', 'hold', true)),
      ],
    },
  ],
  suzu: [
    {
      title: '借阅日期',
      lines: [
        narration('隅田川的栏杆摸上去有些湿。一页纸压在长凳上，一个戴眼镜的人把手掌轻轻按在上面。'),
        line('劳驾，可以替我拿一下书吗？请托住书脊。这本的左边已经有些松。', 'neutral', 'offer'),
        line('雨宫铃。我在店里等最后一道补纸晾干才关门，慢了七分钟。走出车站时，才想起我妈以前也常在这里等天亮。'),
        line('她借我的书，已经过期十一年了。もしよかったら……我可以念一下封面吗？', 'sad'),
      ],
      choices: [
        choice('托住书脊，听她从封面读到扉页', 36, 3, narration('她从印着书名的蓝布摸到封底，把手写的借阅日期一字一字念出来。'), line('谢谢。这个数字我在家时，总是读得很快。', 'smile', 'still', true)),
        choice('帮她把书移到桥下避风的台阶上', 27, 1, narration('风在桥孔上方打转，台阶却是干的。她把书放到自己的膝盖上。'), line('真好。比我刚才给它找的位置稳妥。', 'smile')),
      ],
    },
    {
      title: '河流这一页',
      lines: [
        line('母亲以前说，入海的河流，其实也会往回涨。我写信时老在想这句话。', 'neutral', 'still', true),
        line('她生病的那几年，我没敢告诉她，我已经想搬到东京。后来我真的搬了，门牌号却一个字也没写进信里。', 'sad', 'still', true),
        line('我应该从“对不起”开始，还是从新地址开始？', 'resolve', 'offer', true),
      ],
      choices: [
        choice('请她说说每天从新家窗户看到什么', 28, 3, line('一户人家的薄荷。周三先晒被子，周五倒垃圾。偶尔有人在下面等我。', 'smile', 'still', true), narration('她翻到空白的一页，在纸上写下了门牌号。')),
        choice('借给她一支笔，让她慢慢写', 13, 1, line('钢笔啊。谢谢。那我先写今天的日期。', 'surprise', 'offer', true)),
      ],
    },
    {
      title: '寄给日常',
      promiseChoice: 0,
      lines: [
        narration('铃把信纸折得很小，正好嵌进书的卷首。河对岸一扇窗开了灯。'),
        line('有一页我没有修。我妈折的。想读那里的时候，只要把指头伸进去就可以。', 'smile', 'offer', true),
        line('早上的书店会开门。里面有一扇窗，能看见这条河从我们身边拐过去。', 'neutral', 'still', true),
        line('我留了两个座位。可以有一个是你吗？', 'shy', 'hold', true),
      ],
      choices: [
        choice('答应坐在她旁边，一起读折起的那一页', 27, 3, line('はい。……我明明练习了好几遍，说起来还是很短。', 'smile', 'offer', true), narration('她把信角扶正，给我的手指留出了翻页的空隙。')),
        choice('请她代我看看早晨的河水', 12, 0, line('好。看完了，我会在信后面再添一行。', 'smile', 'still', true)),
      ],
    },
    {
      title: '不必归还的书签',
      requiresPromise: true,
      lines: [
        narration('铃在书套里摸出一根浅绿色的布条。布边很好看，藏着两针颜色不同的线。'),
        line('我以前会把补剩的布丢掉。这一块太软了，就一直留着。', 'neutral', 'hold', true),
        line('请收好。你只要用它夹一次，我就能知道你后来翻的是哪一页。', 'shy', 'offer', true),
      ],
      choices: [
        choice('用书签夹住写了新地址的那一页', 16, 0, line('那下次我就抄好门牌号，请你来喝茶。', 'smile', 'hold', true)),
        choice('替她把书签收进书套', 8, 0, line('好的。借你用的那一份，我先替你收着。', 'smile', 'still', true)),
      ],
    },
    {
      title: '窗边两把椅子',
      requiresPromise: true,
      lines: [
        narration('书店还没开门。隔着玻璃，铃用手指给我比划她留的位置。'),
        line('靠窗那把椅子有点矮。我平时给来补书的客人坐高的。今晚可以都试试，看哪把坐着更自在。', 'tender', 'hold', true),
        line('还有件事。我家窗台上要种薄荷了。おすそ分け、よかったら。等长出新叶，分给你一些。', 'shy', 'wave', true),
      ],
      choices: [
        choice('一起在纸上画出两把椅子和一盆薄荷', 14, 2, line('我会把它留下。下次你来，可以亲手添画一片叶子。', 'laugh', 'hold', true)),
        choice('约好把舒适的椅子留给先到的人', 8, 1, line('那我也许要早起一点。早上风小，过桥会快一些。', 'tender', 'hold', true)),
      ],
    },
    {
      title: '信封上的空行',
      requiresPromise: true,
      lines: [
        narration('铃用袖子擦去栏杆上的水，把信和一枚没有盖过戳的邮票摆在一起。'),
        line('我一直没写收信人。写我妈的名字，邮差不知道怎么送。写我自己，我又怕到时拆开会哭。', 'uneasy', 'reflect', true),
        line('要不寄到书店？我在那里有一把裁纸刀，也有一把空椅子。等信到了，你愿意坐过来吗？', 'hopeful', 'offer', true),
      ],
      choices: [
        { ...choice('答应陪她寄出这封信，等它回到书店', 12, 2, line('那我写自己的名字。邮差上次把“铃”读作“玲”，这次我把偏旁写清楚一点。', 'relieved', 'hold', true)), followUp: true },
        choice('把邮票收进折页，约好先去读书', 7, 0, line('好。等我想寄的时候，它也还在这里。', 'tender', 'hold', true)),
      ],
    },
  ],
};

export const towerEvent = {
  district: 'tower',
  title: '没有亮的那一层',
  lines: [
    narration('饭仓的坂道上，风比街上高了半层楼。东京塔只剩航空灯亮着。'),
    narration('护栏上刻着一行浅浅的「またね」。下面有个没写完的日期，雨水把最后一位数字填平了。'),
    narration('我口袋里还装着白天摘下的工牌套。塑料里夹着一张再也不必带去上班的通勤图。'),
  ],
  choices: [
    choice('在塔下重画一张明早要走的路线', 26, 0, narration('我把通勤图翻面，画了一条经过面包店和公园的路。天亮以后，我可以走那边。')),
    choice('在坡顶看一会儿，再收起通勤图', 10, 0, narration('铁塔的灯眨了一下。我沿着楼梯走回街边，纸在口袋里悉悉索索。')),
  ],
};

export const endings = {
  mio: {
    title: '曝光之前', ja: 'シャッターの前に', district: 'shibuya', character: 'mio',
    summary: '她把清晨的第一张底片留给了你们。',
    lines: [
      narration('四点五十分。始发列车的灯从桥下滑过去。澪扬起相机，对着还没开店的早餐铺。'),
      line('我把新一卷装反了。猜猜看，这次我用了几秒才承认？', 'wry', 'offer', true),
      narration('我伸手托住相机背盖。她没有松手，把额头靠在我的肩膀上等我回答。'),
      line('早上好。おはよう。今天的第一张，给我们拍。', 'smile', 'still', true),
    ],
    coda: [line('对了，暗房冲出楼梯上那张以后，我想做两份。你也挑一个相框吧。', 'tender', 'hold', true)],
    after: [
      narration('开早餐铺的人把门推开，看我们还挨在一起，以为是忘了带伞，便从门后递来一把。'),
      line('谢谢。那借我们用一分钟？我想用里面的白色挡一下光。', 'hopeful', 'offer', true),
      narration('我撑开伞，站回她指给我的位置。这一次，澪在按下快门之前先走了过来。'),
    ],
  },
  ren: {
    title: '第二份早点', ja: 'ふたりぶんの朝', district: 'shinjuku', character: 'ren',
    summary: '两笼包子上桌，莲第一次坐在等饭的那一边。',
    lines: [
      narration('四点五十分。车站通道里第一台扶梯启动了。莲把钥匙放进交接用的信封，拇指在封口压了一遍。'),
      line('等我吃完，我要给自己放假。我爸以前说，休店那天也算一天。', 'neutral', 'offer', true),
      narration('她终于把落在我肩上的线头摘掉，又顺手牵住了我的手。'),
      line('早。さ、行こう。走那么快干嘛？这回又不用赶末班。', 'smile', 'offer', true),
    ],
    coda: [line('我想好了，等会儿把招牌挂到自家厨房。明天换你写。写什么都行，别写“店主不在”。', 'laugh', 'crossed', true)],
    after: [
      narration('七点过两分，店员掀开蒸笼。莲习惯性地伸手去端，手到一半，又缩了回来。'),
      line('原来坐着等别人端过来，手会不知道放哪儿。让我练习一会儿。', 'relieved', 'still', true),
      narration('她把手放在桌上，掌心朝上。我把筷子递过去，过了一会儿，才想起来她可能没在等筷子。'),
    ],
  },
  yui: {
    title: '给你的左声道', ja: '左耳に届く朝', district: 'akihabara', character: 'yui',
    summary: '第一班车驶进秋叶原时，结衣留了一声只说给你听的早安。',
    lines: [
      narration('四点五十分。站台风吹响了防护网。结衣哥哥回了三个字：收到啦。后面另附一段录音。'),
      line('他买了个新碗。音色比原来亮。', 'surprise', 'offer', true),
      narration('耳机短得需要靠得很近。她把录音按停，让列车从耳机外面经过。'),
      line('稍等。这个留在现场。……おはよう。你听清了吧，我只说一次。', 'smile', 'still', true),
    ],
    coda: [line('不过那三个音可以再唱一次。你唱前两个。我走到你左边去。', 'tender', 'hold', true)],
    after: [
      narration('上车以后，她在通话框里打了半天字，最后回给哥哥一张窗外的照片。画面左边全是我的袖子。'),
      line('他说下次可以直接打电话。那我下次就不带机器了。耳机还是要带的，我答应过给你一边。', 'relieved', 'hold', true),
    ],
  },
  suzu: {
    title: '折页里的光', ja: '折り目の光', district: 'asakusa', character: 'suzu',
    summary: '书店开门之后，书页从你们一起压住的地方往下读。',
    lines: [
      narration('四点五十分。第一班车从河另一侧开出去，把桥底照亮了一瞬。铃把书摊在我们之间。'),
      line('我在地址下面又加了一行。“如果春天来，请在门口稍等一下。”', 'neutral', 'offer', true),
      narration('风翻过许多页，最后停在那道旧折痕上。她用指尖压住书页，另一只手握住我的手。'),
      line('おはようございます。可以从这里开始读吗？我们还有一整天。', 'smile', 'still', true),
    ],
    coda: [line('书里那户人家也养薄荷。念到那里请停一下，我想听听你家窗外有什么。', 'tender', 'hold', true)],
    after: [
      narration('店主来开门时给我们提了水壶。铃试了低一点的椅子，坐下以后刚好能看见我的眼睛。'),
      line('我读到句号会停一停。你想说什么，就在我换气的时候说。', 'hopeful', 'hold', true),
      narration('窗外，第一艘清早的船正从桥下经过。铃念完第一句，果然停了下来。'),
    ],
  },
  tower: {
    title: '坂道向晨', ja: '坂道の朝', district: 'tower',
    summary: '我沿着折过的通勤图走下坡，在面包店的绿灯前停了一次。',
    lines: [
      narration('四点五十分。远处第一班车已经开动，东京塔在天光里显出一格一格的钢骨。'),
      narration('我拿出那张画过的通勤图，把「公司」那一站沿虚线折到背面。'),
      narration('坡底有一家面包店拉开半扇窗。绿色的小灯亮了。我朝那盏灯走过去。'),
    ],
    after: [
      narration('店里还没挂牌子。炉边的人问，是照旧吗？看清我的脸才说，抱歉，你和每天这个点来的那个人背着一样的包。'),
      narration('我说，今天第一次来。她从烤盘上掰了一个面包给我，叫我明天路过就试试另一种。'),
      narration('我把面包店写到地图上。写完才发现，那支笔原来一直夹在工牌套里。'),
    ],
  },
  solo: {
    title: '下一站，天亮', ja: '次は、朝', district: null,
    summary: '收据背面留着一个空白地名。可以等到了地方再写。',
    lines: [
      narration('四点五十分。站台的广播刚响，一名清洁员从里面把玻璃门推开。'),
      narration('我没有订去别处的票。口袋翻出来，只找到一张被雨打皱的收据。'),
      narration('我在背面写下今晚走过的路，把最后一个地名留空。列车门开了，天空才开始变亮。'),
    ],
    after: [
      narration('车里还有座位。我坐到能看见玻璃上倒影的那一侧，给自己买了一张下午到海边的票。'),
      narration('付款以前，我先查了一遍回程。付完款，把手机翻过去，安安静静地看完了第一座桥。'),
    ],
  },
  mioAfter: {
    title: '第一盆显影液', ja: '最初の一枚が浮かぶまで', district: 'shibuya', character: 'mio',
    rendezvous: '与澪会合，一起去暗房', summary: '红灯亮着，浅盘里慢慢浮出你们都在场的一刻。',
    expression: 'hopeful', pose: 'hold',
    lines: [
      narration('四点五十分。澪跳下天桥最后两级台阶。她手里拿着那张剪去一角的地址。'),
      line('拿两张做什么呢？反正现在是一起走。', 'relieved', 'offer', true),
      narration('九点，暗房的卷帘门升起来。里面的人教我们关门，再教我们怎么在看不清彼此时递东西。'),
      line('黑围裙，往左举一下。好，我接住了。', 'resolve', 'hold', true),
      narration('红灯下，照片先浮出天桥的栏杆，然后是两只手。一只抓着相机的背带，另一只抓着那个人的衣袖。'),
      line('你看，底下还留着空。我们把两个人的名字都写上吧。写错了也留着。', 'hopeful', 'hold', true),
    ],
  },
  renAfter: {
    title: '第六把椅子', ja: '六つ目の椅子', district: 'shinjuku', character: 'ren',
    rendezvous: '与莲会合，一起送交接信', summary: '写完交接信，她留下一样明天还能回去拿的东西。',
    expression: 'relieved', pose: 'offer',
    lines: [
      narration('四点五十分。莲把信封揣进外套。车站门开了，她问我过街时要不要牵着她。'),
      line('我放假了。找个理由牵手这种事，也能外包吧？', 'wry', 'offer', true),
      narration('吃完早饭，我们沿原路回到黄金街。她在新店主门口的砖阶上坐下，膝盖上垫着写了一半的交接信。'),
      line('后门渗水。冰铲在窗台下。第六把椅子……这一行该怎么写才不会被当成麻烦？', 'uneasy', 'hold', true),
      narration('我说，就写想坐。莲照着写了，又用钥匙圈上的旧铜片把信压在门缝下。'),
      line('好了。要是她问这把钥匙开哪儿，我就进去喝一杯，慢慢讲。', 'nostalgic', 'still', true),
      narration('她站起来，把我也拉起来。那天她从旧店门口走过两次，第二次轻了许多。'),
    ],
  },
  yuiAfter: {
    title: '沿途有声', ja: '途中の音を残して', district: 'akihabara', character: 'yui',
    rendezvous: '与结衣会合，录完有声地图', summary: '这份东京地图里，每个地点都能用耳朵找到。',
    expression: 'laugh', pose: 'hold',
    lines: [
      narration('四点五十分。秋叶原站台边，结衣抬起两根手指。灯亮的时候，她收起了一根。'),
      line('开始。现在的声音叫进站。接下来是什么，你报。', 'resolve', 'hold', true),
      narration('我报了半个“秋”，正好被列车的气阀盖掉。我们都笑了，直到车门再次关上。'),
      line('留下。等我哥听到这里，他肯定知道“秋”后面是几个字。', 'laugh', 'hold', true),
      narration('她给录音起名《沿途有声》，附上一张我在纸上画的图。售货机、卷帘门和始发车，三处都有一个时间戳。'),
      line('末尾还有五秒。以后想起来了，就往这五秒后面加。下回谁先开口都行。', 'hopeful', 'offer', true),
    ],
  },
  suzuAfter: {
    title: '寄到今天的信', ja: '今日に届く手紙', district: 'asakusa', character: 'suzu',
    rendezvous: '与铃会合，一起去投信', summary: '写给过去的话，从今早开始有了一个收件地址。',
    expression: 'relieved', pose: 'hold',
    lines: [
      narration('四点五十分，桥下的铁轨响起来。铃把折好的信交给我，请我念一遍收件地址。'),
      line('门牌号对。收件人的名字……也对。嗯，替我拿一会儿好吗？我想看看天。', 'uneasy', 'offer', true),
      narration('开门的第一家店把木凳搬到了街上。再过一个拐角，红邮筒的投信口比我们想的窄一些。'),
      line('我在信末尾又写了一句。今年我会种薄荷。如果比她养的矮，也留着喝茶。', 'hopeful', 'hold', true),
      narration('我们把信从窄口送进去，听见它落到底部。'),
      line('到了我就找你。你可以先读地址，读慢一点。剩下的，我们坐下来再读。', 'relieved', 'hold', true),
    ],
  },
};
