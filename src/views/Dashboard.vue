<template>
  <div class="tag-list-container">
    <h1>Posts</h1>
    <div class="add-product-button">
      <Button type="primary" @click="handleAddProductClick">ADD PRODUCT</Button>
    </div>
    <ModalComponent
      title="Add Product"
      v-model:open="isModalOpen"
      @cancel="handleAddProductCancel"
      @ok="handleAddProductOk"
      :footer-content="null"
    >
      <AddProduct @productAdded="handleProductAdded" @cancel="handleAddProductCancel" />
    </ModalComponent>

    <div class="product-table">
      <div v-if="fetchState === 'LOADING'" class="loading-state">
        <p>Fetching posts...</p>
      </div>

      <div v-if="fetchState === 'ERROR'" class="error-state">
        <p>Oops! Something went wrong. Please try again.</p>
      </div>

      <div v-if="fetchState === 'SUCCESS'" class="success-state">
        <p>Here's the list of posts:</p>
        <Table :columns="columns" :dataSource="products" :loading="fetchList === 'LOADING'">
          <template v-slot:action="{ record }">
            <Button @click="handleViewProduct(record)">View Details</Button> |
            <Button @click="handleEditProduct(record.id)">Edit</Button> |
            <Button @click="handleDeleteProduct(record.id)">Delete</Button>
            <ModalComponent
              title="View Details"
              v-model:open="isViewModalOpen"
              @ok="handleViewProductOk"
              @cancel="handleViewProductCancel"
              :showFooter="true"
            >
              <ViewProduct
                :open="isViewModalOpen"
                :productId="productId"
                :fetchList="fetchList"
                @ok="handleViewProductOk"
                @cancel="handleViewProductCancel"
              />
            </ModalComponent>
            <ModalComponent
              title="Edit Product"
              v-model:open="isEditModalOpen"
              @ok="handleEditProductOk"
              @cancel="handleEditProductCancel"
            >
              <EditProduct
                :open="isEditModalOpen"
                :productId="productId"
                @ok="handleEditProductOk"
                @cancel="handleEditProductCancel"
              />
            </ModalComponent>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Button, Table } from 'ant-design-vue'
import ModalComponent from '@/components/ModalComponent.vue'
import AddProduct from './AddProduct.vue'
import { ProductService } from '@/services/Admin/Products/index.service'
import TableComponent from '@/components/TableComponent.vue'
import { computed } from 'vue'
import ViewProduct from './ViewProduct.vue'
import EditProduct from './EditProduct.vue'

const products = ref([])
const productId = ref(null)
console.log('product', products)
const fetchState = ref('DEFAULT')
const isModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isEditModalOpen = ref(false)

const handleProductAdded = async (isSuccess) => {
  if (isSuccess) {
    // Close the modal
    isModalOpen.value = false
    // Refresh the page
    await fetchList()
  }
}
const handleAddProductClick = () => {
  isModalOpen.value = true
}
const handleAddProductOk = async () => {
  // this.fetchCustomer();
  isModalOpen.value = false
  await fetchList()
}
const handleAddProductCancel = () => {
  isModalOpen.value = false
}
const handleViewProductCancel = () => {
  isViewModalOpen.value = false
  productId.value = null
}

const handleViewProductOk =async () => {
  isViewModalOpen.value = false
  await fetchList()
  productId.value = null

}
const handleViewProduct = (record) => {
  productId.value = record.id
  isViewModalOpen.value = true
  console.log('Viewing product:', record)
}

const handleEditProductCancel = () => {
  isEditModalOpen.value = false
}

const handleEditProductOk = () => {
  isEditModalOpen.value = false
}
const handleEditProduct = (record) => {
  productId.value = record.id
  isEditModalOpen.value = true
  console.log('Viewing product:', record)
}

const fetchList = async () => {
  try {
    const response = await ProductService.productListService()
    products.value = response.data
    console.log('______', products)
    fetchState.value = 'SUCCESS'
    // console.log(data)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const handleDeleteProduct = async (record) => {
  console.log('df', record)
  try {
    const response = await ProductService.productDeleteService(record)
    alert(response.message)
    await fetchList()
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchList)

const columns = computed(() => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'User Name',
    dataIndex: 'userName',
    key: 'productName'
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' }
  }
])
</script>

<style scoped lang="scss">
.tag-list-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.add-product-button {
  align-self: flex-end;
  margin-bottom: 20px;
}

.product-table {
  flex-grow: 1;
}

.loading-state p {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
}

.error-state p {
  font-size: 18px;
  font-weight: bold;
  color: red;
}

.success-state p {
  font-size: 18px;
  font-weight: bold;
  color: green;
}
</style>
