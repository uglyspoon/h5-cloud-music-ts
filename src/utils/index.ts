import { RankTypes } from './config';
import { number } from 'prop-types';

//处理歌手列表拼接歌手名字
export const getName = (list: any[]): string => {
  let str = '';
  list.map((item, index) => {
    str += index === 0 ? item.name : '/' + item.name;
    return item;
  });
  return str;
};

//处理数据，找出第一个没有歌名的排行榜的索引
interface IRankItem {
  tracks: any[];
}
export const filterIndex = (rankList: IRankItem[]): number => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
  return 0;
};

// 给css3相关属性增加浏览器前缀，处理浏览器兼容性问题
let elementStyle = document.createElement('div').style;

let vendor: string = (() => {
  //首先通过transition属性判断是何种浏览器
  let transformNames: any = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return '';
})();

export function prefixStyle(style: string): string {
  if (!vendor) {
    return '';
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}

//判断一个对象是否为空对象
export const isEmptyObject = (obj: object) => Object.keys(obj).length === 0;

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: any[]) {
  let new_arr: any[] = [];
  arr.forEach(item => {
    new_arr.push(item);
  });
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i);
    let t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song: any, list: any) => {
  return list.findIndex((item: any) => {
    return song.id === item.id;
  });
};

//转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0;
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};
