/* ´úÂëÕûÀí£ºÀÁÈËÖ®¼Ò www.lanrenzhijia.com */
$(document).ready(function(){


  var playlist = [{
	 title:"My love",
	 artist:"westlife",
	 //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/my%20love.mp3",
	 mp3:"http://dl.stream.qqmusic.qq.com/1032758.mp3?vkey=95CDDBF3D98BC18E3B1E389822FF91FE077CA8966E50B7905D584B097EC61C3B3B7D1A0839BBE9F79099FB7920CE70053E6AEB34C9C09DB0&guid=4082350140&fromtag=30",
	 poster: "https://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"

    },{
	  title:"My will",
      artist:"犬夜叉",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/my%20will.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7248255.mp3?vkey=526558DD24F1D0334131D8AB27B3373D77C295FF02EFAA7BB09DB846FB5F2D72691A50023007D19A9894EA0CB3277BC471556A9D5620CB33&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
      poster: "https://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"
    },{
      title:"巴赫旧约",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%B7%B4%E8%B5%AB%E6%97%A7%E7%BA%A6.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112781.mp3?vkey=F3659413AD5E1A16BEB81151753C794B006029288735F2E4FA5B9D529263704DB6C414E31E626DF2DE40903EE85DDAF0AE1021DA5F739C90&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"with you",
      artist:"犬夜叉",
      mp3:"https://raw.githubusercontent.com/3xp10it/music/master/with%20you.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"三国杀",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%89%E5%9B%BD%E6%9D%80.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/837839.mp3?vkey=0E023503BCC3C41CDD25A0AB32432FB8C284F44720771A269E373B2DD43535BA2A708B717918EF7F0A57F80134ED4B4EE96440870B769430&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"every heart",
      artist:"犬夜叉",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/every%20heart.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/103571634.mp3?vkey=5D5573B8929B0965AA8C10CC1C2FCF3FC04F031A364C1CA09BF82845678689B2D0AC387902D21237DBF5B08CF40BF5FF626C360F27FF5A70&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"不分手的恋爱",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112782.mp3?vkey=C11169D8362484738C84F316A1C988E51FE8197FEAD811F9D61E9392EF97C87C788862E5FB45C69D4F257FAA0A4A9DB0B4B2DC41A6629C82&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"桃花扇",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%A1%83%E8%8A%B1%E6%89%87.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112754.mp3?vkey=72234C59F0A25B2FBD35E68207C59F6BB3D70068B3A63DAC64A565158BB192A1D5E3A992E94F33E1DFADC1E9D9E7523183D1EC869F7657D1&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风度",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E5%BA%A6.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112755.mp3?vkey=F5D510264537570CC1190F1123C79A0EF451CA0FE12BD251747ECAA35BBBABCE29419682D46F5A9D95069C731217227A87592BC427283745&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"攻心",
      m4a: "https://raw.githubusercontent.com/3xp10it/mv/master/gongxin.mp4",
      oga: "https://raw.githubusercontent.com/3xp10it/mv/master/gongxin.mp4",
      poster: "https://31.media.tumblr.com/810b1125a8b9e9f192d009ef58dceb07/tumblr_nbe8wsmKuz1rknpqyo1_500.jpg"
    },{
      title:"美丽的神话",
      artist:"成龙金喜善",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%88%90%E9%BE%99%E3%80%81%E9%87%91%E5%96%9C%E5%96%84%20-%20%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/213062.mp3?vkey=AB133EACF2904EB6555E6B269022D606E86CFBB017A96AAEAD12B9B83B14B9C0C104846EF0DC00219C9B46ABC0092EEA4D653E70F5C07E99&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风云永远永远",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E4%BA%91%20-%20%E9%9B%84%E9%9C%B8%E5%A4%A9%E4%B8%8B%20-%20%E6%B0%B8%E8%BF%9C%E6%B0%B8%E8%BF%9C.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/135679.mp3?vkey=D0E6BCCB3845EC23B918833B381825534641F0F44F8D30FB1FE35AA5FCA54EF9499DDD17DE5B5C1EB3DC3A079FDE2F240372FAA866F37978&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"神雕侠侣 归去来兮",
      artist:"胡兵&希莉娜依",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%8F%A4%E5%A4%A9%E4%B9%90%20-%20%E7%A5%9E%E9%9B%95%E4%BE%A0%E4%BE%A3%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102222052.mp3?vkey=1073F4F816F51698AFF97E9350CA02D8D4E203BAF3A5CCA211B4F4F4987022AC46607942AB1FF12EAA8AE80D5FF3A5869F505A5C46435E8F&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光 - 日本",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%AC%BC%E6%9D%9F%E5%8D%83%E5%AF%BB%20-%20%E6%9C%88%E5%85%89%20-%20%E6%97%A5%E6%9C%AC%E7%BB%8F%E5%85%B8%E7%88%B1%E6%83%85%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/32694352.mp3?vkey=7C0F479F4DD301ACE93DDB851A4638A4AD7E8157905DBAD11F2D0A4FB62DF51576EE07DD7003640EFE5F904F162E37754F3177FD6D9943EC&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"假如爱有天意",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%81%87%E5%A6%82%E7%88%B1%E6%9C%89%E5%A4%A9%E6%84%8F%20More%20Than%20Love.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/759351.mp3?vkey=3BD71566B931C01BBB44F60718EC5BB15C9506E459280F4E9B18F5C205946A34D897DFAF273358D0D07563BE33FEE52A06431C4CE8FA1F32&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"星月神话",
      artist:"金莎",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%87%91%E8%8E%8E%20-%20%E6%98%9F%E6%9C%88%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/727869.mp3?vkey=CA25A8FFC13386BE12ED5729AC3C8576EF6A0751382C9FFB8225FA39982811CDB28AEED8BEE689C1864D993C4F3055B4BDED0E2BED9B8E64&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱死了昨天",
      artist:"李慧珍",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9D%8E%E6%85%A7%E7%8F%8D%20-%20%E7%88%B1%E6%AD%BB%E4%BA%86%E6%98%A8%E5%A4%A9.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/393889.mp3?vkey=30046E99B35AB65B28BDB9297A0A0A39861A6FAF771246205139B628E768AA31D37E2D78B980C7C47CDB894BB42534D367AFD6CDA4372C0D&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"我欲成仙",
      artist:"刘欢",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%88%98%E6%AC%A2%20-%20%E6%88%91%E6%AC%B2%E6%88%90%E4%BB%99.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/4838529.mp3?vkey=F9CF9BF50E4808F952087D069A3E09737D16303A4D435149F4D3C74EA7DF65E9BEC6E9D5E3497AB9B083BDD2F0C73ED0D4068B4D4A4AC1A2&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"相思",
      artist:"毛阿敏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%AF%9B%E9%98%BF%E6%95%8F%20-%20%E7%9B%B8%E6%80%9D.mp3",
      mp3:"dl.stream.qqmusic.qq.com/106329564.mp3?vkey=5677C4D07575E3C88FAFFE685920D13BE9FF40052EE56DEC01399846D0DE7D36B91A66D87997F4EE956DE1C804A36637BC44728F20593637&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"此生不换",
      artist:"青鸟飞鱼",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%9D%92%E9%B8%9F%E9%A3%9E%E9%B1%BC-%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102350740.mp3?vkey=8CCE79B398E71B7684434E9DF274C13DC5092CD3FD98FDB20A80CAB61467C37012465EE6393592D2F63291EBD8448F6E3E35DCBA6D79ACD7&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"转弯",
      artist:"吴奇隆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E5%A5%87%E9%9A%86%20-%20%E8%BD%AC%E5%BC%AF.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102332761.mp3?vkey=1A31106B522B0922F8DFF802FD2F740BB6D001079D07FFCDB53907FA0CE75F7C4DBFB20E3AAEA5F888D49B4D1D38B10DF5080F13B727919D&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"生生世世爱",
      artist:"吴雨霏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E9%9B%A8%E9%9C%8F%20-%20%E7%94%9F%E7%94%9F%E4%B8%96%E4%B8%96%E7%88%B1.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102350739.mp3?vkey=3540FF464A559802E2C3D9248CCB60C6E79627A6C1F9F2D6A9100D2A7B490A816374B78339D5F88248C0E643BD46DEBA0B07F565AC1B0F9D&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光",
      artist:"胡彦斌",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9C%88%E5%85%89.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/433224.mp3?vkey=1F5515B18C76AA82AFCFCA202E4ACC801E9924E0D60005D54D1194C3349485BD52D582BB571B3CD22B67BE00799AE733EA2E6DAF3E237A1E&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"绝世",
      artist:"张克帆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%BC%A0%E5%85%8B%E5%B8%86%20-%20%E7%BB%9D%E4%B8%96.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/34934559.mp3?vkey=F963C971A7842B8094A3C30FF871582D08E9D59FDDECBF859AE6C1B37D6EDC96B46265F744D20A4BC79EE298E062084D4E49D036A440C2E8&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"美丽的神话",
      artist:"孙楠韩红",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"dl.stream.qqmusic.qq.com/97162.mp3?vkey=6076F6876F040FAEB392CAC6C40AB65796228ADAED7B0DA834909D1884DFCE3CA9FF4565DED568E4F13D5CB33CFBE6DE1DE49876302A55F5&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱的灵魂",
      artist:"范朋飞",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E8%8C%83%E6%9C%8B%E9%A3%9E%20-%20%E7%88%B1%E7%9A%84%E7%81%B5%E9%AD%82.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/5072680.mp3?vkey=2DCEB45159CD2C97F4A18C2A1F3D8F3529C0C756F45D69D71EE67995DDA2C3FFE165EBEA697BD632737E0836FEB02EB7F367D03CA52106DC&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"偷功",
      artist:"胡伟立",
      mp3:"http://dl.stream.qqmusic.qq.com/31727255.mp3?vkey=DC82BB215E265C4370B6EEBE44EEABC15E03629953E9684D0EDDB40FEE52DB1992D1B4366319D81ADB17EB2A49AAC338ABBE0DF75B938953&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    }];

  var cssSelector = {
    jPlayer: "#jquery_jplayer",
    cssSelectorAncestor: ".music-player"
  };

  var options = {
    swfPath: "https://cdnjs.cloudflare.com/ajax/libs/jplayer/2.6.4/jquery.jplayer/Jplayer.swf",
    supplied: "ogv, m4v, oga, mp3, wma"
  };

  var myPlaylist = new jPlayerPlaylist(cssSelector, playlist, options);

});
