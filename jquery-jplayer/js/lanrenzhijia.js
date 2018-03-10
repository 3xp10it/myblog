/* ´úÂëÕûÀí£ºÀÁÈËÖ®¼Ò www.lanrenzhijia.com */
$(document).ready(function(){


  var playlist = [{
	 title:"My love",
	 artist:"westlife",
	 //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/my%20love.mp3",
	 mp3:"http://oiqwnrsx4.bkt.clouddn.com/my%20love.mp3",
	 poster: "https://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"

    },{
	  title:"My will",
      artist:"犬夜叉",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/my%20will.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/my%20will.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
      poster: "https://33.media.tumblr.com/0b35eb42176eedbf4a96e52efa760875/tumblr_mxp7a0v3fr1rqx86wo1_500.png"
    },{
      title:"巴赫旧约",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%B7%B4%E8%B5%AB%E6%97%A7%E7%BA%A6.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E5%B7%B4%E8%B5%AB%E6%97%A7%E7%BA%A6.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"with you",
      artist:"犬夜叉",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/with%20you.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"三国杀",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%89%E5%9B%BD%E6%9D%80.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E4%B8%89%E5%9B%BD%E6%9D%80.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"every heart",
      artist:"犬夜叉",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/every%20heart.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/every%20heart.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"不分手的恋爱",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E4%B8%8D%E5%88%86%E6%89%8B%E7%9A%84%E6%81%8B%E7%88%B1.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"桃花扇",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%A1%83%E8%8A%B1%E6%89%87.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%A1%83%E8%8A%B1%E6%89%87.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风度",
      artist:"汪苏泷",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E5%BA%A6.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E9%A3%8E%E5%BA%A6.mp3",
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
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D-%E6%88%90%E9%BE%99%E9%87%91%E5%96%9C%E5%96%84.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"风云永远永远",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%A3%8E%E4%BA%91%20-%20%E9%9B%84%E9%9C%B8%E5%A4%A9%E4%B8%8B%20-%20%E6%B0%B8%E8%BF%9C%E6%B0%B8%E8%BF%9C.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%B0%B8%E8%BF%9C%E6%B0%B8%E8%BF%9C.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"神雕侠侣 归去来兮",
      artist:"胡兵&希莉娜依",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%8F%A4%E5%A4%A9%E4%B9%90%20-%20%E7%A5%9E%E9%9B%95%E4%BE%A0%E4%BE%A3%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%A5%9E%E9%9B%95%E4%BE%A0%E4%BE%A3%20%E5%BD%92%E5%8E%BB%E6%9D%A5%E5%85%AE.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光 - 日本",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%AC%BC%E6%9D%9F%E5%8D%83%E5%AF%BB%20-%20%E6%9C%88%E5%85%89%20-%20%E6%97%A5%E6%9C%AC%E7%BB%8F%E5%85%B8%E7%88%B1%E6%83%85%E7%94%B5%E8%A7%86%E5%89%A7%E4%B8%BB%E9%A2%98%E6%9B%B2.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%9C%88%E5%85%89%20-%20%E6%97%A5%E6%9C%AC.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"假如爱有天意",
      artist:"",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%81%87%E5%A6%82%E7%88%B1%E6%9C%89%E5%A4%A9%E6%84%8F%20More%20Than%20Love.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E5%81%87%E5%A6%82%E7%88%B1%E6%9C%89%E5%A4%A9%E6%84%8F.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"星月神话",
      artist:"金莎",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%87%91%E8%8E%8E%20-%20%E6%98%9F%E6%9C%88%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%98%9F%E6%9C%88%E7%A5%9E%E8%AF%9D.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱死了昨天",
      artist:"李慧珍",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9D%8E%E6%85%A7%E7%8F%8D%20-%20%E7%88%B1%E6%AD%BB%E4%BA%86%E6%98%A8%E5%A4%A9.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%88%B1%E6%AD%BB%E4%BA%86%E6%98%A8%E5%A4%A9.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"我欲成仙",
      artist:"刘欢",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%88%98%E6%AC%A2%20-%20%E6%88%91%E6%AC%B2%E6%88%90%E4%BB%99.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%88%91%E6%AC%B2%E6%88%90%E4%BB%99.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"相思",
      artist:"毛阿敏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%AF%9B%E9%98%BF%E6%95%8F%20-%20%E7%9B%B8%E6%80%9D.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%9B%B8%E6%80%9D.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"此生不换",
      artist:"青鸟飞鱼",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E9%9D%92%E9%B8%9F%E9%A3%9E%E9%B1%BC-%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%AD%A4%E7%94%9F%E4%B8%8D%E6%8D%A2.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"转弯",
      artist:"吴奇隆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E5%A5%87%E9%9A%86%20-%20%E8%BD%AC%E5%BC%AF.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E8%BD%AC%E5%BC%AF.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"生生世世爱",
      artist:"吴雨霏",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%90%B4%E9%9B%A8%E9%9C%8F%20-%20%E7%94%9F%E7%94%9F%E4%B8%96%E4%B8%96%E7%88%B1.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%94%9F%E7%94%9F%E4%B8%96%E4%B8%96%E7%88%B1.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"月光",
      artist:"胡彦斌",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E6%9C%88%E5%85%89.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E6%9C%88%E5%85%89.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"绝世",
      artist:"张克帆",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%BC%A0%E5%85%8B%E5%B8%86%20-%20%E7%BB%9D%E4%B8%96.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%BB%9D%E4%B8%96.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"美丽的神话",
      artist:"孙楠韩红",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%BE%8E%E4%B8%BD%E7%9A%84%E7%A5%9E%E8%AF%9D-%E5%AD%99%E6%A5%A0%E9%9F%A9%E7%BA%A2.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"爱的灵魂",
      artist:"范朋飞",
      //mp3:"https://raw.githubusercontent.com/3xp10it/music/master/%E8%8C%83%E6%9C%8B%E9%A3%9E%20-%20%E7%88%B1%E7%9A%84%E7%81%B5%E9%AD%82.mp3",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%88%B1%E7%9A%84%E7%81%B5%E9%AD%82.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"偷功",
      artist:"胡伟立",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E5%81%B7%E5%8A%9F.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"天空之城3D",
      artist:"张也变",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E3D.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"焚情",
      artist:"张信哲",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%84%9A%E6%83%85.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"铁血丹心",
      artist:"射雕英雄传",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E9%93%81%E8%A1%80%E4%B8%B9%E5%BF%83.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"Dan Dan心魅かれてく",
      artist:"龙珠GT",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/Dan%20Dan%E5%BF%83%E9%AD%85%E3%81%8B%E3%82%8C%E3%81%A6%E3%81%8F.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"灌篮高手--捕捉闪耀的瞬间",
      artist:"灌篮高手",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B--%E6%8D%95%E6%8D%89%E9%97%AA%E8%80%80%E7%9A%84%E7%9E%AC%E9%97%B4.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"灌篮高手--直到世界的尽头",
      artist:"灌篮高手",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B--%E7%9B%B4%E5%88%B0%E4%B8%96%E7%95%8C%E7%9A%84%E5%B0%BD%E5%A4%B4.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"灌篮高手--只凝视着你",
      artist:"灌篮高手",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B--%E5%8F%AA%E5%87%9D%E8%A7%86%E7%9D%80%E4%BD%A0.mp3",
      //oga:"https://www.jplayer.org/audio/ogg/TSP-01-Cro_magnon_man.ogg",
      poster: "https://33.media.tumblr.com/bf9dc125a47dcca91ce5b3575bc3ba92/tumblr_nbmb3j8nU51sq3g2zo1_500.png"
    },{
      title:"灌篮高手--好想大声说喜欢你",
      artist:"灌篮高手",
      mp3:"http://oiqwnrsx4.bkt.clouddn.com/%E7%81%8C%E7%AF%AE%E9%AB%98%E6%89%8B--%E5%A5%BD%E6%83%B3%E5%A4%A7%E5%A3%B0%E8%AF%B4%E5%96%9C%E6%AC%A2%E4%BD%A0.mp3",
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
