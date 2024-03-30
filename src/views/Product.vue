<template>
  <!-- <Sidebar/> -->
  <div :style="{paddingTop:'45px'}">
    <!-- <Navbar :show="cartShow" /> -->
  </div>
    <div v-if="show">
      <CartVue :cartClose="cartClose" />
    </div>
    <Modal
      title="Add Product"
      v-model:open="isModalOpen"
      @cancel="handleAddProductCancel"
      @ok="handleAddProductOk"
      :footer-content="null"
    >
      <AddProduct @productAdded="handleProductAdded" @cancel="handleAddProductCancel" />
    </Modal>
    <Modal
      title="Edit Product"
      v-model:open="isEditModalOpen"
      @ok="handleEditProductOk"
      @cancel="handleEditProductCancel"
    >
      <EditProduct
        :open="isEditModalOpen"
        :productId="productEditId"
        @ok="handleEditProductOk"
        @cancel="handleEditProductCancel"
      />
    </Modal>
    <Modal
      title="Product Details"
      v-model:open="isViewModalOpen"
      @ok="handleViewProductOk"
      @cancel="handleViewProductCancel"
    >
      <ViewProduct
        :productId="productId"
        :fetchList="fetchList"
        @ok="handleViewProductOk"
        @cancel="handleViewProductCancel"
      />
    </Modal>
    <div class="font-sans">
    <div class="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <h2 class="text-4xl font-extrabold text-gray-800 mb-12">Premium Sneakers</h2>
      <div :style="{paddingBottom:'25px'}">
      <Button @click="handleAddProductClick"   class="px-6 py-2 rounded text-white text-sm tracking-wider font-medium outline-none border-2 border-orange-600 bg-orange-600 hover:bg-transparent hover:text-black transition-all duration-300">Add Product</Button>
    </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="(product, index) in products" :key="index" class="bg-gray-50 shadow-md overflow-hidden rounded cursor-pointer hover:-translate-y-2 transition-all relative">
          <div class="bg-white w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
            <svg v-for="i in 5" :key="i" :class="{ 'fill-gray-800': product.rating >= i, 'fill-[#CED5D8]': product.rating < i }" class="w-5 inline-block" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
            </svg>
          </div>
          <div class="w-11/12 h-[220px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8 md:mb-2 mb-4">
            <img :src="product.image" :alt="product.name" class="h-full w-full object-contain" />
          </div>
          <div class="p-6 bg-white">
            <h3 class="text-lg font-bold text-gray-800">{{ product.productName }}</h3>
            <h4 class="text-lg text-gray-700 font-bold mt-2">${{ product.price }}</h4>
            <p class="text-gray-500 text-sm mt-2">{{ product.description }}</p>
            <div class="flex flex-wrap gap-4 mt-4">
              <Tooltip title="ADD CART" color="orange">
                <ShoppingTwoTone class="w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0" width="1em" height="1em" @click="addToCart(product.id)" />
              </Tooltip>
              <Tooltip title="Delete Product" color="orange">
                <Popconfirm
                  title="Are you sure you want to delete this product?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="handleDeleteProduct(product.id)"
                  @cancel="cancelDelete"
                >
                  <DeleteTwoTone class="w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0"/>
                </Popconfirm>
              </Tooltip>
              <Tooltip title="Edit Product" color="orange">
                <EditTwoTone class="w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0" @click="handleEditProduct(product.id)" />
              </Tooltip>
              <Tooltip title="View Product" color="orange">
                <EyeTwoTone class="w-12 h-12 border-2 hover:border-gray-800 font-bold text-sm rounded-full flex items-center justify-center shrink-0" @click="handleViewProduct(product.id)" />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <!-- </Sidebar> -->
</template>

<script setup>
import { ProductService } from '@/services/Admin/Products/index.service'
import { DeleteTwoTone, EditTwoTone, EyeTwoTone, ShoppingTwoTone } from '@ant-design/icons-vue'
import { Button, Modal, Popconfirm, Tooltip } from 'ant-design-vue'
import { ref, onMounted } from 'vue'
import EditProduct from './EditProduct.vue'
import ViewProduct from './ViewProduct.vue'
import Navbar from '@/components/Navbar.vue'
import CartVue from './Cart.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import AddProduct from './AddProduct.vue'

const products = ref([])
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)
const productEditId = ref(null)
const productId = ref(null)
const show = ref(false)
const isViewModalOpen = ref(false)

const cartShow = () => {
  show.value = true
}

const cartClose = () => {
  show.value = false
  console.log('dffdf')
}

const handleEditProductCancel = () => {
  isEditModalOpen.value = false
}

const handleEditProductOk = () => {
  isEditModalOpen.value = false
}
const handleEditProduct = (id) => {
  productEditId.value = id
  isEditModalOpen.value = true
  console.log('Viewing product:')
}


//View Product Modal
const handleViewProductOk = async () => {
  isViewModalOpen.value = false
  await fetchProduct()
  productId.value = null
}
const handleViewProductCancel = () => {
  isViewModalOpen.value = false
  // productId.value = null
}
const handleViewProduct = (id) => {
  productId.value = id
  isViewModalOpen.value = true
  console.log('Viewing product:', record)
}

const handleProductAdded = async (isSuccess) => {
  if (isSuccess) {
    // Close the modal
    isModalOpen.value = false
    // Refresh the page
    await fetchProduct()
  }
}

//Add Product Modal
const handleAddProductClick = () => {
  isModalOpen.value = true
}
const handleAddProductOk = async () => {
  // this.fetchCustomer();
  isModalOpen.value = false
  await fetchProduct()
}
const handleAddProductCancel = () => {
  isModalOpen.value = false
}

const fetchProduct = async () => {
  try {
    const response = await ProductService.productListService()
    products.value = response.data
    // pagination.value.total = response.totalCount
    console.log('______', products)
    // console.log(data)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}
onMounted(fetchProduct)

const handleDeleteProduct = async (id) => {
  console.log('df', id)
  try {
    const response = await ProductService.productDeleteService(id)
    console.log(response.message)
    fetchProduct()
  } catch (error) {
    console.log(error)
  }
}
const cancelDelete = (e) => {
  console.log(e);
  message.warning('Deletion canceled');
};

const addToCart = async (id) => {
  try {
    const bodyData = { quantity: 1, productId: id }
    const response = await ProductService.productAddToCartService(bodyData)
    const { status, message } = response
    if (message) {
      alert(message)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
