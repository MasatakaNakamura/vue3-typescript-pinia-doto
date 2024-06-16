import { defineStore } from 'pinia'

type FilterType = 'all' | 'finished' | 'unfinished'
type TODO = {
  id: number
  label: string
  finished: boolean
}

// PiniaのdefineStore() を使ってストアを作成する
// パラメータの "todos" はアプリケーション全体でストアを特定するためのユニークキー
export const useTodoStore = defineStore('todos', {
  // State は初期値を返す関数を定義
  state: () => {
    return {
      filter: 'all' as FilterType,
      todos: [] as TODO[],
      nextId: 0
    }
  },

  // getters は state や 他のgetter へのアクセスが可能
  // getter は全て computed 扱いになるため、引数に応じて結果を差し替える場合は関数を戻す
  getters: {
    // 特定のIDを持つTodoアイテムを返す
    findTodo(state) {
      return (id: number): TODO => {
        const todo = state.todos.find((todo) => todo.id === id)
        if (todo === undefined) throw new Error('todo not found')

        return todo
      }
    },

    // 完了したTodoアイテムのリストを返す
    finishedTodos(state) {
      return state.todos.filter((todo) => todo.finished)
    },

    // 未完了のTodoアイテムのリストを返す
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.finished)
    },

    // 現在のフィルター状態に基づいてTodoアイテムを返す
    filteredTodos(state): TODO[] {
      switch (state.filter) {
        case 'finished':
          // 完了済みのTodoアイテムを返す
          return this.finishedTodos
        case 'unfinished':
          // 未完了のTodoアイテムを返す
          return this.unfinishedTodos
        default:
          // 全てのTodoアイテムを返す
          return this.todos
      }
    }
  },
  // mutations が存在しないので、State の更新は全て actions で行う
  actions: {
    // 新しいTodoアイテムを追加
    addTodo(label: string) {
      this.todos.push({ id: this.nextId++, label, finished: false })
    },

    // Todoアイテムの完了状態を切り替え
    toggleTodo(id: number) {
      const todo = this.findTodo(id)
      todo.finished = !todo.finished
    }
  }
})
