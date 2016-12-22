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
      mp3:"http://dl.stream.qqmusic.qq.com/7112781.mp3?vkey=D7BEFAB1DC0CEDA331C07512A44835B7D355CE2AE26508B3519DA741F86D35D8AC2774B69F4AA93D81F0E94A288B6AFB66E3C42CD050BD6B&guid=4082350140&fromtag=30",
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
      mp3:"http://dl.stream.qqmusic.qq.com/837839.mp3?vkey=69E915A17D2962FEE5C0F208F611B9C6B0A0B64FF05CEE5386860BC11D3417953DB02FE6123E8328855AB97A72A50646F33C03BDFFD6E792&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"every heart",
      artist:"犬夜叉",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/every%20heart.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102655319.mp3?vkey=26E11F59AA61EE95247474C34F9D1C085F866EB3B519745632C8EB07453CFDFD76A5D2348887EC2A9395E566C05606EC557B408C1D588EDD&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"不分手的恋爱",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112782.mp3?vkey=12E8DFFB725D59FF6233BD90E9533CE22AD3D723A07BEC2FFD8F8270269F97B02F8A78E216FC144491B4A190A5DE3F3E8965FED0EDDB948F&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"桃花扇",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%A1%83%E8%8A%B1%E6%89%87.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112754.mp3?vkey=B4E14CC04BC1E63C30A9A36524C0F4E539D670F3FE938918EF1604AFD3E35C3EAD3C4617A35E47152E7FC0B8E3814030E38F9E50C6DB86EE&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风度",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E5%BA%A6.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/7112755.mp3?vkey=55C15E3A55EBDC494A22DE0A25EADB87B2ABDA052AB9D47E9454F36A46A826164A649C2B2CBD293B6668FED41F4C90F1482F5FFA91533BF3&guid=4082350140&fromtag=30",
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
      mp3:"http://dl.stream.qqmusic.qq.com/1091878.mp3?vkey=497B79D2FB5F9553A412D16F5FBC11C4073D0D9C53E8CF2120832A8CAB9FABC25BA3B0B01B8A27730135828F5783EC58B1FB9C5FCB85F79D&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风云永远永远",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E4%BA%91%20-%20%E9%9B%84%E9%9C%B8%E5%A4%A9%E4%B8%8B%20-%20%E6%B0%B8%E8%BF%9C%E6%B0%B8%E8%BF%9C.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/135679.mp3?vkey=F0A261EE2309CEDC889800E6CD154A1A625F4247319B0A500F0635D8CC680E65C9FBE2B34ECAAB1F8F01E4A2775E97258E4AE2B4DEA0D06A&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"神雕侠侣 归去来兮",
      artist:"胡兵&希莉娜依",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%8F%A4%E5%A4%A9%E4%B9%90%20-%20%E7%A5%9E%E9%9B%95%E4%BE%A0%E4%BE%A3%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102222052.mp3?vkey=363D468D73B6D8E801C3FEA69515FD76341532222CCEAF2F12280C8AF7792EF16903FE36D5F49930175743C82DE0C37B62FE9284857A06D1&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光 - 日本",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%AC%BC%E6%9D%9F%E5%8D%83%E5%AF%BB%20-%20%E6%9C%88%E5%85%89%20-%20%E6%97%A5%E6%9C%AC%E7%BB%8F%E5%85%B8%E7%88%B1%E6%83%85%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/195764.mp3?vkey=8E798AAA98F9457347C27BF53A3096F5CD3A8CF97164B20123FD6E651CB9D2B7943449339EFDDB8D4E1C48CF325A3A7A5AB41ADCB478EFF1&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"假如爱有天意",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%81%87%E5%A6%82%E7%88%B1%E6%9C%89%E5%A4%A9%E6%84%8F%20More%20Than%20Love.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/759351.mp3?vkey=A195F8CD2EDCF155B0D752FA4BD9F9684098D50AD2C16B8983EA50233FC8D747596BB78617B835E3BE74AA00ACF8804946B9C74E25CA15E9&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"星月神话",
      artist:"金莎",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%87%91%E8%8E%8E%20-%20%E6%98%9F%E6%9C%88%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/727869.mp3?vkey=DE0AAD1AC1FF053B43E9D5DFD46BB39A21DF3EF7FC9A114C542451B32784A4478888E0CFDA4DDDA660AD7B37C5AA7C472CCBC4A5785AE818&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱死了昨天",
      artist:"李慧珍",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9D%8E%E6%85%A7%E7%8F%8D%20-%20%E7%88%B1%E6%AD%BB%E4%BA%86%E6%98%A8%E5%A4%A9.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/393889.mp3?vkey=9A09795D6BC197638134C1D50E3E3B762D580EF051F3C9514C3E10C6F91D25BBC9243A97573F3D7DD26E1E2AFA0E5A711A65545729DB402C&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"我欲成仙",
      artist:"刘欢",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%88%98%E6%AC%A2%20-%20%E6%88%91%E6%AC%B2%E6%88%90%E4%BB%99.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/4838529.mp3?vkey=0C1752CA94EBBF716E76762BA1FB1599E8B8416C89442929BF09CBF46666380099B2E53529F1D1CE85DB17D1CDC4C361DD480A5284EF765D&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"相思",
      artist:"毛阿敏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%AF%9B%E9%98%BF%E6%95%8F%20-%20%E7%9B%B8%E6%80%9D.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/106329564.mp3?vkey=81EDC5FD141F7994A92D4235E8FE438B9935F43A1EC09FF8F45BDD731F4CB8E13B57595B9CC018ED77F96C88EC33E8DFF6F985C19965287C&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"此生不换",
      artist:"青鸟飞鱼",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%9D%92%E9%B8%9F%E9%A3%9E%E9%B1%BC-%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102350740.mp3?vkey=D35CFA79BDF9A2A777040C2B18693C9C110B17F82326D1CD658E2474079FAC16A45471C60E04E8883F20948E09DD2755AB538D7499FBA3B6&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"转弯",
      artist:"吴奇隆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E5%A5%87%E9%9A%86%20-%20%E8%BD%AC%E5%BC%AF.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102332761.mp3?vkey=016F54D1E21BA4EE40854CAA2404F38B24835E2BA1F43FD452C93B8E758D9DF1C3E3B603E011F693807BEC50874BF48776AE39516911EB25&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"生生世世爱",
      artist:"吴雨霏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E9%9B%A8%E9%9C%8F%20-%20%E7%94%9F%E7%94%9F%E4%B8%96%E4%B8%96%E7%88%B1.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/102350739.mp3?vkey=5B7FFBB4EFB89DB2F13AE43825C074A3DEAD9D3EB64B00267EA83F5E0A8D06AB15802F12237DE36825CBA74C618FA6E24A441D6ADF914AD9&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光",
      artist:"胡彦斌",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9C%88%E5%85%89.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/433224.mp3?vkey=CF3CB63E108CCAEBA67FD0B163EEB0DB25D2BBC31D005842DFF43B891524CBB36BCC647FA27E70245CDF73E2B0B14A1508994447EA0D78D6&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"绝世",
      artist:"张克帆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%BC%A0%E5%85%8B%E5%B8%86%20-%20%E7%BB%9D%E4%B8%96.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/4934559.mp3?vkey=C5F99C8F794DCF96CFB108CEDDEFEB917341FB2A7F5BF5B784684070936891C8586E1602309874272C54E4F01380593170A64A57AF821D99&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"美丽的神话",
      artist:"孙楠韩红",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/97162.mp3?vkey=49FBAEDC733A9A84F370FCF8C4FF177496A75BBAE8BEC76E459CA2943CF54E6DC093E1E500D275697B4E8E6EA81776A62B6E675BE09BBBF8&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱的灵魂",
      artist:"范朋飞",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E8%8C%83%E6%9C%8B%E9%A3%9E%20-%20%E7%88%B1%E7%9A%84%E7%81%B5%E9%AD%82.mp3",
      mp3:"http://dl.stream.qqmusic.qq.com/4808617.mp3?vkey=55EC8C85D468C62D805BADB17256AE95E83B89DBF5B846E7ABC80F6183AB66FFC28FE2510AAC271E0780F1E60E48A04DB5831AC23E18D486&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"偷功",
      artist:"胡伟立",
      mp3:"http://dl.stream.qqmusic.qq.com/1727255.mp3?vkey=9F5456282F0CABF1700FC07CE9B466488BEFA891E673541EE5878731BD99C8C17C012F1FC8D4C3F61844A9DF4988ED895A2CF948DE240D5F&guid=4082350140&fromtag=30",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"天空之城3D",
      artist:"张也变",
      mp3:"http://fs.pc.kugou.com/201612222108/1a6490425f81357fbee98c2b4e1c3055/G062/M03/0D/1D/3oYBAFcyZG6AW5ApADalUXgTgQU351.mp3",
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
