import { describe, it, expectTypeOf } from 'vitest'
import { type ReactNode } from 'react'

describe('组件 Props 类型检查', () => {
  describe('通用组件类型', () => {
    it('可选 props 类型应该正确', () => {
      interface TestProps {
        className?: string
        children: ReactNode
        variant?: 'default' | 'primary' | 'secondary'
      }

      const props: TestProps = {
        children: '测试',
        className: 'test-class',
        variant: 'primary',
      }

      expectTypeOf(props).toEqualTypeOf<TestProps>()
    })
  })

  describe('事件处理器类型', () => {
    it('onChange 事件处理器类型应该正确', () => {
      type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void
      
      const handler: ChangeHandler = (e) => {
        const value = e.target.value
        expectTypeOf(value).toBeString()
      }

      expectTypeOf(handler).toEqualTypeOf<ChangeHandler>()
    })

    it('onClick 事件处理器类型应该正确', () => {
      type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void
      
      const handler: ClickHandler = (e) => {
        expectTypeOf(e.currentTarget).toBeObject()
      }

      expectTypeOf(handler).toEqualTypeOf<ClickHandler>()
    })
  })

  describe('表单元素类型', () => {
    it('InputHTMLAttributes 类型应该正确', () => {
      interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
        label?: string
      }

      const props: InputProps = {
        type: 'text',
        value: '测试',
        onChange: (e) => {
          expectTypeOf(e.target.value).toBeString()
        },
      }

      expectTypeOf(props).toEqualTypeOf<InputProps>()
    })

    it('Select 元素类型应该正确', () => {
      interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
        options: string[]
      }

      const props: SelectProps = {
        value: 'option1',
        options: ['option1', 'option2'],
      }

      expectTypeOf(props).toEqualTypeOf<SelectProps>()
    })
  })

  describe('泛型类型', () => {
    it('泛型接口应该正确使用', () => {
      interface Container<T> {
        items: T[]
        addItem: (item: T) => void
      }

      const stringContainer: Container<string> = {
        items: ['item1', 'item2'],
        addItem: (item: string) => {
          expectTypeOf(item).toBeString()
        },
      }

      expectTypeOf(stringContainer).toEqualTypeOf<Container<string>>()
    })

    it('泛型函数应该正确使用', () => {
      function identity<T>(arg: T): T {
        return arg
      }

      const result = identity<string>('test')
      expectTypeOf(result).toBeString()

      const numberResult = identity<number>(42)
      expectTypeOf(numberResult).toBeNumber()
    })
  })

  describe('联合类型和交叉类型', () => {
    it('联合类型应该正确', () => {
      type Status = 'success' | 'error' | 'loading'
      
      const status: Status = 'success'
      expectTypeOf(status).toBeString()
    })

    it('交叉类型应该正确', () => {
      interface A {
        a: string
      }
      
      interface B {
        b: number
      }
      
      type C = A & B
      
      const obj: C = {
        a: 'test',
        b: 42,
      }

      expectTypeOf(obj).toEqualTypeOf<C>()
      expectTypeOf(obj.a).toBeString()
      expectTypeOf(obj.b).toBeNumber()
    })
  })

  describe('工具类型', () => {
    it('Partial 工具类型应该正确', () => {
      interface User {
        id: string
        name: string
        email: string
      }

      const partialUser: Partial<User> = {
        name: '测试',
      }

      expectTypeOf(partialUser).toEqualTypeOf<Partial<User>>()
    })

    it('Pick 工具类型应该正确', () => {
      interface User {
        id: string
        name: string
        email: string
      }

      const pickedUser: Pick<User, 'id' | 'name'> = {
        id: '1',
        name: '测试',
      }

      expectTypeOf(pickedUser).toEqualTypeOf<Pick<User, 'id' | 'name'>>()
    })

    it('Omit 工具类型应该正确', () => {
      interface User {
        id: string
        name: string
        email: string
      }

      const omittedUser: Omit<User, 'email'> = {
        id: '1',
        name: '测试',
      }

      expectTypeOf(omittedUser).toEqualTypeOf<Omit<User, 'email'>>()
    })

    it('Readonly 工具类型应该正确', () => {
      interface User {
        id: string
        name: string
      }

      const readonlyUser: Readonly<User> = {
        id: '1',
        name: '测试',
      }

      expectTypeOf(readonlyUser).toEqualTypeOf<Readonly<User>>()
    })
  })
})
