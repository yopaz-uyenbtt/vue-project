I. [Có 2 cách để tương tác với Vue](#có-2-cách-chính-để-tương-tác-với-vue)
II. [v-for](#list-rendering)
  1. [Cú pháp](#1-cú-pháp)
  2. [v-for with an Object](#2-v-for-with-an-object)
  3. [Tại sao lại cần key trong v-for](#3-tại-sao-lại-cần-key-trong-v-for)
  4. [v-for with a Component](#4-v-for-with-a-component)
  5. [Array Change Detection](#array-change-detection)
## Có 2 cách chính để tương tác với Vue
#### 1. Options API (Vue2)
Xác định logic của các thành phần trong component bằng cách sử dụng data, methods, mounted...

```javascript
<script>
export default {
  // reactive state
  data() {
    return {
      count: 0
    }
  },

  // functions that mutate state and trigger updates
  methods: {
    increment() {
      this.count++
    }
  },

  // lifecycle hooks
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template> 
```

#### 2. Composition API (từ Vue 3)
Xác định logic của các thành phần trong component bằng cách sử dụng import API function, thường sử dụng với thẻ *\<script setup\>*

```javascript
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
## List Rendering
### v-for

##### 1. Cú pháp
Cú pháp v-for yêu cầu ở dạng *item in items*. Trong đó items là source data array và item là alias(bí danh) cho phần tử mảng được lặp qua.

```php
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

<li v-for="item in items">
  {{ item.message }}
</li>
```

Bên trong phạm vi v-for có thể truy cập đến các biểu thức cha. Thêm vào đó, v-for cũng hỗ trợ alias thứ 2 cho index của item hiện tại

```php
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```
Ta được kết quả:
- Parent - 0 - Foo
- Parent - 1 - Bar


##### Destructuring
Vue còn hỗ trợ cú pháp **destructuring** ngay trong v-for, giúp truy cập trực tiếp vào 1 thuộc tính của 1 đối tượng trong mảng

```php
<template>
  <li v-for="{ message } in items">
    {{ message }}
  </li>
</template>
```
*Trong ví dụ trên truy cập trực tiếp vào message mà không cần chỉ định toàn bộ đối tượng*

```php
<template>
  <li v-for="({ message }, index) in items">
    {{ message }} {{ index }}
  </li>
</template>
```
*Kết hợp destructuring với sử dụng alias cho index*

```php
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```
*Với v-for lồng nhau(nest): trong vòng lặp con vẫn có thể truy cập vào dữ liệu trong phần tử của vòng lặp cha*

Cũng có thể sử dụng of thay vì in
```php
<div v-for="item of items"></div>
```

##### 2. v-for with an Object
Có thể dùng v-for lặp qua từng thuộc tính của 1 object
```php
const myObject = reactive({
  title: 'Hello',
  author: 'Uyen',
  publishedAt: '2024-04-04'
})

<ul>
  <li v-for="(value, key, index) in myObject">
  {{index}}. {{ key }}. {{ value }}
  </li> 
<ul>
```
Ta được kết quả
- 1 . title: Hello
- 2 . author: Uyen
- 3 . publishedAt: 2024-04-04

##### 3. Tại sao lại cần key trong v-for
Khi vue update một danh sách các phần tử được hiển thị thông qua v-for, mặc định là vue sử dụng in-place patch strategy. Tức là khi Vue cần cập nhật giao diện thay vì cập nhật lại toàn bộ danh sách, Vue sẽ patch(sửa chữa) từng phần.
Để cung cấp cho va 1 hint để theo dõi mỗi node để có thể sắp xếp lại các phần tử hiện có 1 cách hiệu , ta cần cung cấp cho mỗi mục 1 **key** duy nhất

##### 4. v-for with a Component
Có thế áp dụng v-for trên một Component nhưng cần cung cấp **key** và truyền dữ liệu từ parent component sang child component cần sử dụng **props** *(vì mỗi component trong Vue hoạt động rtong một phạm vi cô lập, nghĩa là data từ các biến từ ngoài component không tự động được truyền vào)*
```php
<template>
  <MyComponent
    v-for="(item, index) in items"
    :item="item"
    :index="index"
    :key="item.id"
  />
</template>
```

##### 5. Array Change Detection
Vue cung cấp cơ chế tự động phát hiện khi một trong những phương thức biến đổi(push, pop, slice...) sử dụng và đáp ứng bằng cách cập nhật DOM để phản ánh những thay đổi 
```php
items.value = items.value.filter((item) => item.message.match(/Foo/))
```
```php
const numbers = ref([1, 2, 3, 4, 5])

const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})

<li v-for="n in evenNumbers">{{ n }}</li>
```