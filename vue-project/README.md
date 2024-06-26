I. [Có 2 cách để tương tác với Vue](#có-2-cách-chính-để-tương-tác-với-vue)

II. [v-for](#list-rendering)
  1. [Cú pháp](#1-cú-pháp)
  2. [v-for with an Object](#2-v-for-with-an-object)
  3. [Tại sao lại cần key trong v-for](#3-tại-sao-lại-cần-key-trong-v-for)
  4. [v-for with a Component](#4-v-for-with-a-component)
  5. [Array Change Detection](#array-change-detection)

III. [Template Syntax](#template-syntax)
  1. [Text Interpolation](#text-interpolation)
  2. [Raw HTML](#2-raw-html)
  3. [Attribute Bindings](#3-attribute-bindings)

IV. [Event Handing](#event-handling)

V. [Conditional Rendering](#conditional-rendering)

VI. [Built-in Directives](#built-in-directives)
  1. [v-bind](#v-bind)
  2. [v-model](#v-model)
  


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




## Template Syntax 
### Text Interpolation
Vue sử dụng cú pháp template dựa trên HTML. Vue biên  dịch template thành mã JavaScript và đảm bảo chỉ có số lượng tối thiểu cần thiết của component được tái render 
##### 1. Text Interpolation
Hình thức binding dât cơ bản nhất à nội suy văn bản bằng cú pháp "Mustache" (dấu ngoặc nhọn kép):
```php
<span>Message: {{ msg }}</span>
```
Mustache tag sẽ có thể cập nhật bất cứ khi nào thuộc tính msg thay đổi

##### 2. Raw HTML 
Mustache tag dịch data như là pain text chứ không phải HTML, 
Để có output là HTML thực sự, bạn cần sử dụng v-html 
Ví dụ: Giả sử 'rawHTML' có giá trị là  
```php
<span style="color: red">This should be red.</span>
```

khi ta sử dụng
```php
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```
Ta được kết quả
```php
Using text interpolation: <span style="color: red">This should be red.</span>
```
Và
Using text interpolation: <span style="color: red">This should be red.</span>

**v-html** có thể tạo rủi ro về bảo mật, không sử dụng để tạo các phần mềm của template. Việc tổ chức giao diện nên được thực hiện thông qua các component

##### 3. Attribute Bindings
Mustaches không thể chứa các thuộc tính HTML. Thay vào đó ta sử dụng v-bind
```javscript
<div v-bind:id="dynamicId"></div>
```
shorthand:
```javascript
<div :id="dynamicId"></div>
```
###### Boolean Attributes
```javascript
<button :disabled="isButtonDisabled">Button</button>
```

thuộc tính disabled xuất hiện trên thẻ button là một thuộc tính boolean
Nếu isButtonDisabled có một giá trị "truthy"thuộc tính **disable** sẽ được thêm vào thẻ button 

###### Dynamically Binding Multiple Attributes

Bạn có 1 object Javscript nhiều thuộc tính như sau:
```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```
Bạn có thể liên kết chúng với 1 single elament bằng cách sử dụng v-bind
```javascript
<div v-bind="objectOfAttrs"></div>
```

## Event Handling
Cách sử dụng sẽ là **v-on:click="handler"** hoặc viết tắt là  **@click="handler"**

**1. Inline handlers**
là đoạn mã JavaScript được viết trực tiếp trong thuộc tính này, tương tự như thuộc tính onclick trong HTML thuần. Ví dụ ***@click="console.log('Clicked!')"*** để hiển thị thông báo clicked!

```javaScript
const count = ref(0)

<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```
**2.Method handlers**
là tên một phương thức đã được định nghĩa trong component
***@click="doSomething"***

```javaScript
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}

<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```

Method handler tự động nhận đối tượng DOM và kích hoạt nó. Trong ví dụ trên chúng ta có thể truy cập vào phần tử gửi suej kiện thông qua **event.target.tagName**
 ta được kết quả

```php
Hello Vue.js!

BUTTON
```

**3.Method vs. Inline Detection**
Trong Vue khi sử dụng chỉ thị v-on để lắng nghe các sự kiện, trình biên dịch template (template comnpiler) sẽ phân biệt gữa hai loại handler 

**4. Event Modifiers**
Vue cung cấp các event modifier cho v-on là các hậu tố được biểu thị bằng dấu chấm
 ```php
 '.stop': ngăn chặn sự lan truyền đi lên các phần tử cha
 <a @click.stop="doThis"></a>

 '.prevent': Ngăn chặn hành vi mặc định của sự kiện.
 <form @submit.prevent="onSubmit"></form>
  Khi biểu mẫu này được gửi, nó sẽ không làm tải lại trang như hành vi mặc định của biểu mẫu.

  <div @click.self="doThat">...</div>
  Sự kiện click chỉ được xử lý nếu người dùng thực sự nhấp vào phần tử div này, không phải vào một phần tử con bên trong nó.


<div @click.capture="doThis">...</div>
Sự kiện click sẽ được xử lý bởi div này trước khi được xử lý bởi bất kỳ phần tử con nào bên trong nó.

<a @click.once="doThis"></a>
Sự kiện click sẽ chỉ được xử lý một lần, dù bạn có nhấp vào liên kết này bao nhiêu lần đi nữa.

`.passive`: không cho phép event.preventDefault()
<div @scroll.passive="onScroll">...</div>: Sự kiện cuộn sẽ xảy ra ngay lập tức, không chờ đợi hàm onScroll hoàn thành, ngay cả khi hàm này có chứa event.preventDefault().
 ```

 **5.Key Modifiers**
Vue cho phép lắng nghe các sự kiện từ bàn phím bằng v-on
```php
<!--Chỉ gọi đến hàm submit khi nhấn `Enter` -->
<input @keyup.enter="submit" />
```

Vue cung cấp aliases cho các phím sau:
```php
.enter
.tab
.delete (captures both "Delete" and "Backspace" keys)
.esc
.space
.up
.down
.left
.right
```

## Conditional Rendering
### 1. v-if
Lệnh v-if được sử dụng để hiển thị một khối có điều kiện. Khối sẽ chỉ được hiển thị nếu giá trị của lệnh là true
```php
<h1 v-if="awesome">Vue is awesome!</h1>
```

### 2. v-else
v-else để chỉ ra khối khác của v-if.

v-else/ v-else-if phải ở ngay sau v-else nếu không sẽ không được nhận dạng

### 3. v-else-if
Đóng vai trò như 1 v-if và có thể được lặp lại nhiều lần
```php
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
```

### 4. v-show
Sự khác biệt giữa v-show và v-if là v-show sẽ luôn được hiển thị và duy trì DOM, v-show chỉ chuyển đổi thuộc tính *display* CSS của phần tử đó.

v-show không support template element và cũng không hoạt động với v-else
```php
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```
*Template element chỉ hoạt động với v-if*

### 5. v-if with v-show
- Sử dụng v-if: khi bạn muốn đảm bảo rằng các tài nguyên không cần thiết sẽ không được tải hoặc sửu lý cho đến khi thực sự cần chúng. Điều này hữu ích trong việc tiết kiệm hiệu suất khi xử lý các phần tử hoặc component lớn mà điều kiện hiển thị của chúng ít thay đổi.
- Sử dụng v-show: Khi bạn cần một phần tử thay đổi trạng thái hiển thị thường xuyên.

- Khi cả v-if và v-for đều được sử dụng trên cùng một phần tử, v-if sẽ được đánh giá trước. 

## Built-in Directives
### v-bind
v-bind dùng để rằng buộc động một hoặc nhiều thuộc tính, hoặc một prop của 1 component với một biểu thức. 
Cụ thể v-bind cho phép tạo liên kết giữa dử liệu trong Vue và thuộc tính HTML

#### 1. Viết tắt: 
- : hoặc . (khi sử dụng modifier .prop)
Ví dụ để rằng buộc thuộc tính href của thẻ a đến biến url bạn có thể viết:
```php
<a :href="url">Link</a>
```
- Từ phiên bản 3.4 nếu tên thuộc tính và giá trị rằng buộc giống nhau, ta có thể lược bỏ giá trị
Ví dụ:
```php
<button :disabled>Disabled Button</button>
```
*Ở đây, disabled sẽ được thiết lập nếu giá trị của disabled trong dữ liệu là true.*

#### 2. Đầu vào mong đợi:
any ( khi có tham số)
object (khi không có tham số - cho phép bạn rằng buộc nhiều thuộc tính cùng một lúc)

#### 3. Cách sử dụng
##### Rằng buộc thuộc tính class và style
- Khi rằng buộc class, v-bind cho phép sử dụng một mảng hoặc đối tượng để xác định class được kích hoạt dựa trên điều kiện hặc tính toán logic
- Tương tự khi rằng buộc style, bạn có thể sử dụng một đổi tượng để xác địng nhiều thuộc tính style một cách động

##### Rằng buộc prop trong component 
- Khi dùng v-bind để ràng buộc prop đến một component con, prop đó phải được khai báo một cách rõ ràng trong component con đó. Điều này đảm bảo rằng các dữ liệu được truyền đến component con là hợp lệ và được quản lý một cách thích hợp.

### v-model
- Tạo liên kết 2 chiều giữ dữ liệu trong Vue và trên giao diện người dùng
##### Đối tượng mà v-model hỗ trợ:
- input
- select
- textarea
- component
##### Các modifier của v-model:
- .lazy: Mặc định v-model sẽ cập nhật dữ liệu ngay tức với mỗi sự kiện input. tuy nhiên khi sử dụng .lazy v-model sẽ chỉ cập nhật dữ liệu khi có sự kiện change xảy ra(tức là sau khi input đã hoàn thành việc nhập)
- .number: Chuyển đổi chuỗi đầu vào thành số 
- .trim: Loại bỏ khoang trắng thưF ở đầu và cuối chuỗi đầu vào 