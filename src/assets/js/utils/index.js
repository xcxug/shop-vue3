import echo from "../libs/echo";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

function lazyImg() {
  echo.init({
    offset: 100, // 可是区域多少像素可以被加载
    throttle: 0, // 设置图片延迟加载的时间
  });
}

// 单点登录验证
function safeUser() {
  const router = useRouter();
  const store = useStore();

  store.dispatch("user/safeUser", {
    success: (res) => {
      if (res.code !== 200) {
        router.replace("/login");
      }
    },
  });
}

export default {
  lazyImg,
  safeUser,
};
