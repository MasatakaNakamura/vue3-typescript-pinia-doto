<template>
  <div class="todo-list">
    <!-- リスト追加 -->
    <div>
      <input v-model="state.newTodoLabel" class="c-input" />
      <button @click="addTodo" class="c-button">add</button>
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
/* Reset styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ToDoリストの全体的なスタイル */
.todo-list {
  max-width: 600px; /* ToDoリストの最大幅 */
  margin: 0 auto; /* 中央揃え */
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
}

.todo {
  user-select: none;
  cursor: pointer;
  list-style-type: none; /* リストのマーカーを削除 */
  padding: 10px 0;
  border-bottom: 1px solid #0858a9; /* アイテム間の区切り線 */
  display: flex; /* フレックスレイアウトを使用 */
  align-items: center; /* 垂直方向の中央揃え */
}
/* ホバー時のスタイル */
.todo:hover {
  background-color: #cbf0e2;
}
/* 完了したToDoアイテムのスタイル */
.todo.finished {
  opacity: 0.3; /* 完了したアイテムの不透明度を下げる */
  text-decoration: line-through; /* 打ち消し線を追加 */
  color: rgb(237, 15, 15);
}

.c-button {
  appearance: none;
  border: 0;
  border-radius: 5px;
  background: #4676d7;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
}
.c-input {
  font-family: inherit;
  font-size: inherit;
  border-radius: 0.25rem;
  border: 1px solid #707070;
  outline: none;
  padding: 0.375em 0.75em;
}
</style>
