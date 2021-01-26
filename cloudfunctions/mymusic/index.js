// 云函数入口文件
const cloud = require('wx-server-sdk')

/// tcbrouter
const TcbRouter = require('tcb-router');

cloud.init()

const rp = require('request-promise');

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()

  const app = new TcbRouter({event});

  app.router('playlist', async(ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime', 'desc')
    .get()
    .then(res => {
      return res;
    })
  });

  app.router('musiclist', async(ctx, next) => {
    // console.log(event.playlistId);
    const playlist = {
      playlistId: event.playlistId,
      coverImgUrl: 'https://p2.music.126.net/K9IcG8cU6v4_SwuQ_x2xMA==/109951164124604652.jpg',
      name: '我喜欢的歌单',
      tracks: [
        {
          id: 1,
          name: '渐冷',
          picUrl: 'https://img.zcool.cn/community/011f4c600e639011013e3991b2c60c.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          id: 2,
          name: '心如止水',
          picUrl: 'https://img.zcool.cn/community/013a39600e36f811013e399169dd9e.jpg@1280w_1l_0o_100sh.jpg',
        },
        {
          id: 3,
          name: '中间人',
          picUrl: 'https://img.zcool.cn/community/01f7585fbde43c11013fdcc78808cc.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          id: 4,
          name: '最佳拍档',
          picUrl: 'https://img.zcool.cn/community/01fbc05fa3aeac11013ee04dced45f.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          id: 5,
          name: '该怎么说再见',
          picUrl: 'https://img.zcool.cn/community/014a155fa770fc11013ee04d58251b.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          id: 6,
          name: '有暖气',
          picUrl: 'https://img.zcool.cn/community/018f6b5fdad36511013ee04df69cc7.jpg@1280w_1l_2o_100sh.jpg',
        },
      ]
    };
    ctx.body = playlist;
  });

  app.router('musicUrl', async(ctx, next) => {
    let temp = {};
    console.log(event.musicid);
    temp.id = event.musicid
    switch(event.musicid){
      case "1":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/cold.mp3'
        temp.name = '渐冷'
        break;
      case "2":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/heartlikewater.mp3'
        temp.name = '心如止水'
        break;
      case "3":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/middleperson.mp3'
        temp.name = '中间人'
        break;
      case "4":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/partner.mp3'
        temp.name = '最佳拍档'
        break;
      case "5":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/saygoodbye.mp3'
        temp.name = '该怎么说再见'
        break;
      case "6":
        temp.url = 'https://giligili-yinlei.oss-cn-shanghai.aliyuncs.com/wechat/wame.mp3'
        temp.name = '有暖气'
        break;
      default: 
        break;
    }

    ctx.body = temp;
  });

  // 歌詞，暫時不加載
  app.router('lyric', async(ctx, next) => {
    let lyric = {};
    switch(event.musicid){
      case "1":
        lyric.song = "[00:00.26]雪二 - 渐冷\n[00:01.17]作词：2\n[00:01.32]作曲：2、路雨\n[00:01.62]制作人：颜小健@Jyken\n[00:01.92]编曲：赵鹏、颜小健@Jyken\n[00:02.30]和声：夏初安\n[00:02.61]混音：陈秋洁\n[00:02.84]策划统筹：雨菲\n[00:03.15]监制：潇喆Sean\n[00:03.15]OP：鲸鱼向海(北京)文化有限公司\n[00:03.15]发行：鲸鱼向海(北京)文化有限公司\n[00:03.15]（未经许可不得翻唱翻录或使用）\n[00:03.15]『酷狗音乐人 • 星曜计划』\n[00:03.15]全方位推广，见证星力量！\n[00:03.15]加入：musician@kugou.net\n[00:03.15]----------------------------------\n[00:03.15]你能不能再爱我一遍\n[00:06.26]像以前以前你都是热烈\n[00:10.04]没谎言不失联\n[00:12.54]只为我一人失眠\n[00:14.82]梦里面\n[00:15.96]你出现的画面越来越远\n[00:23.08]我能不能少爱你一点\n[00:25.73]像以前以前一切的以前\n[00:29.37]有底线会发泄\n[00:31.71]不像现在藏几面\n[00:35.37]如果你从来都没改变\n[00:44.08]开始炙热的感觉我了解\n[00:47.64]我没变却只剩空的房间\n[00:52.68]你多冷漠的语言没语言\n[00:57.22]想逼我说出再也不见\n[01:02.39]没关系\n[01:03.22]大可不必找理由直接走\n[01:06.86]别担心我会纠缠\n[01:09.07]求你别回头\n[01:11.87]不再想要有以后\n[01:14.91]现在的我们都想要出口\n[01:21.28]你能不能再爱我一遍\n[01:23.93]像以前以前你都是热烈\n[01:27.57]没谎言不失联\n[01:29.99]只为我一人失眠\n[01:32.42]梦里面\n[01:33.71]你出现的画面越来越远\n[01:40.60]我能不能少爱你一点\n[01:43.26]像以前以前一切的以前\n[01:46.90]有底线会发泄\n[01:49.33]不像现在藏几面\n[01:53.05]如果你从来都没改变\n[02:19.83]没关系\n[02:20.66]大可不必找理由直接走\n[02:24.45]别担心我会纠缠\n[02:26.65]求你别回头\n[02:29.45]不再想要有以后\n[02:32.63]现在的我们都想要出口\n[02:38.54]你能不能再爱我一遍\n[02:41.28]像以前以前你都是热烈\n[02:45.15]没谎言不失联\n[02:47.49]只为我一人失眠\n[02:50.00]梦里面\n[02:51.06]你出现的画面越来越远\n[02:58.06]我能不能少爱你一点\n[03:00.79]像以前以前一切的以前\n[03:04.43]有底线会发泄\n[03:06.93]不像现在藏几面\n[03:10.73]如果你从来都没改变\n[03:19.20]不过是回到一个人的夜里\n[03:23.98]不过再没你唱睡前的歌曲\n[03:28.68]不再等你渐冷的气温回升\n[03:37.02]你就不用再爱我一遍\n[03:39.60]像以前以前你多么热烈\n[03:43.23]没谎言不失联\n[03:45.65]只拥我一人入眠\n[03:48.22]梦里面\n[03:49.52]你出现的画面越来越远\n[03:56.34]我会做到少爱你一点\n[03:59.08]像以前以前一切的以前\n[04:02.56]有底线会发泄\n[04:05.06]不像现在藏几面\n[04:08.85]如果你从来都没改变\n";
        break;
      case "2":
        lyric.song = "[00:00.00]Ice Paper - 心如止水\n[00:00.64]作词：Ice Paper\n[00:00.84]作曲：Ice Paper\n[00:01.00]编曲：Ice Paper\n[00:01.15]混音：Ice Paper\n[00:01.30]采样：QUIX - Deep Home\n[00:01.55]Talking to the moon\n[00:02.34]放不下的理由\n[00:04.21]是不是会担心变成一只野兽\n[00:08.55]Walking on the roof\n[00:09.77]为心跳的节奏\n[00:11.59]是不是会暂停在时间的尽头。\n[00:16.88]浸泡在十公升的瓶里\n[00:19.21]单纯想要呼吸讨厌云里雾里\n[00:24.34]出没在被遗忘的抽屉\n[00:26.67]你曾经的手笔写着心口不一\n[00:31.82]现在是黑夜白昼我都随便\n[00:35.03]像迷路的天鹅游失在水面\n[00:39.31]尽力去捕捉恶梦里的碎片\n[00:43.06]不需要你的歌来帮我催眠\n[00:46.04]Talking to the moon\n[00:47.30]放不下的理由\n[00:49.12]是不是会担心变成一只野兽\n[00:53.32]Walking on the roof\n[00:54.74]为心跳的节奏\n[00:56.65]是不是会暂停在时间的尽头\n[01:01.00]说不完的话找不完的借口\n[01:04.19]是不是会狠心把我骄傲解剖\n[01:08.48]爱着谁的她能否将你接受\n[01:11.61]是不是会上瘾拜托慢些降落\n[01:15.88]华丽的红房间发霉的旧唱片\n[01:19.46]没必要听个遍\n[01:21.16]掉了漆的播放键\n[01:23.33]你情愿冒着险睡在他的身边\n[01:27.02]没耐心去分辨\n[01:28.49]谁和谁能够走多远\n[01:30.91]穿过几条街就能找到关键\n[01:34.60]解开我的问题没什么悬念\n[01:38.29]转了几个弯还是回到原点\n[01:41.98]我该如何出现在你的面前\n[01:45.87]Talking to the moon\n[01:47.33]放不下的理由\n[01:49.15]是不是会担心变成一只野兽\n[01:53.35]Walking on the roof\n[01:54.76]为心跳的节奏\n[01:56.64]是不是会暂停在时间的尽头\n[02:00.83]说不完的话找不完的借口\n[02:04.31]是不是会狠心把我骄傲解剖\n[02:08.30]爱着谁的她能否将你接受\n[02:11.65]是不是会上瘾拜托慢些降落\n[02:15.84]Talking to the moon\n[02:17.30]放不下的理由\n[02:19.12]是不是会担心变成一只野兽\n[02:23.36]Walking on the roof\n[02:24.88]为心跳的节奏\n[02:26.65]是不是会暂停在时间的尽头\n[02:30.79]说不完的话找不完的借口\n[02:34.13]是不是会狠心把我骄傲解剖\n[02:38.33]爱着谁的她能否将你接受\n[02:41.62]是不是会上瘾拜托慢些降落\n";
        break;
      case "3":
        lyric.song = "[00:00.00]Ice Paper - 中间人\n[00:23.77]肯定一个我听说的非常简单\n[00:29.78]否定一个你认定的更加困难\n[00:36.02]还有什么不能说\n[00:39.07]还有什么不能做\n[00:42.15]WTF baby\n[00:44.38]你向右或是左\n[00:48.41]总有个不起眼的人上着夜班\n[00:54.43]假如有天蚂蚁都会进化野蛮\n[01:00.70]身边还有多少人\n[01:03.76]忙忙碌碌的早晨\n[01:06.81]WTF baby\n[01:08.94]你向右或是左\n[01:19.79]吼\n[01:25.25]想象曾经的我真是不留情面\n[01:31.44]当着朋友发的脾气无一幸免\n[01:37.61]每个人都会做错\n[01:40.63]错后应该怎么做\n[01:43.59]WTF baby\n[01:45.98]你向右或是左\n[01:49.93]现在的我还没有资格去享受\n[01:56.07]管它耗了多久时间空空两手\n[02:02.25]也许是我的理由\n[02:05.32]也许是我不讲究\n[02:08.44]WTF baby\n[02:10.51]你向右或是左\n[02:14.60]少数的人知道该怎么走\n[02:19.58]吼～\n[02:21.03]超过一半的只会点着头\n[02:25.55]吼～\n[02:27.19]燃烧不完的烟我接着抽喔～\n[02:33.40]没错头疼的不一定是我\n[02:37.95]吼～\n[02:39.49]天知道这片海要游多久\n[02:44.10]吼～\n[02:45.65]谁在渴望自己永垂不朽\n[02:50.14]吼～\n[02:51.88]现在是新的以后也会旧喔～\n[02:58.06]所以我不向左也不向右\n";
        break;
      case "4":
        lyric.song = "[00:00.11]满舒克、Jony J - 最佳拍档\n[00:00.50]作词：满舒克、Jony J\n[00:00.85]作曲：满舒克、Jony J\n[00:01.14]编曲：YOKEN、YYKBZ\n[00:01.35]和声：满舒克、Jony J\n[00:01.63]吉他：刘凹、闫子丰\n[00:01.85]混音、母带：YOKEN、YYKBZ\n[00:02.13]制作：上海洋帮音乐工作室\n[00:20.51]满舒克：\n[00:23.37]我们的默契有种魔力\n[00:26.25]越来越靠近越来越清晰\n[00:28.92]Yep we like a CP\n[00:31.66]Yep we like a CP\n[00:34.58]我们的默契有种魔力\n[00:37.38]越来越靠近越来越清晰\n[00:40.02]Yep we like a CP\n[00:42.97]Yep we like a CP\n[00:46.11]当我的痴心变成绝对\n[00:48.83]眼里只有你不再选美\n[00:51.57]因为你美貌我不想谦卑\n[00:54.24]可说不出口是怕事与愿违\n[00:57.18]爱怎么突然变得高深\n[00:59.11]我不是超人\n[01:00.37]现在大脑高温\n[01:01.79]你过于撩人\n[01:03.14]想变你的抱枕\n[01:04.50]帮你卸下高跟\n[01:05.90]想骗你的香吻\n[01:07.28]从日出到黄昏\n[01:08.78]我想钻到你脑袋里\n[01:10.32]看你到底喜欢谁\n[01:11.71]没见到你的每个夜里\n[01:13.56]我无法入睡\n[01:14.57]你的举手投足\n[01:15.67]我耗尽思念去回味\n[01:17.32]也不想在乎爱上你\n[01:18.82]是错误还是对\n[01:20.11]他们在你身边全是陪衬\n[01:22.60]没有意思他们只会鬼混\n[01:25.52]当我们出现也只会默认\n[01:28.28]最佳拍档只属于我们\n[01:31.19]我们的默契有种魔力\n[01:33.88]越来越靠近越来越清晰\n[01:36.57]Yep we like a CP\n[01:39.30]Yep we like a CP\n[01:42.41]我们的默契有种魔力\n[01:45.09]越来越靠近越来越清晰\n[01:47.80]Yep we like a CP\n[01:50.69]Yep we like a CP\n[01:52.40]Jony J：\n[01:53.37]我随口说的每个烂梗\n[01:55.14]你都可以接\n[01:56.28]有你在我身边\n[01:57.43]感觉什么都不缺\n[01:58.99]每天都过的浪漫\n[02:00.35]都不需要情人节\n[02:01.71]想跟你一起虚度\n[02:03.17]一起逛遍全世界\n[02:04.73]没有什么逻辑\n[02:05.94]可能只是感觉对\n[02:07.52]能满足我的所有幻想\n[02:09.22]满足我的胃\n[02:10.36]怎么会从里到外\n[02:11.72]都合拍的这么完美\n[02:13.52]就连坏脾气都跟我那么配\n[02:15.95]你知道你就是我\n[02:17.38]最想要的那一位\n[02:18.73]我眼中你每天\n[02:19.76]都是最正最辣的妹\n[02:21.54]你总是能把我的开心\n[02:23.37]放大好几倍\n[02:24.44]我喜欢让你笑\n[02:25.58]不喜欢让你掉眼泪\n[02:27.22]我可以随时随地\n[02:28.57]做你保护伞\n[02:29.58]在背后帮你挡\n[02:30.72]你让我的状态\n[02:31.87]每天都像是中到奖\n[02:33.54]过一世只活一次的活法\n[02:35.50]要活就活个爽\n[02:36.58]你说要及时行乐\n[02:37.79]刚好我也这么想\n[02:38.89]满舒克：\n[02:39.39]我们的默契有种魔力\n[02:41.56]越来越靠近越来越清晰\n[02:44.46]Yep we like a CP\n[02:47.06]Yep we like a CP\n[02:50.11]我们的默契有种魔力\n[02:52.88]越来越靠近越来越清晰\n[02:55.60]Yep we like a CP\n[02:58.42]Yep we like a CP\n";
        break;
      case "5":
        lyric.song = "[00:00.19]胜屿 - 该怎么说再见\n[00:00.58]作词：胜屿、阿豪、蛋蛋老baby\n[00:01.05]作曲：胜屿、阿豪\n[00:01.31]编曲：胜屿\n[00:01.44]录音：胜屿\n[00:01.64]混音：胜屿\n[00:01.78]和声：胜屿\n[00:01.98]制作人：胜屿\n[00:17.83]夜深了难以入眠\n[00:19.88]孤单的翻着照片 \n[00:21.88]回忆着过往碎片\n[00:26.05]曾经你给的誓言\n[00:28.11]生活的滴滴点点\n[00:30.10]如今却不再上演\n[00:33.36]该怎么去说再见\n[00:35.56]再见再也不见\n[00:37.91]谢幕了就不必说抱歉\n[00:41.62]该怎么去说再见\n[00:43.81]没勇气说再见\n[00:46.19]可为何你却莫名出现\n[00:50.57]太过努力 太过聪明\n[00:52.72]太过算计 太不容易\n[00:54.77]可不可以 不要猜疑\n[00:56.89]不再刻意 不在意\n[00:58.90]你的无理 无力躲避\n[01:00.95]早已无语 无靠无依\n[01:03.06]悲伤情绪 不断占据\n[01:05.12]这场游戏 不继续\n[01:07.29]太多迟疑 太多委屈\n[01:09.27]太多问题 快要窒息\n[01:11.39]你很敷衍 说我肤浅\n[01:13.38]谎话连篇 总亏欠\n[01:15.37]可不可以 不再联系\n[01:17.56]不去回忆 不再演戏\n[01:19.71]路 太拥挤\n[01:40.63]夜深了难以入眠\n[01:42.62]孤单的翻着照片 \n[01:44.60]回忆着过往碎片\n[01:48.85]曾经你给的誓言\n[01:50.91]生活的滴滴点点\n[01:52.89]如今却不再上演\n[01:56.00]该怎么去说再见\n[01:58.34]再见再也不见\n[02:00.67]谢幕了就不必说抱歉\n[02:04.38]该怎么去说再见\n[02:06.56]没勇气说再见\n[02:08.88]可为何你却莫名出现\n[02:13.32]太过努力 太过聪明\n[02:15.50]太过算计 太不容易\n[02:17.56]可不可以 不要猜疑\n[02:19.60]不再刻意 不在意\n[02:21.59]你的无理 无力躲避\n[02:23.70]早已无语 无靠无依\n[02:25.76]悲伤情绪 不断占据\n[02:27.81]这场游戏 不继续\n[02:29.86]太多迟疑 太多委屈\n[02:31.98]太多问题 快要窒息\n[02:34.10]你很敷衍 说我肤浅\n[02:36.15]谎话连篇 总亏欠\n[02:38.07]可不可以 不再联系\n[02:40.26]不去回忆 不再演戏\n[02:42.42]路 太拥挤\n";
        break;
      case "6":
        lyric.song = "[00:00.00]有暖气\n[00:03.00]宋立伟\n[00:06.00]橘子海（Orange Ocean）Cover\n[00:10.00]墨颜\n[00:30.77]Wake up in the morning\n[00:35.91]Stuck in a traffic beside the sea\n[00:40.82]Maybe it will be late but you don't mind\n[00:48.12]Selfish like you\n[00:52.90]Selfish like you\n[00:59.17]Now 21\n[01:01.21]You need to shake your body\n[01:04.37]We both understand\n[01:05.43]People's getting groovy\n[01:08.96]Now 21\n[01:10.26]You like to shake your body\n[01:14.02]We both satisfy\n[01:16.03]Come on come on stay in light\n[01:37.41]Selfish like you\n[01:41.92]Selfish like you\n[01:46.91]Selfish like you\n[01:51.76]Selfish like you\n[01:57.94]Now 21\n[01:59.92]You need to shake your body\n[02:03.00]We both understand\n[02:04.09]People's getting groovy\n[02:06.76]Now 21\n[02:10.17]You like to shake your body\n[02:12.66]We both satisfy\n[02:14.68]Come on come on stay in light\n[02:17.89]You chosen one\n[02:18.96]Like to shake off gravity\n[02:23.21]Both understand\n[02:24.82]Shape is getting wavy\n[02:27.32]You chosen one\n[02:29.47]Deserve a better story\n[02:32.04]We both stellify\n[02:34.28]Baby baby save my life\n[02:56.88]Now 21\n[02:58.93]You need to shake your body\n[03:01.54]We both understand\n[03:03.47]People's getting groovy\n[03:06.37]Now 21\n[03:08.59]You like to shake your body\n[03:10.88]We both satisfy\n[03:13.21]Come on come on stay in light\n[03:16.44]You chosen one\n[03:18.42]Like to shake off gravity\n[03:21.90]Both understand\n[03:23.54]Shape is getting wavy\n[03:25.90]You chosen one\n[03:28.08]Deserve a better story\n[03:30.74]We both stellify\n[03:32.01]Baby baby save my life\n";
        break;
      default: 
        break;
    }
    ctx.body = lyric;
  });
  return app.serve();

  // return {
    // event,
    // openid: wxContext.OPENID,
    // appid: wxContext.APPID,
    // unionid: wxContext.UNIONID,
  // }
}