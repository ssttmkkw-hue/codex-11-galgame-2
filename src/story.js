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
      promiseScene: true,
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
      promiseScene: true,
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
      promiseScene: true,
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
      promiseScene: true,
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
    lines: [
      narration('四点五十分。始发列车的灯从桥下滑过去。澪扬起相机，对着还没开店的早餐铺。'),
      line('我把新一卷装反了。猜猜看，这次我用了几秒才承认？', 'wry', 'offer', true),
      narration('我伸手托住相机背盖。她没有松手，把额头靠在我的肩膀上等我回答。'),
      line('早上好。おはよう。今天的第一张，给我们拍。', 'smile', 'still', true),
    ],
  },
  ren: {
    title: '第二份早点', ja: 'ふたりぶんの朝', district: 'shinjuku', character: 'ren',
    lines: [
      narration('四点五十分。车站通道里第一台扶梯启动了。莲把钥匙放进交接用的信封，拇指在封口压了一遍。'),
      line('等我吃完，我要给自己放假。我爸以前说，休店那天也算一天。', 'neutral', 'offer', true),
      narration('她终于把落在我肩上的线头摘掉，又顺手牵住了我的手。'),
      line('早。さ、行こう。走那么快干嘛？这回又不用赶末班。', 'smile', 'offer', true),
    ],
  },
  yui: {
    title: '给你的左声道', ja: '左耳に届く朝', district: 'akihabara', character: 'yui',
    lines: [
      narration('四点五十分。站台风吹响了防护网。结衣哥哥回了三个字：收到啦。后面另附一段录音。'),
      line('他买了个新碗。音色比原来亮。', 'surprise', 'offer', true),
      narration('耳机短得需要靠得很近。她把录音按停，让列车从耳机外面经过。'),
      line('稍等。这个留在现场。……おはよう。你听清了吧，我只说一次。', 'smile', 'still', true),
    ],
  },
  suzu: {
    title: '折页里的光', ja: '折り目の光', district: 'asakusa', character: 'suzu',
    lines: [
      narration('四点五十分。第一班车从河另一侧开出去，把桥底照亮了一瞬。铃把书摊在我们之间。'),
      line('我在地址下面又加了一行。“如果春天来，请在门口稍等一下。”', 'neutral', 'offer', true),
      narration('风翻过许多页，最后停在那道旧折痕上。她用指尖压住书页，另一只手握住我的手。'),
      line('おはようございます。可以从这里开始读吗？我们还有一整天。', 'smile', 'still', true),
    ],
  },
  tower: {
    title: '坂道向晨', ja: '坂道の朝', district: 'tower',
    lines: [
      narration('四点五十分。远处第一班车已经开动，东京塔在天光里显出一格一格的钢骨。'),
      narration('我拿出那张画过的通勤图，把「公司」那一站沿虚线折到背面。'),
      narration('坡底有一家面包店拉开半扇窗。绿色的小灯亮了。我朝那盏灯走过去。'),
    ],
  },
  solo: {
    title: '下一站，天亮', ja: '次は、朝', district: null,
    lines: [
      narration('四点五十分。站台的广播刚响，一名清洁员从里面把玻璃门推开。'),
      narration('我没有订去别处的票。口袋翻出来，只找到一张被雨打皱的收据。'),
      narration('我在背面写下今晚走过的路，把最后一个地名留空。列车门开了，天空才开始变亮。'),
    ],
  },
};
