<template>
    <div class="tag-list-container p-4 mx-auto lg:max-w-7xl sm:max-w-full">
      <h1>Posts</h1>
      <div class="add-product-button">
        
      <div v-if="show">
        <CartVue :cartClose="cartClose"/>
        </div>
        <Button @click="handleAddProductClick">ADD PRODUCT</Button>
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
  
      <div class="product-table">
        <div v-if="fetchState === 'LOADING'" class="loading-state">
          <p>Fetching posts...</p>
        </div>
  
        <div v-if="fetchState === 'ERROR'" class="error-state">
          <p>Oops! Something went wrong. Please try again.</p>
        </div>
  
        <div v-if="fetchState === 'SUCCESS'" class="success-state">
          <p>Here's the list of posts:</p>
          <Table :columns="columns" :dataSource="products" :loading="fetchList === 'LOADING'"  :pagination="pagination" @change="handleTableChange" >
            <template v-slot:action="{ record }">
              <Button @click="handleViewProduct(record)">View Details</Button> |
              <Button @click="handleEditProduct(record)">Edit</Button> |
              <Button @click="handleDeleteProduct(record.id)">Delete</Button> |
              <Button @click="addToCart(record.id)">Add to Cart</Button> <!-- Add this line -->
              <Modal
                title="View  Details"
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
            </template>
          </Table>
        </div>
      </div>
    </div>
    <!-- </Sidebar> -->
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { Badge, Button, Modal, Table } from 'ant-design-vue'
  // import ModalComponent from '@/components/ModalComponent.vue'
  import AddProduct from '../AddProduct.vue'
  import { ProductService } from '@/services/Admin/Products/index.service'
  import TableComponent from '@/components/TableComponent.vue'
  import { computed } from 'vue'
  import ViewProduct from '../ViewProduct.vue'
  import EditProduct from '../EditProduct.vue'
  import { useStore } from 'vuex'
  import stores from '@/stores'
  import CartVue from '../Cart.vue'
  import Navbar from '@/components/Navbar.vue';
  
  const show = ref(false)
  const products = ref([])
  const productId = ref(null)
  console.log('product', products)
  const fetchState = ref('DEFAULT')
  const isModalOpen = ref(false)
  const isViewModalOpen = ref(false)
  const isEditModalOpen = ref(false)
  const productEditId = ref(null)
  const filter = ref({})
  const sorter = ref({})
  const pagination = ref({
    current : 1,
    pageSize : 10,
    total : 0
  })
  const store = useStore()
  
    const cartShow = () =>{
    show.value = true
    }
  
    const cartClose = () =>{
      show.value =false
    console.log('dffdf')
    }
  
  
  const check = stores.getters['product/getCartList']
  console.log('?????////',check.length)
  
  const handleProductAdded = async (isSuccess) => {
    if (isSuccess) {
      // Close the modal
      isModalOpen.value = false
      // Refresh the page
      await fetchList()
    }
  }
  
  //Add Product Modal
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
  
  
  
  //View Product Modal
  const handleViewProductOk = async () => {
    isViewModalOpen.value = false
    await fetchList()
    productId.value = null
  }
  const handleViewProductCancel = () => {
    isViewModalOpen.value = false
    // productId.value = null
  }
  const handleViewProduct = (record) => {
    productId.value = record.id
    isViewModalOpen.value = true
    console.log('Viewing product:', record)
  }
  // Define cart as a reactive reference
  const cart = ref([])
  
  // Function to add product to the cart
  const addToCart = async(id) => {
    try{
      const bodyData = {quantity:1, productId:id}
      const response = await ProductService.productAddToCartService(bodyData)
      const { status } = response
      if(status === true){
        alert('Cart Add Successfully')
      }
    }catch(error){
      console.log(error)
    }
  }
  
  
  
  // Compute the total price of all products in the cart
  const calculateTotal = computed(() => {
    return cart.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })
  
  
  //Edit Product modal
  const handleEditProductCancel = () => {
    isEditModalOpen.value = false
    //  productEditId.value = null;
  }
  
  const handleEditProductOk = () => {
    isEditModalOpen.value = false
  }
  const handleEditProduct = (record) => {
    productEditId.value = record.id
    isEditModalOpen.value = true
    console.log('Viewing product:', record)
  }
  
  const nameOptions = computed(() => {
    const uniqueNames = Array.from(new Set(products.value.map((item) => item.productName)))
    return uniqueNames.map((name) => ({ text: name, value: name }))
  })
  
  const priceOptions = computed(() => {
    const uniquePrices = Array.from(new Set(products.value.map((item) => item.price)))
    return uniquePrices.map((price) => ({ text: price, value: price }))
  })
  
  const userNameOptions = computed(() => {
    const uniqueUserNames = Array.from(new Set(products.value.map((item) => item.userName)))
    return uniqueUserNames.map((userName) => ({ text: userName, value: userName }))
  })
  
  
  const fetchList = async () => {
    try {
      const queryParams ={
        // offset:1,
        // limit:1,
        // sortBy:products.value.productName,
        sortType:sorter.value,
         search:filter.value.productName || ''
      }
      console.log('//',queryParams)
      const response = await ProductService.productListService(queryParams)
      products.value = response.data
      // pagination.value.total = response.totalCount
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
  
  const handleTableChange = (pagination, filters, sorter) => {
    pagination.current = pagination.current || 1
    pagination.value = pagination
    filter.value = filters
    sorter.value = sorter
    fetchList()
  }
  
  const columns = computed(() => [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      filters:nameOptions.value,
      filterMultiple:false,
      onFilter: (value,record) => record.productName.includes(value),
      sorter: (a, b) => { return a.productName.localeCompare(b.productName)},
      sortOrder: sorter.columnKey === 'productName' && sorter.order
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      filters:priceOptions.value,
      filterMultiple: false,
      onFilter: (value, record) => record.price.includes(value),
      sorter: (a, b) => a.price.localeCompare(b.price),
      sortOrder:sorter.columnKey === 'price' && sorter.order
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'productName',
      filters:userNameOptions.value,
      filterMultiple:false,
      onFilter: (value, record) => record.userName.includes(value),
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      sortOrder:sorter.columnKey === 'userName' && sorter.order
    },
    {
      title: 'Action',
      key: 'action',
      slots: { customRender: 'action' }
    }
  ])
  </script>
  <!-- 
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
  
  /* Add styles for the product cart if needed */
  .product-cart {
    margin-top: 20px;
  }
  
  .product-cart ul {
    list-style: none;
    padding: 0;
  }
  
  .product-cart li {
    margin-bottom: 10px;
  }
  .icon-style{
    margin-right: 100px; 
  
  } -->
  <!-- </style> -->
  