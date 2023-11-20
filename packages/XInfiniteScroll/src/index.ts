import {
  nextTick,
  onBeforeMount,
  ref,
  watch,
  type Ref,
  reactive,
  onBeforeUnmount
} from 'vue';

export interface IFInfiniteScrollData {
  value?: any;
  top: number;
}

export interface IFInfiniteScrollParams {
  listData: any[],
  rowItemAmount: number,
  rowHeight: number,
}

export interface IFInfiniteScrollShowArea {
  begin: number;
  end: number;
}

export function infiniteScroll(
  listenDomId: string, // id
  params: Ref<IFInfiniteScrollParams>,
  offset: number = 1000, // 补偿高度，以免滚动太快，显示延迟
) {
  const wrapData = ref<IFInfiniteScrollData[]>([]);
  // 超出高度，才需要监听
  const isNeedListen = ref<boolean>(true);
  watch(
    () => params.value,
    () => {
      const { rowItemAmount, listData, rowHeight } = params.value;
      const useData: IFInfiniteScrollData[] = [];
      for (let i = 0; i < listData.length; i += 1) {
        const curRow = Math.floor(i / rowItemAmount);
        useData.push({
          value: listData[i],
          top: curRow * rowHeight
        });
      }
      wrapData.value = useData;
    },
    {
      deep: true,
      immediate: true
    }
  )

  let listenDom: any = null;
  const curScrollTop = ref(0);
  // 当前窗口高度
  const curAreaHeight = ref(0);

  const showArea = reactive({
    begin: 0,
    end: 0 + offset
  });

  const debounce = function (callback: Function, interval: number) {
    let timer: any = null;
    // 清除计时
    function cancel() {
      if(timer !== null){
        clearTimeout(timer);
      }
    }
    // 防抖
    function debounced(event: any) {
      cancel();
      timer = setTimeout(callback(event), interval);
    }
    debounced.cancel = cancel;
    return debounced;
  }

  const debounceScroll = debounce((event: any) => {
    curScrollTop.value = event.target?.scrollTop || 0;
    showArea.begin = curScrollTop.value - offset;
    showArea.end = curScrollTop.value + curAreaHeight.value + offset;
  }, 200);

  watch(
    () => curAreaHeight.value,
    (areaHeight) => {
      showArea.begin = curScrollTop.value - offset;
      showArea.end = curScrollTop.value + areaHeight + offset;
    }
  )

  onBeforeMount(() => {
    nextTick(() => {
      listenDom = document.getElementById(listenDomId);
      curAreaHeight.value = listenDom?.clientHeight || 0;
      showArea.end = curAreaHeight.value + offset;
      listenDom.addEventListener('resize', () => {
        curAreaHeight.value = listenDom?.clientHeight || 0;
      })
      if (isNeedListen) {
        listenDom.addEventListener('scroll', debounceScroll);
      }
    })
  })

  onBeforeUnmount(() => {
    debounceScroll.cancel();
  })

  return {
    wrapData,
    scrollTop: curScrollTop,
    showArea
  }
}
