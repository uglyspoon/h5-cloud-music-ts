import { RankTypes } from "./config";
import { number } from "prop-types";

//处理歌手列表拼接歌手名字
export const getName = (list:any[]) => {
  let str = "";
  list.map((item, index) => {
    str +=  index === 0 ? item.name : "/"+item.name;
    return item;
  })
  return str;
}

//处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList:any[]) => {
  for(let i = 0; i < rankList.length-1; i++) {
    if(rankList[i].tracks.length && !rankList[i+1].tracks.length){
      return i + 1;
    }
  }
}
