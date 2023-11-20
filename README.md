# xInfiniteScroll
>
> A simple function used for infinite scroll show by vue.
>
>
[Demo](https://mikexia930.github.io/xInfiniteScroll/)
## 版本
- v1.0.0

## 基于
- Vue2/3

## 安装
```
npm install x-infinite-scroll
```
或者
```
github下载源码
```
**直接用script引入**
```
<script src="xInfinitescroll/dist/xinfinitescroll.umd.js"></script>
```
### Vue示例

```
import { infiniteScroll } from 'x-infinite-scroll';
```

#### 生成数据集
```
const scrollParams = reactive({
   listData: any[], // 列表数据，需为数组
   rowItemAmount: 1, // 每行的条数
   rowHeight: 40, // 每行的高度
})

const { wrapData, scrollTop, showArea} = infiniteScroll(
  domId, // 列表区域的id，只支持id
  scrollParams, // 见上方，需为 Ref 类型
  1000 // offset，// 补偿高度，以免滚动太快，显示延迟
);
```

#### 返回值说明
**wrapData**
```
interface IFInfiniteScrollData {
  value?: any; // 传入的数据格式（listData的数据条目格式）
  top: number; // 当前条距离顶部的高度
}
```
**scrollTop**
当前滚动条距离顶部的高度
```
number
```

**showArea**
可显示区域的开始和结束位置
```
interface IFInfiniteScrollShowArea {
  begin: number; // 开始高度
  end: number;  // 结束高度
}
```

#### 数据展示
```
<div
 :style="{
   top: `${item.top}px`
 }"
 v-if="item.top >= showArea.begin && item.top <= showArea.end"
 :key="item.value.value"
>
 {{ item.value.label }}
</div>
```

