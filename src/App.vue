<template>
  <!-- リスト追加 -->
  <div>
    <input v-model="state.newTodoLabel" />
    <button @click="addTodo">add</button>
  </div>

  <!-- 表示フィルタリング -->
  <div>
    <input id="all" type="radio" v-model="filter" value="all" />
    <label for="all">すべて表示</label><br />

    <input id="finished" type="radio" v-model="filter" value="finished" />
    <label for="finished">完了済みのみ表示</label><br />

    <input id="unfinished" type="radio" v-model="filter" value="unfinished" />
    <label for="unfinished">未完了のみ表示</label>
  </div>

  <!-- Todoリスト -->
  <div>
    <ul>
      <li
        :class="{ todo: true, finished: todo.finished }"
        :key="todo.label"
        v-for="todo in filteredTodos"
        v-text="todo.label"
        @click="toggleTodo(todo.id)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
// Piniaライブラリの読み込み
// Piniaで提供されるユーティリティ関数
// コンポーネント内でストアの状態を簡単に使用できる
import { storeToRefs } from 'pinia'

// JavaScriptオブジェクトをリアクティブなデータオブジェクトに変換
// オブジェクトのプロパティが変更されたときにVueコンポーネントが再レンダリングされる
import { reactive } from 'vue'

// ストアはアプリケーションの状態やアクションを管理する
// todos.ts内で、useTodoStoreを定義している
import { useTodoStore } from './stores/todos'

// Vue.jsのコンポジションAPIを使ってリアクティブなデータオブジェクトを作成
// stateという名前のリアクティブオブジェクトを定義し、その中にnewTodoLabelというプロパティを保持
// newTodoLabel は templateで state.newTodoLabel として定義している
// state は template と script を紐づけているイメージ
const state = reactive({ newTodoLabel: '' })

// Piniaを使用して、useTodoStoreストアをインスタンス化
// このインスタンスを使って、ストアの状態（state）、アクション（actions）、ゲッター（getters）にアクセスする
const store = useTodoStore()

// storeToRefs()は、Piniaで提供されるユーティリティ関数
// todos.tsで定義している、filteredtodos, filterをtemplateで使用できるようなる
const { filteredTodos, filter } = storeToRefs(store)

// パラメータ(id)を受け取り
// そのパラメータをstoreのtoggleTodoメソッドを呼び出し
// リストアイテムの完了状態（完了済み・未完了）の切り替え
const toggleTodo = (id: number) => store.toggleTodo(id)

// 新しいToDoアイテムを追加
const addTodo = () => {
  if (state.newTodoLabel !== '') {
    // storeのaddTod()を呼び出しstoreにTodoアイテムを追加
    store.addTodo(state.newTodoLabel)

    // 画面の入力フィールドをクリア
    state.newTodoLabel = ''
  }
}
</script>

<style scoped>
.todo {
  user-select: none;
  cursor: pointer;
}
.todo.finished {
  text-decoration: line-through;
  color: gray;
}
</style>
