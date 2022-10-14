<template>
  <div class="page">
    <SubHeader
      title="个人资料"
      right-text="保存"
      @submit="submit()"
    ></SubHeader>
    <div class="main">
      <ul class="head">
        <li>头像</li>
        <li>
          <img :src="showHead" alt="" />
          <input ref="headfile" type="file" @change="uploadHead" />
        </li>
      </ul>
      <ul class="list">
        <li>昵称</li>
        <li>
          <input type="text" placeholder="请设置昵称" v-model="nickname" />
        </li>
        <li class="arrow"></li>
      </ul>
      <ul class="list">
        <li>性别</li>
        <li>
          <input
            type="text"
            placeholder="请选择性别"
            :value="showGender"
            readonly
            @click="isGender = true"
          />
        </li>
        <li class="arrow"></li>
      </ul>
    </div>
    <van-action-sheet
      v-model="isGender"
      :actions="genders"
      cancel-text="取消"
      title="请选择性别"
      @select="selectGender"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import SubHeader from "@/components/sub_header";

interface Genders {
  name: string;
}

interface UserInfo {
  cellphone: string;
  gender: string;
  head: string;
  nickname: string;
  points: string;
  uid: string;
  utype: string;
}

interface UploadHeadData {
  msbox: string;
  msg: string;
}

export default defineComponent({
  name: "component-profile",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      showHead: string;
      head: string;
      nickname: string;
      isGender: boolean;
      genders: Genders[];
      showGender: string;
      gender: string;
      isSubmit: boolean;
    }>({
      showHead: require("../../../assets/images/user/my/default-head.png"),
      head: "",
      nickname: "",
      isGender: false,
      genders: [{ name: "男" }, { name: "女" }],
      showGender: "",
      gender: "",
      isSubmit: true,
    });

    onBeforeMount(() => {
      proxy.$utils.safeUser();

      getUserInfo();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

    let getUserInfo = () => {
      store.dispatch("user/getUserInfo", {
        success: (data: UserInfo) => {
          state.showHead = data.head
            ? data.head
            : require("../../../assets/images/user/my/default-head.png");
          state.nickname = data.nickname;
          state.gender = data.gender;
          state.showGender =
            state.gender === "1" ? "男" : state.gender === "2" ? "女" : "";
        },
      });
    };

    // 上传头像
    let uploadHead = (e: any) => {
      if (e.target.files[0]) {
        store.dispatch("user/uploadHead", {
          headfile: e.target.files[0],
          success: (res: {
            code: number;
            data: UploadHeadData;
            status: number;
          }) => {
            if (res.code === 200) {
              state.showHead =
                "http://vueshop.glbuys.com/userfiles/head/" + res.data.msbox;
              state.head = res.data.msbox;
            }
          },
        });
      }
    };

    // 选择性别
    let selectGender = (val: Genders) => {
      state.isGender = false;
      state.showGender = val.name;
      state.gender =
        state.showGender === "男" ? "1" : state.showGender === "女" ? "2" : "";
    };

    let submit = () => {
      if (state.nickname.match(/^\s*$/)) {
        Toast("请输入昵称");
        return;
      }

      if (state.gender.match(/^\s*$/)) {
        Toast("请选择性别");
        return;
      }

      if (state.isSubmit) {
        state.isSubmit = false;

        store.dispatch("user/updateUserInfo", {
          head: state.head,
          nickname: state.nickname,
          gender: state.gender,
          success: (res: { code: number; data: string; status: number }) => {
            if (res.code === 200) {
              Toast({
                message: "修改成功！",
                duration: 2000,
                onClose: () => {
                  router.go(-1);
                },
              });
            } else {
              Toast(res.data);
            }
          },
        });
      }
    };

    return {
      ...toRefs(state),
      uploadHead,
      selectGender,
      submit,
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

.main {
  width: 100%;
  margin-top: 1.02rem;
}

.main ul.head {
  width: 100%;
  height: 1.2rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.main ul.head li:nth-child(1) {
  font-size: 0.28rem;
  margin-left: 5%;
}

.main ul.head li:nth-child(2) {
  width: 1rem;
  height: 1rem;
  margin-right: 10%;
  position: relative;
  z-index: 1;
}

.main ul.head li:nth-child(2) img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.main ul.head li:nth-child(2) input {
  width: 100%;
  height: 95%;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  opacity: 0;
}

.main ul.list {
  width: 100%;
  height: 0.8rem;
  border-bottom: 1px solid #efefef;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  font-size: 0.28rem;
}

.main ul.list li:nth-child(1) {
  margin-left: 5%;
}

.main ul.list li:nth-child(2) {
  width: 50%;
  height: 100%;
  margin-left: 20%;
}

.main ul.list li:nth-child(2) input {
  width: 100%;
  height: 95%;
  text-align: right;
  font-size: 0.28rem;
}

.main ul.list li.arrow {
  width: 0.4rem;
  height: 0.4rem;
  background-image: url("../../../assets/images/common/right_arrow.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 3%;
}
</style>
