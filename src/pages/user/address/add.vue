<template>
  <div class="page">
    <SubHeader title="添加收货地址"></SubHeader>
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
      <button type="button" class="submit-save" @click="submit()">保存</button>
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
  getCurrentInstance,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import areaData from "@/assets/data/area";
import SubHeader from "@/components/sub_header";

interface AddAddressData {
  address: string;
  aid: string;
  area: string;
  cellphone: string;
  city: string;
  name: string;
  province: string;
}

interface Area {
  code: string;
  name: string;
}

export default defineComponent({
  name: "address-add",
  components: {
    SubHeader,
  },
  setup() {
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();

    let state = reactive<{
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
      proxy.$utils.safeUser();
    });

    onMounted(() => {
      document.title = router.currentRoute.value.meta.title as string;
    });

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
        store.dispatch("address/addAddress", {
          name: state.name,
          cellphone: state.cellphone,
          address: state.address,
          isdefault: state.isDefault ? "1" : "0",
          province: state.province,
          city: state.city,
          area: state.area,
          success: (res: {
            code: number;
            data: AddAddressData | string;
            status: number;
          }) => {
            if (res.code === 200) {
              Toast({
                duration: 2000,
                message: "添加成功！",
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
