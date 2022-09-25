<template>
  <div class="page">
    <SubHeader title="修改收货地址"></SubHeader>
    <div class="main">
      <ul>
        <li>收货人</li>
        <li><input type="text" placeholder="收货人姓名" v-model="name" /></li>
      </ul>
      <ul>
        <li>联系方式</li>
        <li>
          <input type="text" placeholder="联系人手机号" v-model="cellphone" />
        </li>
      </ul>
      <ul>
        <li>所在地区</li>
        <li>
          <input
            type="text"
            placeholder="请选择所在地区"
            class="area"
            readOnly
            :value="showArea"
            @click="isArea = true"
          />
        </li>
      </ul>
      <ul>
        <li>详细地址</li>
        <li>
          <input type="text" placeholder="街道详细地址" v-model="address" />
        </li>
      </ul>
      <ul>
        <li>设置为默认地址</li>
        <li><input type="checkbox" v-model="isDefault" /></li>
      </ul>
      <button type="button" class="submit-save" @click="submit()">修改</button>
    </div>
    <van-popup v-model:show="isArea">
      <van-area
        :area-list="areaList"
        @cancel="isArea = false"
        @confirm="selectArea"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import areaData from "@/assets/data/area";
import SubHeader from "@/components/sub_header";

interface AddressInfoData {
  address: string;
  aid: string;
  area: string;
  cellphone: string;
  city: string;
  isdefault: string;
  name: string;
  province: string;
}

interface Area {
  code: string;
  name: string;
}

export default defineComponent({
  name: "address-mod",
  components: {
    SubHeader,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
      aid: string;
      name: string;
      cellphone: string;
      showArea: string;
      address: string;
      isDefault: boolean;
      areaList: any;
      isArea: boolean;
      province: string;
      city: string;
      area: string;
      isSubmit: boolean;
    }>({
      aid: "",
      name: "",
      cellphone: "",
      showArea: "",
      address: "",
      isDefault: false,
      areaList: areaData,
      isArea: false,
      province: "",
      city: "",
      area: "",
      isSubmit: true,
    });

    onBeforeMount(() => {
      state.aid = (router.currentRoute.value.query.aid as string)
        ? (router.currentRoute.value.query.aid as string)
        : "";
      getAddressInfo();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

    let getAddressInfo = () => {
      store.dispatch("address/getAddressInfo", {
        aid: state.aid,
        success: (res: {
          code: number;
          data: AddressInfoData | string;
          status: number;
        }) => {
          state.name = (res.data as AddressInfoData).name;
          state.cellphone = (res.data as AddressInfoData).cellphone;
          state.showArea =
            (res.data as AddressInfoData).province +
            " " +
            (res.data as AddressInfoData).city +
            " " +
            (res.data as AddressInfoData).area;
          state.isDefault =
            (res.data as AddressInfoData).isdefault === "1" ? true : false;
          state.address = (res.data as AddressInfoData).address;
          state.province = (res.data as AddressInfoData).province;
          state.city = (res.data as AddressInfoData).city;
          state.area = (res.data as AddressInfoData).area;
        },
      });
    };

    let submit = () => {
      if (state.name.match(/^\s*$/)) {
        Toast("请输入收货人姓名");
        return;
      }

      if (state.cellphone.match(/^\s*$/)) {
        Toast("请输入联系人手机号");
        return;
      }
      if (!state.cellphone.match(/^1[0-9][0-9]\d{8}$/)) {
        Toast("您输入的手机号格式不正确");
        return;
      }

      if (state.showArea.match(/^\s*$/)) {
        Toast("请选择所在地区");
        return;
      }

      if (state.address.match(/^\s*$/)) {
        Toast("请输入详细地址");
        return;
      }

      if (state.isSubmit) {
        state.isSubmit = false;
        store.dispatch("address/modAddress", {
          aid: state.aid,
          name: state.name,
          cellphone: state.cellphone,
          address: state.address,
          isdefault: state.isDefault ? "1" : "0",
          province: state.province,
          area: state.area,
          city: state.city,
          success: (res: { code: number; data: string; status: number }) => {
            if (res.code === 200) {
              Toast({
                duration: 2000,
                message: "修改成功！",
                onClose: () => {
                  router.go(-1);
                },
              });
            }
          },
        });
      }
    };

    // 选择所在地区
    let selectArea = (val: Area[]) => {
      state.isArea = false;
      let tmpVal = [];
      if (val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          tmpVal.push(val[i].name);
        }
        state.province = tmpVal[0];
        state.city = tmpVal[1];
        state.area = tmpVal[2];
      }
      state.showArea = tmpVal.join(" ");
    };

    return {
      ...toRefs(state),
      submit,
      selectArea,
    };
  },
});
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #ffffff;
}

.sub-header {
  width: 100%;
  height: 1rem;
  background-color: #ffffff;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  border-bottom: 1px solid #efefef;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
}

.sub-header .back {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url("../../../assets/images/home/goods/back.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
}

.sub-header .title {
  width: 79%;
  height: auto;
  font-size: 0.32rem;
  text-align: center;
}

.sub-header .right-btn {
  width: auto;
  height: auto;
  font-size: 0.32rem;
}

.main {
  width: 100%;
  margin-top: 1rem;
}

.main ul {
  width: 100%;
  height: 1.02rem;
  border-bottom: #efefef 1px solid;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.main ul li {
  font-size: 0.32rem;
  margin-left: 0.3rem;
}

.main ul li:nth-child(2) {
  width: 62%;
  height: 100%;
}

.main ul li input[type="text"] {
  width: 100%;
  height: 95%;
  font-size: 0.32rem;
}

.main ul li .area {
  font-size: 0.28rem !important;
}

.main ul li input[type="checkbox"] {
  width: 0.4rem;
  height: 0.4rem;
  margin-top: 0.3rem;
}

.main .submit-save {
  width: 85%;
  height: 0.8rem;
  background-color: #fcb40a;
  border-radius: 4px;
  margin: 0 auto;
  display: block;
  border: 0 none;
  outline: none;
  font-size: 0.32rem;
  color: #ffffff;
  margin-top: 0.4rem;
}
</style>
