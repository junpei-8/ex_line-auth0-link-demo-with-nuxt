import type { NuxtPage } from 'nuxt/schema'

export function excludePages(patterns: RegExp[], pages: NuxtPage[] = []): void {
  const pagesRefStack = [{ value: pages, index: 0 }]
  let pagesRefStackSize = 1

  while (pagesRefStackSize > 0) {
    const pagesRef = pagesRefStack[pagesRefStack.length - 1]
    const pages = pagesRef.value
    const index = pagesRef.index

    // 最後のページに到達したらスタックから削除
    if (pages.length <= index) {
      pagesRefStack.pop()
      pagesRefStackSize--
      continue
    }

    // ループ対象のページを取得
    const page = pages[index]
    pagesRef.index++

    // ファイル名がパターンにマッチしたら削除
    const file = page.file
    if (file && patterns.some((pattern) => pattern.test(file))) {
      pages.splice(index, 1)
      pagesRef.index--
      continue
    }

    // ネストされたページがあればスタックに追加
    const pageChildren = page.children
    if (pageChildren && pageChildren.length > 0) {
      pagesRefStack.push({ value: pageChildren, index: 0 })
      pagesRefStackSize++
    }
  }
}
