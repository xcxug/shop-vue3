<template>
  <div ref="goodsClassifyContent" class="goods-content-main">
    <div>
      <div class="goods-wrap">
        <div class="classify-name">裙装</div>
        <div class="goods-items-wrap">
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
        </div>
      </div>
      <div class="goods-wrap">
        <div class="classify-name">裙装</div>
        <div class="goods-items-wrap">
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
        </div>
      </div>
      <div class="goods-wrap">
        <div class="classify-name">裙装</div>
        <div class="goods-items-wrap">
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
          <ul>
            <li>
              <img
                src="//vueshop.glbuys.com/uploadfiles/1484284030.jpg"
                alt=""
              />
            </li>
            <li>裙装66</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import IScroll from "@/assets/js/libs/iscroll";

export default defineComponent({
  name: "component-classify-item",
  setup() {
    let goodsClassifyContent = ref<HTMLElement | null>(null);

    onMounted(() => {
      goodsClassifyContent.value?.addEventListener(
        "touchmove",
        scrollPreventDefault
      );
      new IScroll(goodsClassifyContent.value, {
        scrollX: false,
        scrollY: true,
        preventDefault: false,
      });
    });

    onUnmounted(() => {
      goodsClassifyContent.value?.removeEventListener(
        "touchmove",
        scrollPreventDefault
      );
    });

    let scrollPreventDefault = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    return {
      goodsClassifyContent,
    };
  },
});
</script>

<style scoped>
.goods-content-main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.goods-wrap {
  width: 100%;
  height: auto;
}

.goods-wrap .classify-name {
  font-size: 0.28rem;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  overflow: hidden;
}

.goods-wrap .goods-items-wrap {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  padding-top: 0.2rem;
  overflow: hidden;
}

.goods-wrap .goods-items-wrap ul {
  width: 32%;
  height: auto;
  float: left;
  margin-left: 0.5%;
  margin-right: 0.5%;
  margin-bottom: 0.2rem;
}

.goods-wrap .goods-items-wrap ul li:nth-child(1) {
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  margin: 0 auto;
  text-align: center;
}

.goods-wrap .goods-items-wrap ul li:nth-child(1) img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.goods-wrap .goods-items-wrap ul li:nth-child(2) {
  width: 90%;
  height: 0.8rem;
  font-size: 0.24rem;
  overflow: hidden;
  text-align: center;
  margin: 0 auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.2rem;
}
</style>
